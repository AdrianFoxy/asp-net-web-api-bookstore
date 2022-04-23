using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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


        // Add New Genre
        [HttpPost("add-genre")]
        public async Task<IActionResult> AddGenre([FromBody] GenreVM genre)
        {
            await _genreService.AddGenreAsync(genre);
            return Ok(genre);
        }

        // DeletePublisher
        [HttpDelete("delete-genre-by-id/{id}")]
        public async Task<IActionResult> DeleteGenreById(int id)
        {
            await _genreService.DeleteAsync(id);
            return Ok();
        }
    }
}
