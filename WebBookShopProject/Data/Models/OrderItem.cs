using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.Models
{
    public class OrderItem
    {
        public int Amount { get; set; }
        public int Fk_BookId { get; set; }
        [ForeignKey("Fk_BookId")]
        public virtual Book Book { get; set; }
        public int Fk_OrderId { get; set; }
        [ForeignKey("Fk_OrderId")]
        public virtual Order Order { get; set; }
    }
}
