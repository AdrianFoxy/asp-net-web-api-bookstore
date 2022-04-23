using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string ContactEmail { get; set; }
        public int ContactPhone { get; set; }
        public string ContactName { get; set; }
        public string Address { get; set; }
        public double Sum { get; set; }
        public string UserID { get; set; }
        public int Fk_OrderStatusId { get; set; }
        [ForeignKey("Fk_OrderStatusId")]
        public OrderStatus OrderStatus { get; set; }
        public int Fk_DeliveryId { get; set; }
        [ForeignKey("Fk_DeliveryId")]
        public Delivery Delivery { get; set; }
        public List<OrderItem> OrderItem { get; set; }

    }
}
