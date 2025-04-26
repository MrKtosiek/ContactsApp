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
		public Category Category { get; set; }
		public int? SubCategoryId { get; set; }
		public SubCategory? SubCategory { get; set; }
		public string? CustomSubCategory { get; set; }
	}
}
