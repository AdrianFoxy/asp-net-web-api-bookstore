using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.ViewModels
{
    public class GenreVM
    {
        [StringLength(90, ErrorMessage = "Название жанра может быть до 90 символов")]
        [Required(ErrorMessage = "Необходимо заполнить поле назавание жанра")]
        public string Name { get; set; }
        [StringLength(90, MinimumLength = 2, ErrorMessage = "Длина названия для ссылки должна быть от 2 до 90 символов")]
        [Required(ErrorMessage = "Поле обязательное. Эти данные будут отображаться в адресной строке при переходе на профиль жанра")]
        public string NameForUrl { get; set; }
        [StringLength(1200, ErrorMessage = "Описание может содержать не более 1200 символов")]
        [Required(ErrorMessage = "Необходимо заполнить поле описания жанра")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Жанр ДОЛЖЕН относится к определенному типу литературы")]
        public int Fk_TypeGenreId { get; set; }
    }

    public class GenreForViewVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameForUrl { get; set; }
        public string Description { get; set; }
        public string TypeGenreName { get; set; }
    }

    public class GenreDescriptionVM
    {
        public string Description { get; set; }
    }

    public class GenreDPVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

}
