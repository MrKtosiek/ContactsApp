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

		public async Task<Contact?> AddContactAsync(NewContactDto dto)
		{
			if (await _context.Contacts.AnyAsync(c => c.Email == dto.Email))
				return null;

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
			return contact;
		}

		public async Task<Contact?> GetContactByIdAsync(int id)
		{
			return await _context.Contacts
				.Include(c => c.Category)
				.Include(c => c.SubCategory)
				.FirstOrDefaultAsync(c => c.Id == id);
		}

		public async Task<IEnumerable<Contact>> GetAllContactsAsync()
		{
			return await _context.Contacts
				.Include(c => c.Category)
				.Include(c => c.SubCategory)
				.ToListAsync();
		}

		public async Task<Contact?> UpdateContactByIdAsync(int id, UpdateContactDto dto)
		{
			var contact = await _context.Contacts.FindAsync(id);
			if (contact == null)
				return null;

			contact.FirstName = dto.FirstName;
			contact.LastName = dto.LastName;
			contact.Email = dto.Email;
			contact.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
			contact.CategoryId = dto.CategoryId;
			contact.SubCategoryId = dto.SubCategoryId;
			contact.CustomSubCategory = dto.CustomSubCategory;

			await _context.SaveChangesAsync();
			return contact;
		}
	}
}
