using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public interface IOrderService
    {
        Task<Order> StoreOrderAsync (List<ShoppingCartItem> items, string userId, double sum, OrderWithoutAutVM orderInfo);
        Task StoreOrderWithAuthorizeAsync(List<ShoppingCartItem> items, string userId, double sum, OrderWithAutVM orderInfo, string Email, string Phone, string FullName);
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId, PaginationParams @params);

        Task<IEnumerable<Order>> GetOrdersByUserIdCountAsync(string userId);
        Task<IEnumerable<Order>> GetAllOrders(PaginationParams @params);
        Task<IEnumerable<Order>> GetAllOrdersCount();
        Task<IEnumerable<Order>> GetAllOrdersByStatus(int statusId, PaginationParams @params);
        Task<IEnumerable<Order>> GetAllOrdersByStatusCount(int statusId);
        Task<Order> GetByIdAsync(int id);
        Task<Order> ChangeOrderStatusToСanceled(int orderId);
        Task<Order> ChangeOrderStatusToApproved(int orderId);
        Task<Order> ChangeOrderStatusToDone(int orderId);
        Task<Order> ChangeOrderStatusToWaitingAtThePoint(int orderId);
        Task<Order> ChangeOrderStatusToOnMyWay(int orderId);
        




    }
}
