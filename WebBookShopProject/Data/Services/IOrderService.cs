using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public interface IOrderService
    {
        Task StoreOrderAsync (List<ShoppingCartItem> items, string userId, double sum, OrderWithoutAutVM orderInfo);
        Task<List<Order>> GetOrdersByUserIdAsync(string userId);
    }
}
