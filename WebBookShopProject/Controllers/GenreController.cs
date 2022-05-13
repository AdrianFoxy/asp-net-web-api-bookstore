using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.Services;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private IGenreService _genreService;

        public GenreController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        // Get All Genres
        [HttpGet("get-all-genres")]
        public async Task<IActionResult> GetAllGenre()
        {
            var alllGenres = await _genreService.GetAllAsync();
            return Ok(alllGenres);
        }

        [HttpGet("get-all-genres-pagination")]
        public async Task<IActionResult> GetAllGenresPag([FromQuery] PaginationParams @params)
        {
            var allGenres = await _genreService.GetAllWithPaginationAsync(@params);
            var counter = await _genreService.GetAllAsync();

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allGenres);
        }

        // Get info about desc genre
        [HttpGet("get-genre-description/{genre}")]
        public async Task<IActionResult> GetBookById(string genre)
        {
            var genreDesc = await _genreService.GetGenreDescByName(genre);
            return Ok(genreDesc);
        }

        [HttpGet("get-genres-for-drop-list")]
        public async Task<IActionResult> GetGenresForDropList()
        {
            var responce = await _genreService.GetGenresForDropList();
            return Ok(responce);
        }

        [HttpGet("get-genre-by-id/{id}")]
        public async Task<IActionResult> GetGenreById(int id)
        {
            var responce = await _genreService.GetByForViewIdAsync(id);
            return Ok(responce);
        }

        [HttpGet("get-genre-for-update-by-id/{id}")]
        public async Task<IActionResult> GetGenreForUpdateById(int id)
        {
            var responce = await _genreService.GetForUpdateByIdAsync(id);
            return Ok(responce);
        }


        // Add New Genre
        [HttpPost("add-genre")]
        public async Task<IActionResult> AddGenre([FromBody] GenreVM genre)
        {
            await _genreService.AddGenreAsync(genre);
            return Ok(genre);
        }

        [HttpPut("update-genre-by-id/{id}")]
        public async Task<IActionResult> UpdateGenreById(int id, [FromBody] GenreVM genre)
        {

            var updatedGenre = await _genreService.UpdateAsync(id, genre);
            return Ok(updatedGenre);
        }

        // DeletePublisher
        [HttpDelete("delete-genre-by-id/{id}")]
        public async Task<IActionResult> DeleteGenreById(int id)
        {
            await _genreService.DeleteAsync(id);
            return Ok("Deleted");
        }
    }
}
