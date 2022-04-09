using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;

namespace WebBookShopProject.Data.Models
{
    public class TypeGenre : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        // Realtion
        public List<Genre> Genre { get; set; }
    }
}
