using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.ViewModels
{
    public class BookVM
    {
        //public int Id { get; set; }
        public string Title { get; set; }
        public int Pages { get; set; }
        public string Format { get; set; }
        public string LongDescription { get; set; }
        public string ShortDescription { get; set; }
        public int Amount { get; set; }
        public float Price { get; set; }
        //public string ImageUrl { get; set; }
        public bool IsFavor { get; set; }
        public DateTime? ResealeDate { get; set; }
        public int Fk_PublisherId { get; set; }
        public List<int> AuthorsId { get; set; }
        public List<int> GenresId { get; set; }
    }

    public class BookImgVM
    {
        //public int Id { get; set; }
        public string Title { get; set; }
        public int Pages { get; set; }
        public string Format { get; set; }
        public string LongDescription { get; set; }
        public string ShortDescription { get; set; }
        public int Amount { get; set; }
        public float Price { get; set; }
        //public string ImageUrl { get; set; }
        public bool IsFavor { get; set; }
        public DateTime? ResealeDate { get; set; }
        public int Fk_PublisherId { get; set; }
        public List<int> AuthorsId { get; set; }
        public List<int> GenresId { get; set; }
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
        public DateTime? ResealeDate { get; set; }
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
        public DateTime? ResealeDate { get; set; }
        public string PublisherName { get; set; }
        public List<string> AuthorNames { get; set; }
        public List<string> GenreNames { get; set; }
    }
}
