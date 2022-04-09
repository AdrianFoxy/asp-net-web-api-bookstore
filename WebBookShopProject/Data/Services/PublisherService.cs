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

        //public async Task DeleteAsync(int id)
        //{
        //    var _publisher = await _context.Publisher.FirstOrDefaultAsync(n => n.Id == id);
        //    if (_publisher != null)
        //    {
        //        _context.Publisher.Remove(_publisher);
        //        await _context.SaveChangesAsync();
        //    }
        //}

        //public async Task<IEnumerable<Publisher>> GetAllAsync()
        //{
        //    var result = await _context.Publisher.ToListAsync();
        //    return result;
        //}

        //public async Task<Publisher> GetByIdAsync(int id)
        //{
        //    var result = await _context.Publisher.FirstOrDefaultAsync(n => n.Id == id);
        //    return result;
        //}

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
