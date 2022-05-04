using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public class OrderStatusService : IOrderStatusService
    {
        private AppDbContext _context;

        public OrderStatusService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderStatusNIVM>> GetOrderStatusForList()
        {
            var response = await _context.OrderStatus.Select(model => new OrderStatusNIVM()
            {
                Id = model.Id,
                StatusName = model.Name

            }).ToListAsync();

            return response;
        }

    }
}
