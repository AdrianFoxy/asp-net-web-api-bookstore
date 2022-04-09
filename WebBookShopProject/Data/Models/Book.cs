using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public int Pages { get; set; }
        public string Format { get; set; }
        public string LongDescription { get; set; }
        public string ShortDescription { get; set; }
        public int Amount { get; set; }
        public float Price { get; set; }
        public string ImageUrl { get; set; }
        public bool IsFavor { get; set; }
        public DateTime? ResealeDate { get; set; }

        // Realtionship
        public int Fk_PublisherId { get; set; }
        [ForeignKey("Fk_PublisherId")]
        public Publisher Publisher { get; set; }

        public List<Book_Author> Book_Author { get; set; }
        public List<Book_Genre> Book_Genre { get; set; }
    }

}
