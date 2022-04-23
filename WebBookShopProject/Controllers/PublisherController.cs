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

        // Add New Publishers
        [HttpPost("add-publisher")]
        public async Task<IActionResult> AddPublisher([FromBody] PublisherVM publisher)
        {
            await _publihserService.AddPublisherAsync(publisher);
            return Ok(publisher);
        }

        // Delete Choosen Publisher
        [HttpDelete("delete-publisher-by-id/{id}")]
        public async Task<IActionResult> DeletePublisherById(int id)
        {
            await _publihserService.DeleteAsync(id);
            return Ok();
        }
    }
}
