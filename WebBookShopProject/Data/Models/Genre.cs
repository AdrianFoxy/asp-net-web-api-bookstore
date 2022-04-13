using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;

namespace WebBookShopProject.Data.Models
{
    public class Genre : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameForUrl { get; set; }
        public string Description { get; set; }
        public int Fk_TypeGenreId { get; set; }
        [ForeignKey("Fk_TypeGenreId")]
        public TypeGenre TypeGenre { get; set; }
        public List<Book_Genre> Book_Genre { get; set; }
    }
}
