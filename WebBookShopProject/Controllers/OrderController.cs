using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Cart;
using WebBookShopProject.Data.Services;

namespace WebBookShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly ShoppingCart _shoppingCart;
        public OrderController(IBookService bookService, ShoppingCart shoppingCart)
        {
            _bookService = bookService;
            _shoppingCart = shoppingCart;
        }

        // Get All Authors
        //[HttpGet("get-shopping-cart")]
        //public IActionResult GetShoppingCart()
        //{
        //    var items = _shoppingCart.GetShoppingCartItems();
        //    return Ok(allAuthors);
        //}
    }
}
