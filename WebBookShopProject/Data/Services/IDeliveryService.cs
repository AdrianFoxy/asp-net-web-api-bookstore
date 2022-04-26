using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public interface IDeliveryService
    {
        Task<IEnumerable<DeliveryDPVM>> GetDeliveryForDropList();
    }
}
