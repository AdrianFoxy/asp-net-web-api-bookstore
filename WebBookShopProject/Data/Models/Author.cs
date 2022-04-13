using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;

namespace WebBookShopProject.Data.Models
{
    public class Author : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "FullName Error")]
        public string FullName { get; set; }
        public string NameForUrl { get; set; }
        public string ImageUrl { get; set; }
        [Required(ErrorMessage = "Необходимо заполнить поле описания автора")]
        public string Description { get; set; }

        // Relationship
        public List<Book_Author> Book_Author { get; set; }
    }
}
