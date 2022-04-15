using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;

namespace WebBookShopProject.Data.Cart
{
    public class ShoppingCart
    {
        public AppDbContext _context { get; set; }
        public string ShoppingCartId { get; set; }
        public List<ShoppingCartItem> ShoppingCartItem { get; set; }
        public ShoppingCart(AppDbContext context)
        {
            _context = context;
        }

        public List<ShoppingCartItem> GetShoppingCartItems()
        {
            return ShoppingCartItem ?? (ShoppingCartItem = _context.ShoppingCartItem.Where(n => n.ShoppingCartId ==
            ShoppingCartId).Include(n => n.Book).ToList());
        }

        public double GetShoppingCartTotal()
        {
            var total = _context.ShoppingCartItem.Where(n => n.ShoppingCartId == ShoppingCartId).Select(n => n.Book.Price * n.Amount).Sum();
            return total;
        }

        public void AddItemToCart(Book book)
        {
            var shoppingCartItem = _context.ShoppingCartItem.FirstOrDefault(n => n.Book.Id == book.Id &&
            n.ShoppingCartId == ShoppingCartId);

            if(shoppingCartItem == null)
            {
                shoppingCartItem = new ShoppingCartItem()
                {
                    ShoppingCartId = ShoppingCartId,
                    Book = book,
                    Amount = 1
                };
                _context.ShoppingCartItem.Add(shoppingCartItem);
            }
            else
            {
                shoppingCartItem.Amount++;
            }
            _context.SaveChanges();
        }

        public void RemoveItemFromCart(Book book)
        {
            var shoppingCartItem = _context.ShoppingCartItem.FirstOrDefault(n => n.Book.Id == book.Id &&
            n.ShoppingCartId == ShoppingCartId);

            if (shoppingCartItem != null)
            {
                if (shoppingCartItem.Amount > 1)
                {
                    shoppingCartItem.Amount--;
                }
                else
                {
                    _context.ShoppingCartItem.Remove(shoppingCartItem);
                }
            }
            _context.SaveChanges();
        }
    }
}
