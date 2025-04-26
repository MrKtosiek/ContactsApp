using ContactsApp.Models;

namespace ContactsApp.DTOs
{
	public class ContactSummaryDto
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Category { get; set; }

		public ContactSummaryDto(Contact contact)
		{
			Id = contact.Id;
			FirstName = contact.FirstName;
			LastName = contact.LastName;
			Category = contact.Category.Name;
		}
	}
}
