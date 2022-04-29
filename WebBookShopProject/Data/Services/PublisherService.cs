using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public class PublisherService : EntityBaseRepository<Publisher>, IPublihserService
    {

        private AppDbContext _context;

        public PublisherService(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task AddPublisherAsync(PublisherVM publisher)
        {
            var _publisher = new Publisher()
            {
                Name = publisher.Name
            };
            await _context.Publisher.AddAsync(_publisher);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Publisher>> GetAllWithPaginationAsync(PaginationParams @params)
        {
            var result = await _context.Publisher.Select(item => new Publisher()
            {
                Id = item.Id,
                Name = item.Name

            }).OrderBy(p => p.Id)
            .ToListAsync();

            var items = result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }

        public async Task<IEnumerable<PublisherDPVM>> GetPublishersForDropList()
        {

            var publishers = await _context.Publisher.Select(publisher => new PublisherDPVM()
            {
                Id = publisher.Id,
                Name = publisher.Name

            }).ToListAsync();

            return publishers;
        }

        public async Task<Publisher> UpdateAsync(int id, PublisherVM publisher)
        {
            var _publisher = await _context.Publisher.FirstOrDefaultAsync(n => n.Id == id);
            if (_publisher != null)
            {
                _publisher.Name = publisher.Name;

                await _context.SaveChangesAsync();
            };

            return _publisher;
        }
    }
}
