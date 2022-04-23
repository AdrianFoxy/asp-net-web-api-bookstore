using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Cart;
using WebBookShopProject.Data.Services;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly ShoppingCart _shoppingCart;
        private readonly IOrderService _orderService;
        public OrderController(IBookService bookService, ShoppingCart shoppingCart, IOrderService orderService)
        {
            _bookService = bookService;
            _shoppingCart = shoppingCart;
            _orderService = orderService;
        }

       [HttpGet("get-shopping-cart")]
        public IActionResult GetShoppingCart()
        {
            var items = _shoppingCart.GetShoppingCartItems();
            _shoppingCart.ShoppingCartItem = items;

            var responce = new ShopCartVM()
            {
                ShoppingCartItem = items,
                ShopCartTotal = _shoppingCart.GetShoppingCartTotal()
            };

            return Ok(responce); // тут должен быть респонс, но лагает шо пздц
        }

        [HttpGet("get-shopping-cart-items-summary")]
        public IActionResult GetShoppingCartItemsSummary()
        {
            var count = _shoppingCart.GetShoppingCartItemsSummary();
            return Ok(count);
        }

        [HttpPost("add-item-to-cart")]
        public async Task<IActionResult> AddItemToShoppingCart(int id)
        {
            var item = await _bookService.GetByIdShopAsync(id);

            if (item != null)
            {
                _shoppingCart.AddItemToCart(item);
            }
            return RedirectToAction(nameof(GetShoppingCart));
        }

        [HttpPost("remove-item-from-cart")]
        public async Task<IActionResult> RemoveItemFromShoppingCart(int id)
        {
            var item = await _bookService.GetByIdShopAsync(id);

            if (item != null)
            {
                _shoppingCart.RemoveItemFromCart(item);
            }
            return RedirectToAction(nameof(GetShoppingCart));
        }

        [HttpPost("complete-order-without-authorise")]
        public async Task<IActionResult> AutCompleOrder([FromForm] OrderWithoutAutVM order)
        {
            var items = _shoppingCart.GetShoppingCartItems();
            string userId = "";
            double sum = _shoppingCart.GetShoppingCartTotal();
           

            await _orderService.StoreOrderAsync(items, userId, sum, order);
            await _shoppingCart.ClearShoppingCartAsync();

            return Ok("OrderCompleted");
        }
    }
}
