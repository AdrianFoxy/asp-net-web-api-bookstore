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
    public class PublisherController : ControllerBase
    {
        private IPublihserService _publihserService;

        public PublisherController(IPublihserService publihserService)
        {
            _publihserService = publihserService;
        }

        // Get All Publishers
        [HttpGet("get-all-publishers")]
        public async Task<IActionResult> GetAllPublishers()
        {
            var allPublishers= await _publihserService.GetAllAsync();
            return Ok(allPublishers);
        }

        // Get Publisher By Id
        [HttpGet("get-publisher-by-id/{id}")]
        public async Task<IActionResult> GetPublisherById(int id)
        {
            var publisher = await _publihserService.GetByIdAsync(id);
            return Ok(publisher);
        }

        [HttpGet("get-publishers-for-drop-list")]
        public async Task<IActionResult> GetPublishersForDropList()
        {
            var publisher = await _publihserService.GetPublishersForDropList();
            return Ok(publisher);
        }

        [HttpGet("get-all-publishers-pagination")]
        public async Task<IActionResult> GetFullAuthorPag([FromQuery] PaginationParams @params)
        {
            var allAuthors = await _publihserService.GetAllWithPaginationAsync(@params);
            var counter = await _publihserService.GetAllAsync();

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allAuthors);
        }

        // Add New Publishers
        [HttpPost("add-publisher")]
        public async Task<IActionResult> AddPublisher([FromBody] PublisherVM publisher)
        {
            await _publihserService.AddPublisherAsync(publisher);
            return Ok(publisher);
        }

        [HttpPut("update-publisher-by-id/{id}")]
        public async Task<IActionResult> UpdatePublisherById(int id, [FromBody] PublisherVM publisher)
        {

            var updatedPublisher = await _publihserService.UpdateAsync(id, publisher);
            return Ok(updatedPublisher);
        }

        // Delete Choosen Publisher
        [HttpDelete("delete-publisher-by-id/{id}")]
        public async Task<IActionResult> DeletePublisherById(int id)
        {
            await _publihserService.DeleteAsync(id);
            return Ok("Deleted");
        }
    }
}
