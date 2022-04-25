using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;

namespace WebBookShopProject.Data.ViewModels
{
    public class ShopCartVM
    {
        public List<ShoppingCartItem> ShoppingCartItem { get; set; }
        public double ShopCartTotal { get; set; }
        public int TotalItems { get; set; }
    }
}
