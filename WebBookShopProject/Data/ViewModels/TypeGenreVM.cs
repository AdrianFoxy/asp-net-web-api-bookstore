using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.ViewModels
{
    public class TypeGenreVM
    {
        public string Name { get; set; }
        public List<string> GenreNames { get; set; }
    }

    public class TypeGenreAddVM
    {
        [StringLength(30, ErrorMessage = "Название категории может быть до 30 символов")]
        [Required(ErrorMessage = "Необходимо заполнить поле назавание категории")]
        public string Name { get; set; }
        [StringLength(30, ErrorMessage = "Название категории для url может быть до 30 символов")]
        [Required(ErrorMessage = "Необходимо заполнить поле назавание категории для url. Эти данные будут отображать в url.")]
        public string NameForUrl { get; set; }
        [StringLength(300, ErrorMessage = "Описание категории может быть до 300 символов.")]
        [Required(ErrorMessage = "Необходимо заполнить поле описания категории")]
        public string Description { get; set; }
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
