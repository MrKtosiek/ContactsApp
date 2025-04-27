using ContactsApp.DTOs;
using ContactsApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactsApp.Controllers
{
	[ApiController]
	[Route("api/contacts")]
	public class ContactsController : ControllerBase
	{
		private readonly IContactService _contactService;

		public ContactsController(IContactService contactService)
		{
			_contactService = contactService;
		}

		[HttpPost]
		public async Task<IActionResult> AddContact([FromBody] NewContactDto dto)
		{
			await _contactService.AddContactAsync(dto);

			return Ok();
		}

		[HttpGet]
		public async Task<IActionResult> GetAllContactsAsync()
		{
			var contacts = await _contactService.GetAllContactsAsync();

			return Ok(contacts);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetContactByIdAsync(int id)
		{
			var contact = await _contactService.GetContactByIdAsync(id);

			return Ok(contact);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateContactByIdAsync(int id, [FromBody] UpdateContactDto dto)
		{
			await _contactService.UpdateContactByIdAsync(id, dto);

			return Ok();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteContactByIdAsync(int id)
		{
			await _contactService.DeleteContactByIdAsync(id);

			return Ok();
		}
	}
}
