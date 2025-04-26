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
		public IActionResult AddContact([FromBody] NewContactDto dto)
		{
			_contactService.AddContactAsync(dto).Wait();

			return Ok();
		}

		[HttpGet]
		public IActionResult GetAllContacts()
		{
			var contacts = _contactService.GetAllContactsAsync().Result;

			return Ok(contacts);
		}

		[HttpGet("{id}")]
		public IActionResult GetContactById(int id)
		{
			var contact = _contactService.GetContactByIdAsync(id).Result;

			return Ok(contact);
		}

		[HttpPut("{id}")]
		public IActionResult UpdateContactById(int id, [FromBody] UpdateContactDto dto)
		{
			_contactService.UpdateContactByIdAsync(id, dto);

			return Ok();
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteContactById(int id)
		{
			_contactService.DeleteContactByIdAsync(id);

			return Ok();
		}
	}
}
