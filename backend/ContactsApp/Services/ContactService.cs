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

			Category? category = await _context.Categories.FirstOrDefaultAsync(c => c.Name == dto.Category);
			if (category == null)
				throw new ArgumentException("Invalid category.");

			if (!CheckSubCategoryRules(dto.SubCategory, dto.CustomSubCategory, category))
				throw new ArgumentException("Invalid subcategory.");

			var contact = new Contact
			{
				FirstName = dto.FirstName,
				LastName = dto.LastName,
				Email = dto.Email,
				Password = dto.Password,
				Category = category,
				SubCategory = category.SubCategories.FirstOrDefault(c => c.Name == dto.SubCategory),
				CustomSubCategory = dto.CustomSubCategory,
				PhoneNumber = dto.PhoneNumber,
				BirthDate = dto.BirthDate
			};

			await _context.Contacts.AddAsync(contact);
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
				throw new KeyNotFoundException("Contact not found.");

			if (await _context.Contacts.AnyAsync(c => c != contact && c.Email == dto.Email))
				throw new InvalidOperationException("This email is already used by another contact.");

			Category? category = await _context.Categories
				.Include(c => c.SubCategories)
				.FirstOrDefaultAsync(c => c.Name == dto.Category);
			if (category == null)
				throw new ArgumentException("Invalid category.");

			if (!CheckSubCategoryRules(dto.SubCategory, dto.CustomSubCategory, category))
				throw new ArgumentException("Invalid subcategory.");

			contact.FirstName = dto.FirstName;
			contact.LastName = dto.LastName;
			contact.Email = dto.Email;
			contact.Password = dto.Password;
			contact.Category = category;
			contact.SubCategory = category.SubCategories.FirstOrDefault(c => c.Name == dto.SubCategory);
			contact.CustomSubCategory = dto.CustomSubCategory;
			contact.PhoneNumber = dto.PhoneNumber;
			contact.BirthDate = dto.BirthDate;

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
			await _context.SaveChangesAsync();
		}


		private bool CheckSubCategoryRules(string? subCategoryName, string? customSubCategoryName, Category category)
		{
			if (category.Name == "Work")
			{
				if (string.IsNullOrEmpty(subCategoryName))
				{
					return false;
				}
				if (!_context.SubCategories.Any(sc => sc.Name == subCategoryName))
				{
					return false;
				}
			}
			else if (category.Name == "Other")
			{
				if (string.IsNullOrEmpty(customSubCategoryName))
				{
					return false;
				}
			}
			return true;
		}
	}
}
