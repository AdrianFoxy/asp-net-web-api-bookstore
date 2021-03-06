using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;

namespace WebBookShopProject.Data.ViewModels
{
    public class OrderWithoutAutVM
    {

        [Required(ErrorMessage = "Укажите свой контактный номер")]
        [Phone]
        public string Phone { get; set; }

        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", ErrorMessage = "Некорректный адрес")]
        [Required(ErrorMessage = "Укажите вашу почту")]
        public string Email { get; set; }

        [StringLength(90, MinimumLength = 2, ErrorMessage = "От 2 до 90 символов")]
        [Required(ErrorMessage = "Необходимо указать как к вам обращаться")]
        public string Name { get; set; }
        public string Address { get; set; }
        [Required(ErrorMessage = "Выберите Самовывоз или доставку")]
        public int DeliveryId { get; set; }
    }

    public class OrderWithAutVM
    {
        public string Address { get; set; }
        [Required(ErrorMessage = "Выберите Самовывоз или доставку")]
        public int DeliveryId { get; set; }
    }

    public class UpdateStatus
    {
        public int StatusId { get; set; }
    }

    public class OrderVM
    {
        public int Id { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public string ContactName { get; set; }
        public string Address { get; set; }
        public double Sum { get; set; }
        public string UserID { get; set; }
        public int Fk_OrderStatusId { get; set; }
        public string OrderStatusName { get; set; }
        public int Fk_DeliveryId { get; set; }
        public string DeliveryName { get; set; }
        public List<OrderItemForOrderVM> OrderItem { get; set; }
    }

    public class OrderItemForOrderVM
    {
        public int Amount { get; set; }
        public int Fk_BookId { get; set; }
        public int Fk_OrderId { get; set; }
        public List<Book> Book { get; set; }
    }
}
