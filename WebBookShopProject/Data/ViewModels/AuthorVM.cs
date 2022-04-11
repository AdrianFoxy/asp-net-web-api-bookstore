using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;

namespace WebBookShopProject.Data.ViewModels
{
    public class AuthorVM
    {
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Длина ФИО должна быть от 3 до 50 символов")]
        [Required(ErrorMessage = "Необходимо заполнить поле ФИО автора")]
        public string FullName { get; set; }
        public string ImageUrl { get; set; }
        [Required(ErrorMessage = "Необходимо заполнить поле описание автора")]
        public string Description { get; set; }
    }

    public class AuthorWithBooksTitleVM
    {
        public string FullName { get; set; }
        public List<int> BookIds { get; set; }
    }

    public class AuthorWithBooksInfoVM
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public List<Book> Book { get; set; }
    }
}
