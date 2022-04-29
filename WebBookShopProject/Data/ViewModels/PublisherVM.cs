using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.ViewModels
{
    public class PublisherVM
    {
        [StringLength(90, ErrorMessage = "Название издательства может быть до 90 символов")]
        [Required(ErrorMessage = "Необходимо заполнить поле назавание издательства")]
        public string Name { get; set; }
    }

    public class PublisherDPVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
