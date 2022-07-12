using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using WebBookShopProject.Data.Cart;
using WebBookShopProject.Data.Dtos;
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


        [Authorize(Roles = "Admin")]
        [HttpGet("get-last-orders-for-Admin")]
        public async Task<IActionResult> GetLastOrders()
        {
            var order = await _orderService.GetLastOrders();

            return Ok(order);
        }

        [HttpGet("get-order-by-id/{id}")]
        public async Task<IActionResult> GetOrdersOfUser(int id)
        {
            var order = await _orderService.GetByIdAsync(id);
            if(order == null)
            {
                return BadRequest("No order with this Id");
            }

            return Ok(order);
        }

        [HttpGet("get-orders-of-user")]
        public async Task<IActionResult> GetOrdersOfUser([FromQuery] PaginationParams @params)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var orders = await _orderService.GetOrdersByUserIdAsync(userId, @params);
            var counter = await _orderService.GetOrdersByUserIdCountAsync(userId);

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));
            return Ok(orders);
        }

        [HttpGet("get-orders-of-user/{userId}")]
        public async Task<IActionResult> GetOrdersOfUser([FromQuery] PaginationParams @params, string userId)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(userId, @params);
            var counter = await _orderService.GetOrdersByUserIdCountAsync(userId);

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));
            return Ok(orders);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("get-all-orders-for-admin")]
        public async Task<IActionResult> GetAllOrders([FromQuery] PaginationParams @params)
        {
            var orders = await _orderService.GetAllOrders(@params);
            var counter = await _orderService.GetAllOrdersCount();

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(orders);
        }

        [HttpGet("get-orders-by-status")]
        public async Task<IActionResult> GetOrdersByStatus([FromQuery] PaginationParams @params, int statusId)
        {
            var orders = await _orderService.GetAllOrdersByStatus(statusId, @params);
            var counter = await _orderService.GetAllOrdersByStatusCount(statusId);

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

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

        [Authorize(Roles = "Admin")]
        [HttpPut("change-order-status-to-canceled")]
        public async Task<IActionResult> ChangeStatusToCanceled(int orderId)
        {
            var response = await _orderService.ChangeOrderStatusToСanceled(orderId);
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("change-order-status-to-approved")]
        public async Task<IActionResult> ChangeStatusToApproved(int orderId)
        {
            var response = await _orderService.ChangeOrderStatusToApproved(orderId);
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("change-order-status-to-done")]
        public async Task<IActionResult> ChangeStatusToDone(int orderId)
        {
            var response = await _orderService.ChangeOrderStatusToDone(orderId);
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("change-order-status-on-my-way")]
        public async Task<IActionResult> ChangeStatusOnMyWay(int orderId)
        {
            var response = await _orderService.ChangeOrderStatusToOnMyWay(orderId);
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("change-order-status-waiting-at-the-point")]
        public async Task<IActionResult> ChangeStatusToWaitingAtThePoint(int orderId)
        {
            var response = await _orderService.ChangeOrderStatusToWaitingAtThePoint(orderId);
            return Ok(response);
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

        [HttpPost("complete-order")]
        public async Task<IActionResult> AutCompleOrder([FromForm] OrderWithoutAutVM order)
        {
            var items = _shoppingCart.GetShoppingCartItems();
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            double sum = _shoppingCart.GetShoppingCartTotal();

            if(items.Count() == 0)
            {
                return BadRequest("ShoppingCart is empty");
            }
           

            var responce = await _orderService.StoreOrderAsync(items, userId, sum, order);
            await _shoppingCart.ClearShoppingCartAsync();

            return Ok(responce.Id);
        }
        
    }
}
