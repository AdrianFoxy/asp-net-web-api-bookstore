using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Cart;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;
        private readonly ShoppingCart _shoppingCart;
        private readonly IBookService _bookservice;

        public OrderService(AppDbContext context, ShoppingCart shoppingCart, IBookService bookservice)
        {
            _context = context;
            _shoppingCart = shoppingCart;
            _bookservice = bookservice;
        }
    
        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId, PaginationParams @params)
        {
            var orders = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).Where(n => n.UserID == userId).ToListAsync();

            var items = orders.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }
  

        public async Task<IEnumerable<Order>> GetOrdersByUserIdCountAsync(string userId)
        {
            var orders = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).Where(n => n.UserID == userId).ToListAsync();
            return orders;

        }

        public async Task<Order> ChangeOrderStatusToСanceled(int orderId)
        {
            var orderDetails =  await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);
            orderDetails.Fk_OrderStatusId = 2;
            await _context.SaveChangesAsync();

            orderDetails = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);

            return orderDetails;
        }

        public async Task<Order> ChangeOrderStatusToWaitingAtThePoint(int orderId)
        {
            var orderDetails = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);
            orderDetails.Fk_OrderStatusId = 4;
            await _context.SaveChangesAsync();

            orderDetails = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);

            return orderDetails;
        }

        public async Task<Order> ChangeOrderStatusToOnMyWay(int orderId)
        {
            var orderDetails = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);
            orderDetails.Fk_OrderStatusId = 5;
            await _context.SaveChangesAsync();

            orderDetails = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);

            return orderDetails;
        }

        public async Task<Order> ChangeOrderStatusToDone(int orderId)
        {
            var orderDetails = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);
            orderDetails.Fk_OrderStatusId = 3;
            await _context.SaveChangesAsync();

            orderDetails = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);

            return orderDetails;
        }

        public async Task<Order> ChangeOrderStatusToApproved(int orderId)
        {
            var orderDetails = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);
            orderDetails.Fk_OrderStatusId = 6;
            await _context.SaveChangesAsync();

            orderDetails = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).FirstOrDefaultAsync(n => n.Id == orderId);

            return orderDetails;
        }

        public async Task<IEnumerable<Order>> GetAllOrders(PaginationParams @params)
        {
            var orders = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).ToListAsync();

            var items = orders.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersCount()
        {
            var orders = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).ToListAsync();

            return orders;
        }
     
        public async Task<IEnumerable<Order>> GetAllOrdersByStatusCount(int statusId)
        {
            var orders = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Where(n => n.Fk_OrderStatusId == statusId).ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersByStatus(int statusId, PaginationParams @params)
        {
            var orders = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).Include(n => n.Delivery).Where(n => n.Fk_OrderStatusId == statusId).ToListAsync();

            var items = orders.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }


        public async Task<Order> GetByIdAsync(int id)
        {
            var orders = await _context.Order.Include(n => n.OrderItem).ThenInclude(n => n.Book).Include(n => n.OrderStatus).FirstOrDefaultAsync();
            return orders;
        }

        public async Task StoreOrderAsync(List<ShoppingCartItem> items, string userId, double sum, OrderWithoutAutVM orderInfo)
        {

            var order = new Order()
            {
                UserID = userId,
                ContactEmail = orderInfo.Email,
                ContactPhone = orderInfo.Phone,
                ContactName = orderInfo.Name,
                Sum = sum,
                Address = orderInfo.Adress,
                Fk_OrderStatusId = 1,
                Fk_DeliveryId = orderInfo.DeliveryId
            };

            if (order.Fk_DeliveryId == 1)
            {
                order.Address = "проспект Людвіга Свободи, 33, Харків, Харківська область, 61000";
            }

            await _context.Order.AddAsync(order);
            await _context.SaveChangesAsync();

            foreach (var item in items)
            {
                var orderItem = new OrderItem()
                {
                    Amount = item.Amount,
                    Fk_BookId = item.Book.Id,
                    Fk_OrderId = order.Id,
                 
                };
                await _context.OrderItem.AddAsync(orderItem);

                var bookDetails = await _bookservice.GetUpdateAmountId(item.Book.Id);

                var responce = new UpdateCountBookVM()
                {
                    Amount = bookDetails.Amount - item.Amount
                };

                if(responce.Amount >= 0)
                {
                    await _bookservice.UpdateBookAmountAsync(responce, item.Book.Id);
                }                  

                //await _bookservice.UpdateBookAmountAsync(responce, item.Book.Id);
                await _context.SaveChangesAsync();

            }
            await _context.SaveChangesAsync();
        }

        public async Task StoreOrderWithAuthorizeAsync(List<ShoppingCartItem> items, string userId, double sum, OrderWithAutVM orderInfo, string Email, string Phone, string FullName)
        {
            var order = new Order()
            {
                UserID = userId,
                ContactEmail = Email,
                ContactPhone = Phone,
                ContactName = FullName,
                Sum = sum,
                Address = orderInfo.Adress,
                Fk_OrderStatusId = 1,
                Fk_DeliveryId = orderInfo.DeliveryId,
            };

            if(order.Fk_DeliveryId == 1)
            {
                order.Address = "проспект Людвіга Свободи, 33, Харків, Харківська область, 61000";
            }

            await _context.Order.AddAsync(order);
            await _context.SaveChangesAsync();

            foreach (var item in items)
            {
                var orderItem = new OrderItem()
                {
                    Amount = item.Amount,
                    Fk_BookId = item.Book.Id,
                    Fk_OrderId = order.Id,

                };
                await _context.OrderItem.AddAsync(orderItem);

                var bookDetails = await _bookservice.GetUpdateAmountId(item.Book.Id);

                var responce = new UpdateCountBookVM()
                {
                    Amount = bookDetails.Amount - item.Amount
                };

                if (responce.Amount >= 0)
                {
                    await _bookservice.UpdateBookAmountAsync(responce, item.Book.Id);
                }

                //await _bookservice.UpdateBookAmountAsync(responce, item.Book.Id);
                await _context.SaveChangesAsync();

            }
            await _context.SaveChangesAsync();
        }
    }
}
