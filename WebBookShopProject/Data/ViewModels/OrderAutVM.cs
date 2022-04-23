using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.ViewModels
{
    public class OrderWithoutAutVM
    {
        //email, phone, name

        public int Phone { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }
        public int DeliveryId { get; set; }
    }
}
