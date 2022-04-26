using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.Services;
using WebBookShopProject.Data.ViewModels;
using WebBookShopProject.Data.Dtos;
using System.Text.Json;

namespace WebBookShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        public IBookService _bookService;
        [Obsolete]
        private readonly IHostingEnvironment _hostingEnvironment;

        [Obsolete]
        public BookController(IBookService bookService, IHostingEnvironment hostingEnvironment)
        {
            _bookService = bookService;
            _hostingEnvironment = hostingEnvironment;
        }

        //[HttpGet("set/{data}")]
        //public IActionResult setsession(string data)
        //{
        //    HttpContext.Session.SetString("keyname", data);
        //    return Ok("session data set");
        //}

        //[HttpGet("get")]
        //public IActionResult getsessiondata()
        //{
        //    var sessionData = HttpContext.Session.GetString("keyname");
        //    return Ok(sessionData);
        //}


        // Get Books by Genre Name
        [HttpGet("get-all-books-by-genre/{genre}")]
        public async Task<IActionResult> GetBooksByGenre([FromQuery] PaginationParams @params, string genre)
        {
            var allBook = await _bookService.GetAllByGenre(genre, @params);

            var paginationMetadata = new PaginationMetadata(allBook.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        // Get Books by Genre Name
        [HttpGet("get-all-books-by-typegenre/{genre}")]
        public async Task<IActionResult> GetBooksByTypeGenre([FromQuery] PaginationParams @params, string genre)
        {
            var allBook = await _bookService.GetAllByTypeGenre(genre, @params);

            var paginationMetadata = new PaginationMetadata(allBook.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        // Get Books by Author Name
        [HttpGet("get-all-books-by-author/{fullName}")]
        public async Task<IActionResult> GetBooksByAuthor([FromQuery] PaginationParams @params, string fullName)
        {
            var allBook = await _bookService.GetAllByAuthor(fullName, @params);

            var paginationMetadata = new PaginationMetadata(allBook.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        [HttpGet("get-all-favorite-books")]
        public async Task<IActionResult> GetAllFavoriteBooks([FromQuery] PaginationParams @params)
        {
            var allBook = await _bookService.GetAllFavoriteBook(@params);

            var paginationMetadata = new PaginationMetadata(allBook.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        // List of all books + info about genres and authors
        // I used there my own terrible method, so I it can be broken)))
        [HttpGet("get-all-books-info")]
        public async Task<IActionResult> GetFullAllBook([FromQuery] PaginationParams @params)
        {
            var allBook = await _bookService.GetAllWithAuthorAsync(@params);
            //var counter = await _bookService.GetAllAsync();

            var paginationMetadata = new PaginationMetadata(allBook.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        [HttpGet("get-searched-books")]
        public async Task<IActionResult> GetSearchedBooks([FromQuery] PaginationParams @params, string searchString)
        {

            var allBook = await _bookService.GetAllSearchedAsync(@params, searchString);

            var paginationMetadata = new PaginationMetadata(allBook.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        // List of all book
        [HttpGet("get-all-books")]
        public async Task<IActionResult> GetAllBook()
        {
            var allBooks = await _bookService.GetAllAsync();
            return Ok(allBooks);
        }

        // Get info about book by Id
        [HttpGet("get-book-by-id/{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _bookService.GetByIdAsync(id);
            return Ok(book);
        }


        // Update choosed Book
        [HttpPut("update-book-by-id/{id}")]
        public async Task<IActionResult> UpdateBookById(int id, [FromForm]BookImgVM book, IFormFile image)
        {
            var imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "img", image.FileName);
            var streamImage = new FileStream(imagePath, FileMode.Append);
            image.CopyTo(streamImage);

            var updatedBook = await _bookService.UpdateAsync(id, book, imagePath);
            return Ok(updatedBook);
        }

        // Delete choosed Book
        [HttpDelete("delete-book-by-id/{id}")]
        public async Task<IActionResult> DeleteBookById(int id)
        {
            await _bookService.DeleteAsync(id);
            return Ok();
        }

        // All API's for ADD BOOK

        // Add New Book with Image
        [HttpPost("add-book")]
        public async Task<IActionResult> AddBookImage([FromForm] BookVM book, IFormFile image)
        {
            var imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "img", image.FileName);
            var streamImage = new FileStream(imagePath, FileMode.Append);
            image.CopyTo(streamImage);

            await _bookService.AddBookAsync(book, imagePath);

            return Ok(book);
        }

        //[HttpGet]
        //public IActionResult GetPublisher()
        //{
        //    //var studioDropdownData = await _bookService.GetBookDropdownsValues();

        //    //fk_id_studio_developer = new SelectList(studioDropdownData.StudioDeveloper, "Id_Studio_Developer", "Studio_Name");
        //}

    }
}
