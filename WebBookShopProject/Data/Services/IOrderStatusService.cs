using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public interface IOrderStatusService
    {
        Task<IEnumerable<OrderStatusNIVM>> GetOrderStatusForList();
    }
}
