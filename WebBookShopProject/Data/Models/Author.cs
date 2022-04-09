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
        public string FullName { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }

        // Relationship
        public List<Book_Author> Book_Author { get; set; }
    }
}
