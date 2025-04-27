namespace ContactsApp.Models
{
	public class Contact
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; } // unique among each user's contacts
		public string PasswordHash { get; set; }
		public int CategoryId { get; set; }
		public Category Category { get; set; }
		public int? SubCategoryId { get; set; }
		public SubCategory? SubCategory { get; set; } // only used if category is "Private"
		public string? CustomSubCategory { get; set; } // only used if category is "Other"
		public string PhoneNumber { get; set; }
		public DateOnly BirthDate { get; set; }
	}
}
