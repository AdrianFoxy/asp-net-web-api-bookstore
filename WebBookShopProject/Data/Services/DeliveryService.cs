using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public class DeliveryService : IDeliveryService
    {
        private AppDbContext _context;

        public DeliveryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DeliveryDPVM>> GetDeliveryForDropList()
        {

            var response = await _context.Delivery.Select(response => new DeliveryDPVM()
            {
                Id = response.Id,
                Name = response.Name

            }).ToListAsync();

            return response;
        }
    }
}
