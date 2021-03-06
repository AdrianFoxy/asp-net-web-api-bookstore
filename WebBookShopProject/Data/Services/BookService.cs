using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;


namespace WebBookShopProject.Data.Services
{
    public class BookService : IBookService
    {
        private AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUserService _userservice;



        public BookService(AppDbContext context, IUserService userservice)
        {
            _context = context;
            _userservice = userservice;
        }

        public async Task<IEnumerable<BookForRecomendVM>> GetBookForAgeGroup(int age)
        {
            int Agefrom = 0;
            int Ageto = 0;

            if (age >= 0 && age <= 16) { Agefrom = 0; Ageto = 16; }
            else if (age >= 17 && age <= 27) { Agefrom = 16; Ageto = 27; }
            else if (age >= 28 && age <= 35) { Agefrom = 28; Ageto = 35; }
            else if (age >= 36 && age <= 50) { Agefrom = 36; Ageto = 50; }
            else { Agefrom = 51; Ageto = 10000; }


            var query =
                from b in _context.Book
                from oi in b.OrderItem
                where EF.Functions.DateDiffYear(oi.Order.ApplicationUser.DateofBirth, DateTime.Now) >= Agefrom
                    && EF.Functions.DateDiffYear(oi.Order.ApplicationUser.DateofBirth, DateTime.Now) <= Ageto
                group oi by new { Id = b.Id, Title = b.Title, Pages = b.Pages, Format = b.Format, LongDescription = b.LongDescription, ShortDescription = b.LongDescription,
                Amount = b.Amount, Price = b.Price, ImageUrl = b.ImageUrl, IsFavor = b.IsFavor, PublisherName = b.Publisher.Name} into g
                select new BookForRecomendVM()
                {
                    Id = g.Key.Id,
                    Title = g.Key.Title,
                    Pages = g.Key.Pages,
                    Format = g.Key.Format,
                    LongDescription = g.Key.LongDescription,
                    ShortDescription = g.Key.ShortDescription,
                    Amount = g.Key.Amount,
                    Price = g.Key.Price,
                    ImageUrl = g.Key.ImageUrl,
                    IsFavor = g.Key.IsFavor,
                    PublisherName = g.Key.PublisherName,
                    NumOfSales = g.Sum(x => x.Amount)
                };

            query = query.OrderByDescending(x => x.NumOfSales);

            return query;
        }

        public async Task<IEnumerable<BookForRecomendVM>> GetRecomentByDif(string userid, int age)
        {
            var list1 = GetPurchasedBooks(userid);
            var list2 = GetBookForAgeGroup(age);

            var resultedCol = (await list2).Except(await list1, new BookComparer()).Take(5);

            return resultedCol;

        }

        public async Task<IEnumerable<BookForRecomendVM>> GetPurchasedBooks(string userid)
        {
            //var result = await _context.Book.Include(oi => oi.OrderItem.Where(o => o.Order.UserID == userid)).ToListAsync();
            var result =
                from b in _context.Book
                where b.OrderItem.Any(bg => bg.Order.UserID == userid)
                select new BookForRecomendVM()
                {
                    Id = b.Id,
                    Title = b.Title,
                    Pages = b.Pages,
                    Format = b.Format,
                    LongDescription = b.LongDescription,
                    ShortDescription = b.ShortDescription,
                    Amount = b.Amount,
                    Price = b.Price,
                    ImageUrl = b.ImageUrl,
                    IsFavor = b.IsFavor,
                    PublisherName = b.Publisher.Name,
                    NumOfSales = 0
                };
            return result;
        }


        public async Task<IEnumerable<Book>> GetAllAsync()
        {
            var result = await _context.Book.ToListAsync();
            return result;
        }

        public async Task<IEnumerable<Book>> GetAllFavoriteAsync()
        {
            var result = await _context.Book.Where(x => x.IsFavor == true).ToListAsync();
            return result;
        }


        //public async Task<IEnumerable<BookWithAuthorsVM>> GetRecommendationForAgeGroup()
        //{

        //}

        public async Task<IEnumerable<BookWithAuthorsVM>> GetWhatToReadsync()
        {
            var books = await _context.Book.Select(book => new BookWithAuthorsVM()
            {
                Id = book.Id,
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ReleaseDate = book.ReleaseDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).OrderBy(p => p.Id)
              .ToListAsync();

            var count = books.Count();

            List<BookWithAuthorsVM> list = new List<BookWithAuthorsVM>();

            Random rnd = new Random();

            while(list.Count() != 5)
            {
                int value = rnd.Next(0, count);

                var result = books.ElementAt(value);

                if (!list.Contains(books.ElementAt(value)))
                    list.Add(result);
            }

            return list;
        }


        public async Task<IEnumerable<Book>> GetSeachedCountAsync(string searchedString)
        {
            var result = await _context.Book.Where(n => n.Title.Contains(searchedString) || n.LongDescription.Contains(searchedString) || n.ShortDescription.Contains(searchedString)).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<Book>> GetGenreCountAsync(string genre)
        {
            var result = await _context.Book.Where(g => g.Book_Genre.Any(mg => mg.Genre.NameForUrl == genre)).ToListAsync();
            return result;
        }

        //
        public async Task<IEnumerable<Book>> GetTypeGenreCountAsync(string genre)
        {
            var result = from b in _context.Book
                           where b.Book_Genre.Any(bg => bg.Genre.TypeGenre.NameForUrl == genre)
                           select b;
                       return result;
        }

        public async Task<IEnumerable<Book>> GetAuthorCountAsync(string author)
        {
            var result = await _context.Book.Where(g => g.Book_Author.Any(mg => mg.Author.NameForUrl == author)).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<BookWithAuthorsVM>> GetAllWithAuthorAsync(PaginationParams @params)
        {
            var result = await _context.Book.Select(book => new BookWithAuthorsVM()
            {
                Id = book.Id,
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ReleaseDate = book.ReleaseDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).OrderBy(p => p.Id)
            .ToListAsync();

            var items =  result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }


        public async Task<IEnumerable<BookWithAuthorsVM>> GetAllSearchedAsync(PaginationParams @params, string searchedString)
        {
            var result = await _context.Book.Select(book => new BookWithAuthorsVM()
            {
                Id = book.Id,
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ReleaseDate = book.ReleaseDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).OrderBy(p => p.Id)
            .ToListAsync();

            if (!string.IsNullOrEmpty(searchedString))
            {
                result = result.Where(n => n.Title.Contains(searchedString) || n.LongDescription.Contains(searchedString) || n.ShortDescription.Contains(searchedString)).ToList();
            }

            var items = result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }


        public async Task<IEnumerable<BookWithAuthorsVM>> GetAllFavoriteBook(PaginationParams @params)
        {
            var result = await _context.Book.Where(x => x.IsFavor == true).Select(book => new BookWithAuthorsVM()
            {
                Id = book.Id,
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ReleaseDate = book.ReleaseDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).OrderBy(p => p.Id)
            .ToListAsync();

            var items = result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }

        public async Task<IEnumerable<BookWithAuthorsVM>> GetAllByAuthor(string NameForUrl, PaginationParams @params)
        {
            var result = await _context.Book.Where(g => g.Book_Author.Any(mg => mg.Author.NameForUrl == NameForUrl)).Select(book => new BookWithAuthorsVM()
            {
                Id = book.Id,
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ReleaseDate = book.ReleaseDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).OrderBy(p => p.Id)
              .ToListAsync();

            var items = result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }

        public async Task<IEnumerable<BookWithAuthorsVM>> GetAllByGenre(string genre, PaginationParams @params)
        {
            var result = await _context.Book.Where(g => g.Book_Genre.Any(mg => mg.Genre.NameForUrl == genre)).Select(book => new BookWithAuthorsVM()
            {
                Id = book.Id,
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ReleaseDate = book.ReleaseDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).OrderBy(p => p.Id)
              .ToListAsync();

            var items = result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }


        public async Task<IEnumerable<BookWithAuthorsVM>> GetAllByTypeGenre(string genre, PaginationParams @params)
        {
            var result =
                from b in _context.Book
                where b.Book_Genre.Any(bg => bg.Genre.TypeGenre.NameForUrl == genre)
                select new BookWithAuthorsVM()
                {
                    Id = b.Id,
                    Title = b.Title,
                    Pages = b.Pages,
                    Format = b.Format,
                    LongDescription = b.LongDescription,
                    ShortDescription = b.ShortDescription,
                    Amount = b.Amount,
                    Price = b.Price,
                    ImageUrl = b.ImageUrl,
                    IsFavor = b.IsFavor,
                    ReleaseDate = b.ReleaseDate,
                    PublisherName = b.Publisher.Name,
                    AuthorNames = b.Book_Author.Select(n => n.Author.FullName).ToList(),
                    GenreNames = b.Book_Genre.Select(g => g.Genre.Name).ToList()
                };


            var items = result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }

        public async Task<BookFullInfoVM> GetByIdAsync(int id)
        {
            var _book_full =  await _context.Book.Where(n => n.Id == id).Select(book => new BookFullInfoVM()
            {
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ReleaseDate = book.ReleaseDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).FirstOrDefaultAsync();

            return _book_full;
        }
        public async Task<BookFullInfoForUpdateVM> GetForUpdateByIdAsync(int id)
        {
            var _book_full = await _context.Book.Where(n => n.Id == id).Select(book => new BookFullInfoForUpdateVM()
            {
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ReleaseDate = book.ReleaseDate,
                PublisherId = book.Publisher.Id,
                AuthorId = book.Book_Author.Select(n => n.Author.Id).ToList(),
                GenreId = book.Book_Genre.Select(g => g.Genre.Id).ToList()
            }).FirstOrDefaultAsync();

            return _book_full;
        }

        public async Task<UpdateCountBookVM> GetUpdateAmountId(int id)
        {
            var _book = await _context.Book.Where(n => n.Id == id).Select(book => new UpdateCountBookVM()
            {
                Amount = book.Amount

            }).FirstOrDefaultAsync();

            return _book;
        }

        public async Task AddBookAsync (BookVM book, string pathImg)
        {
            var _book = new Book()
            {
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = pathImg,
                IsFavor = book.IsFavor,
                ReleaseDate = book.ReleaseDate,
                Fk_PublisherId = book.Fk_PublisherId
            };
            await _context.Book.AddAsync(_book);
            await _context.SaveChangesAsync();

            foreach (var id in book.AuthorsId)
            {
                var _book_author = new Book_Author()
                {
                    Fk_BookId = _book.Id,
                    Fk_AuthorId = id
                };
                await _context.Book_Author.AddAsync(_book_author);
                await _context.SaveChangesAsync();
            }

            foreach (var id in book.GenresId)
            {
                var _book_genre = new Book_Genre()
                {
                    Fk_BookId = _book.Id,
                    Fk_GenreId = id
                };
                await _context.Book_Genre.AddAsync(_book_genre);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Book> UpdateAsync(int id, BookVM book, string imagePath)
        {

            var _book = await _context.Book.FirstOrDefaultAsync(n => n.Id == id);
            if(_book != null)
            {
                _book.Title = book.Title;
                _book.Pages = book.Pages;
                _book.Format = book.Format;
                _book.LongDescription = book.LongDescription;
                _book.ShortDescription = book.ShortDescription;
                _book.ImageUrl = imagePath;
                _book.Amount = book.Amount;
                _book.Price = book.Price;
                _book.IsFavor = book.IsFavor;
                _book.ReleaseDate = book.ReleaseDate;

                await _context.SaveChangesAsync();
            };
            // Remove existing authors
            var existingAuthorsDb = _context.Book_Author.Where(n => n.Fk_BookId == id).ToList();
            _context.Book_Author.RemoveRange(existingAuthorsDb);
            await _context.SaveChangesAsync();

            // Add book authors
            foreach (var AuthorId in book.AuthorsId)
            {
                var newAuthorBook = new Book_Author()
                {
                    Fk_BookId = id,
                    Fk_AuthorId = AuthorId
                };
                await _context.Book_Author.AddAsync(newAuthorBook);
            }
            await _context.SaveChangesAsync();

            var existingGenresDb = _context.Book_Genre.Where(n => n.Fk_BookId == id).ToList();
            _context.Book_Genre.RemoveRange(existingGenresDb);
            await _context.SaveChangesAsync();

            // Add book genres
            foreach (var GenreId in book.GenresId)
            {
                var newGenreBook = new Book_Genre()
                {
                    Fk_BookId = id,
                    Fk_GenreId = GenreId
                };
                await _context.Book_Genre.AddAsync(newGenreBook);
            }
            await _context.SaveChangesAsync();

            return _book;
        }

        public async Task<Book> GetByIdShopAsync(int id)
        {
            var bookDet = _context.Book
                .FirstOrDefaultAsync(n => n.Id == id);

            return await bookDet;
        }


        public async Task DeleteAsync(int id)
        {
            var _book = await _context.Book.FirstOrDefaultAsync(n => n.Id == id);
            if(_book != null)
            {
                _context.Book.Remove(_book);
                await _context.SaveChangesAsync();
            } 
        }


        public async Task UpdateBookAmountAsync(UpdateCountBookVM updatedBook, int id)
        {
            var book = await _context.Book.FirstOrDefaultAsync(n => n.Id == id);

            book.Amount = updatedBook.Amount;

            await _context.SaveChangesAsync();
        }
    }
}
