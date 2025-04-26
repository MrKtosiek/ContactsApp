using ContactsApp.DTOs;
using ContactsApp.Models;

namespace ContactsApp.Services
{
	public interface IContactService
	{
		public Task AddContactAsync(NewContactDto dto);
		public Task<ContactDetailsDto?> GetContactByIdAsync(int id);
		public Task<IEnumerable<ContactSummaryDto>> GetAllContactsAsync();
		public Task UpdateContactByIdAsync(int id, UpdateContactDto dto);
		public Task DeleteContactByIdAsync(int id);
	}
}
