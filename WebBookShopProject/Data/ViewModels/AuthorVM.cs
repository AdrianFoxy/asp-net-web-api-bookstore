using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;

namespace WebBookShopProject.Data.ViewModels
{
    public class AuthorVM
    {
        public string FullName { get; set; }
        public string ImageUrl { get; set; }
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
