using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private IUserService _userService;

        public OrderController(IBookService bookService, ShoppingCart shoppingCart, IOrderService orderService, IUserService userService)
        {
            _bookService = bookService;
            _shoppingCart = shoppingCart;
            _orderService = orderService;
            _userService = userService;
        }


        [HttpGet("get-orders-of-user")]
        public async Task<IActionResult> GetOrdersOfUser()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

        [HttpGet("get-all-orders-for-admin")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrders();
            return Ok(orders);
        }


       [HttpGet("get-shopping-cart")]
        public IActionResult GetShoppingCart()
        {
            var items = _shoppingCart.GetShoppingCartItems();
            _shoppingCart.ShoppingCartItem = items;

            var responce = new ShopCartVM()
            {
                ShoppingCartItem = items,
                ShopCartTotal = _shoppingCart.GetShoppingCartTotal(),
                TotalItems = _shoppingCart.GetShoppingCartItemsSummary()
            };


            return Ok(responce);
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

        [HttpPost("remove-all-choosen-items-from-cart")]
        public async Task<IActionResult> RemoveAllChoosenItemsFromShoppingCart(int id)
        {
            var item = await _bookService.GetByIdShopAsync(id);

            if (item != null)
            {
                _shoppingCart.RemoveAllChoosenItemsFromCart(item);
            }
            return RedirectToAction(nameof(GetShoppingCart));
        }


        [HttpPost("clear-the-whole-cart")]
        public async Task<IActionResult> ClearTheCart()
        {
            await _shoppingCart.ClearShoppingCartAsync();
            return RedirectToAction(nameof(GetShoppingCart));
        }

        [HttpPost("complete-order-without-authorise")]
        public async Task<IActionResult> AutCompleOrder([FromForm] OrderWithoutAutVM order)
        {
            var items = _shoppingCart.GetShoppingCartItems();
            string userId = null;
            double sum = _shoppingCart.GetShoppingCartTotal();
           

            await _orderService.StoreOrderAsync(items, userId, sum, order);
            await _shoppingCart.ClearShoppingCartAsync();

            return Ok("OrderCompleted");
        }

        //[HttpPost("complete-order-with-authorise")]
        //public async Task<IActionResult> WithAutCompleOrder([FromForm] OrderWithAutVM order)
        //{
        //    var items = _shoppingCart.GetShoppingCartItems();
        //    string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    double sum = _shoppingCart.GetShoppingCartTotal();

        //    var userinfo = await _userService.GetUserById(userId);          

        //    await _orderService.StoreOrderWithAuthorizeAsync(items, userId, sum, order, userinfo.Email, userinfo.Phone, userinfo.FullName);
        //    await _shoppingCart.ClearShoppingCartAsync();

        //    return Ok("OrderCompleted");
        //}
        
    }
}
