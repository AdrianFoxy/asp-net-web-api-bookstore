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

    public class TypeGenreDPVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class TypeGenreTestVM
    {
        public string Name { get; set; }
        public string NameEng { get; set; }
        public List<TypeGenreNamesVM> GenreNames { get; set; }
    }

    public class TypeGenreNamesVM
    {
        public string Name { get; set; }
        public string NameForUrl { get; set; }

    }

    public class TypeGenreDescVM
    {
        public string Description { get; set; }
    }
}
