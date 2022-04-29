using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.ViewModels
{
    public class OrderWithoutAutVM
    {

        [Required(ErrorMessage = "Укажите свой контактный номер")]
        public int Phone { get; set; }

        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", ErrorMessage = "Некорректный адрес")]
        [Required(ErrorMessage = "Укажите вашу почту")]
        public string Email { get; set; }

        [StringLength(90, MinimumLength = 2, ErrorMessage = "От 2 до 90 символов")]
        [Required(ErrorMessage = "Необходимо указать как к вам обращаться")]
        public string Name { get; set; }
        [StringLength(90, MinimumLength = 2, ErrorMessage = "От 2 до 90 символов")]
        [Required(ErrorMessage = "Укажите адресс доставки")]
        public string Adress { get; set; }
        [Required(ErrorMessage = "Выберите Самовывоз или доставку")]
        public int DeliveryId { get; set; }
    }
}
