﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Services;

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
    }
}
