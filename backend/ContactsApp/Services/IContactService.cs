using ContactsApp.DTOs;
using ContactsApp.Models;

namespace ContactsApp.Services
{
	public interface IContactService
	{
		public Task<Contact?> AddContactAsync(NewContactDto dto);
		public Task<Contact?> GetContactByIdAsync(int id);
		public Task<IEnumerable<Contact>> GetAllContactsAsync();
		public Task<Contact?> UpdateContactByIdAsync(int id, UpdateContactDto dto);
	}
}
