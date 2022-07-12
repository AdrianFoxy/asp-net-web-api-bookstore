using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;

namespace WebBookShopProject.Data.ViewModels
{
    public class BookVM
    {
        //public int Id { get; set; }
        [StringLength(80, MinimumLength = 2, ErrorMessage = "Название книги должно быть от 2 до 80 символов")]
        [Required(ErrorMessage = "Необходимо указать название книги")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Необходимо указать кол-во страниц")]
        public int Pages { get; set; }
        public string Format { get; set; }
        [StringLength(1200, ErrorMessage = "Основное описание должно содержать не более 1200 символов")]
        [Required(ErrorMessage = "Необходимо указать короткое описание")]
        public string LongDescription { get; set; }
        [StringLength(500, ErrorMessage = "Коротное описание должно содержать не более 500 символов")]
        [Required(ErrorMessage = "Необходимо указать короткое описание")]
        public string ShortDescription { get; set; }
        [Required(ErrorMessage = "Необходимо указать кол-во товара")]
        public int Amount { get; set; }
        [Required(ErrorMessage = "Необходимо цену товара")]
        public float Price { get; set; }
        //public string ImageUrl { get; set; }
        public bool IsFavor { get; set; }
        public DateTime? ReleaseDate { get; set; }
        [Required(ErrorMessage = "У Книги должен быть издатель")]
        public int Fk_PublisherId { get; set; }
        [Required(ErrorMessage = "У Книги должен быть один или несколько авторов, в случае отсутвия таковых выберите вариант Неизвестно")]
        public List<int> AuthorsId { get; set; }
        [Required(ErrorMessage = "У Книги должен быть один или несколько жанров")]
        public List<int> GenresId { get; set; }
    }

    public class BookGroup
    {
        public int Id { get; set; }

        public List<Book> Books { get; set; }
    }
    //public class BookImgVM
    //{
    //    //public int Id { get; set; }
    //    public string Title { get; set; }
    //    public int Pages { get; set; }
    //    public string Format { get; set; }
    //    public string LongDescription { get; set; }
    //    public string ShortDescription { get; set; }
    //    public int Amount { get; set; }
    //    public float Price { get; set; }
    //    //public string ImageUrl { get; set; }
    //    public bool IsFavor { get; set; }
    //    public DateTime? ReleaseDate { get; set; }
    //    public int Fk_PublisherId { get; set; }
    //    public List<int> AuthorsId { get; set; }
    //    public List<int> GenresId { get; set; }
    //}

    public class BookFullInfoForUpdateVM
    {
        public string Title { get; set; }
        public int Pages { get; set; }
        public string Format { get; set; }
        public string LongDescription { get; set; }
        public string ShortDescription { get; set; }
        public int Amount { get; set; }
        public float Price { get; set; }
        public string ImageUrl { get; set; }
        public bool IsFavor { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public int PublisherId { get; set; }
        public List<int> AuthorId { get; set; }
        public List<int> GenreId { get; set; }
    }

    public class BookFullInfoVM
    {
        public string Title { get; set; }
        public int Pages { get; set; }
        public string Format { get; set; }
        public string LongDescription { get; set; }
        public string ShortDescription { get; set; }
        public int Amount { get; set; }
        public float Price { get; set; }
        public string ImageUrl { get; set; }
        public bool IsFavor { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string PublisherName { get; set; }
        public List<string> AuthorNames { get; set; }
        public List<string> GenreNames { get; set; }
    }

    public class BookWithAuthorsVM
    {
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
        public DateTime? ReleaseDate { get; set; }
        public string PublisherName { get; set; }
        public List<string> AuthorNames { get; set; }
        public List<string> GenreNames { get; set; }
    }

    public class BookForRecomendVM
    {
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
        public DateTime? ReleaseDate { get; set; }
        public string PublisherName { get; set; }
        public List<string> AuthorNames { get; set; }
        public List<string> GenreNames { get; set; }
        public int NumOfSales { get; set; }
    }

    class BookComparer : IEqualityComparer<BookForRecomendVM>
    {
        public bool Equals(BookForRecomendVM x, BookForRecomendVM y)
        {
            if (x.Id == y.Id)
                return true;

            return false;
        }

        public int GetHashCode(BookForRecomendVM obj)
        {
            return obj.Id.GetHashCode();
        }
    }



    public class UpdateCountBookVM
    {
        public int Id { get; set; }
        public int Amount { get; set; }
    }
}
