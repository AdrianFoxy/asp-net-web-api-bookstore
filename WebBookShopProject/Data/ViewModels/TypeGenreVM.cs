using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.ViewModels
{
    public class TypeGenreVM
    {
        public string Name { get; set; }
        public List<string> GenreNames { get; set; }
    }

    public class TypeGenreDescVM
    {
        public string Description { get; set; }
    }
}
