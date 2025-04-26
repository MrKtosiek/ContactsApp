using ContactsApp.Data;
using ContactsApp.DTOs;
using ContactsApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsApp.Services
{
	public class ContactService : IContactService
	{
		private readonly AppDbContext _context;

		public ContactService(AppDbContext context)
		{
			_context = context;
		}

		public async Task AddContactAsync(NewContactDto dto)
		{
			if (await _context.Contacts.AnyAsync(c => c.Email == dto.Email))
				throw new InvalidOperationException("Contact with this email already exists.");

			var contact = new Contact
			{
				FirstName = dto.FirstName,
				LastName = dto.LastName,
				Email = dto.Email,
				CategoryId = dto.CategoryId,
				SubCategoryId = dto.SubCategoryId,
				CustomSubCategory = dto.CustomSubCategory
			};

			_context.Contacts.Add(contact);
			await _context.SaveChangesAsync();
		}

		public async Task<ContactDetailsDto?> GetContactByIdAsync(int id)
		{
			Contact? contact = await _context.Contacts
				.Include(c => c.Category)
				.Include(c => c.SubCategory)
				.FirstOrDefaultAsync(c => c.Id == id);

			if (contact == null)
			{
				throw new KeyNotFoundException("Contact not found.");
			}

			return new ContactDetailsDto(contact);
		}

		public async Task<IEnumerable<ContactSummaryDto>> GetAllContactsAsync()
		{
			return await _context.Contacts
				.Include(c => c.Category)
				.Include(c => c.SubCategory)
				.Select(c => new ContactSummaryDto(c))
				.ToListAsync();
		}

		public async Task UpdateContactByIdAsync(int id, UpdateContactDto dto)
		{
			var contact = await _context.Contacts.FindAsync(id);

			if (contact == null)
			{
				throw new KeyNotFoundException("Contact not found.");
			}

			contact.FirstName = dto.FirstName;
			contact.LastName = dto.LastName;
			contact.Email = dto.Email;
			contact.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
			contact.CategoryId = dto.CategoryId;
			contact.SubCategoryId = dto.SubCategoryId;
			contact.CustomSubCategory = dto.CustomSubCategory;

			await _context.SaveChangesAsync();
		}

		public async Task DeleteContactByIdAsync(int id)
		{
			var contact = await _context.Contacts.FindAsync(id);

			if (contact == null)
			{
				throw new KeyNotFoundException("Contact not found.");
			}

			_context.Contacts.Remove(contact);
		}
	}
}
