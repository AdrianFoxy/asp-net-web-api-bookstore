using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.Models
{
    public class Book_Genre
    {
        public int Fk_BookId { get; set; }
        public Book Book { get; set; }
        public int Fk_GenreId { get; set; }
        public Genre Genre { get; set; }
    }
}
