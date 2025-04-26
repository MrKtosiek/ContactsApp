using ContactsApp.Models;

namespace ContactsApp.DTOs
{
	public class ContactDetailsDto
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public int CategoryId { get; set; }
		public string Category { get; set; }
		public string? SubCategory { get; set; }

		public ContactDetailsDto(Contact contact)
		{
			Id = contact.Id;
			FirstName = contact.FirstName;
			LastName = contact.LastName;
			Email = contact.Email;
			CategoryId = contact.CategoryId;
			Category = contact.Category.Name;

			if (contact.SubCategory != null)
			{
				SubCategory = contact.SubCategory.Name;
			}
			else if (contact.CustomSubCategory != null)
			{
				SubCategory = contact.CustomSubCategory;
			}
			else
			{
				SubCategory = null;
			}
		}

	}
}
