using Microsoft.AspNetCore.Authorization;
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
    public class TypeGenreController : ControllerBase
    {
        private ITypeGenreService _typeGenreService;

        public TypeGenreController(ITypeGenreService typeGenreService)
        {
            _typeGenreService = typeGenreService;
        }

        // Get All Type Genres
        [HttpGet("get-all-type-genres")]
        public async Task<IActionResult> GetAllPublishers()
        {
            var allTypes = await _typeGenreService.GetAllAsync();
            return Ok(allTypes);
        }

        // Get All Type Genres and their Genres
        [HttpGet("get-all-types-and-genres")]
        public async Task<IActionResult> GetFullAllBook()
        {
            var allTypes = await _typeGenreService.GetTypesAndGenres();
            return Ok(allTypes);
        }

        // Get TypeGenre Description
        [HttpGet("get-type-genre-description/{genre}")]
        public async Task<IActionResult> GetBookById(string genre)
        {
            var genreDesc = await _typeGenreService.GetTypeGenreDescByName(genre);
            return Ok(genreDesc);
        }

        [HttpGet("get-all-types-and-genres-eng")]
        public async Task<IActionResult> GetTypesAndGenresEng()
        {
            var allTypes = await _typeGenreService.GetTypesAndGenresEng();
            return Ok(allTypes);
        }

        [HttpGet("get-types-genres-for-drop-list")]
        public async Task<IActionResult> GetPublishersForDropList()
        {
            var result = await _typeGenreService.GetTypeGenresForDropList();
            return Ok(result);
        }

        [HttpGet("get-typegenre-by-id/{id}")]
        public async Task<IActionResult> GetTypeGenreById(int id)
        {
            var typegenre = await _typeGenreService.GetByIdAsync(id);
            return Ok(typegenre);
        }

        // Add New Publishers
        [Authorize(Roles = "Admin")]
        [HttpPost("add-typegenre")]
        public async Task<IActionResult> AddTypeGenre([FromBody] TypeGenreAddVM typegenre)
        {
            await _typeGenreService.AddTypeGenreAsync(typegenre);
            return Ok(typegenre);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update-typegenre-by-id/{id}")]
        public async Task<IActionResult> UpdateTypeGenreById(int id, [FromBody] TypeGenreAddVM typegenre)
        {

            var updated = await _typeGenreService.UpdateAsync(id, typegenre);
            return Ok(updated);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-typegenre-by-id/{id}")]
        public async Task<IActionResult> DeleteTypeGenreById(int id)
        {
            await _typeGenreService.DeleteAsync(id);
            return Ok("Deleted");
        }

    }
}
