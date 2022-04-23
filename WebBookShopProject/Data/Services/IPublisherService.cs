using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public interface IPublihserService : IEntityBaseRepository<Publisher>
    {
        Task AddPublisherAsync(PublisherVM publiser);
        Task<Publisher> UpdateAsync(int id, PublisherVM publiser);
        Task<IEnumerable<PublisherDPVM>> GetPublishersForDropList();
        //Task<IEnumerable<Publisher>> GetAllAsync();
        //Task<Publisher> GetByIdAsync(int id);
        //Task DeleteAsync(int id);
    }
}
