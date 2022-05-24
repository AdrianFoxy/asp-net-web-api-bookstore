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
        [StringLength(90, MinimumLength = 2, ErrorMessage = "Длина ФИО должна быть от 2 до 90 символов")]
        [Required(ErrorMessage = "Необходимо заполнить поле ФИО автора")]     
        public string FullName { get; set; }
        [StringLength(90, MinimumLength = 2, ErrorMessage = "Длина названия для ссылки должна быть от 2 до 90 символов")]
        [Required(ErrorMessage = "Поле обязательное. Эти данные будут отображаться в адресной строке при переходе на профиль автора")]
        public string NameForUrl { get; set; }
        [StringLength(1200, ErrorMessage = "Описание может содержать не более 1200 символов")]
        [Required(ErrorMessage = "Необходимо заполнить поле описания автора")]
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

    public class AuthorDPVM
    {
        public int Id { get; set; }
        public string FullName { get; set; }
    }

    public class AuthorForFilterVM
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string NameForUrl { get; set; }
    }
}
