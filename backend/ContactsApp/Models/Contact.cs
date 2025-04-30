using System.ComponentModel.DataAnnotations;

namespace ContactsApp.Models
{
	public class Contact
	{
		public int Id { get; set; }
		[Required] public string FirstName { get; set; }
		[Required] public string LastName { get; set; }
		[Required, EmailAddress] public string Email { get; set; } // unique
		[Required, MinLength(8)] public string Password { get; set; } // This shouldn't be stored in a real application
		[Required] public int CategoryId { get; set; }
		public Category Category { get; set; }
		public int? SubCategoryId { get; set; }
		public SubCategory? SubCategory { get; set; } // only used if category is "Work"
		public string? CustomSubCategory { get; set; } // only used if category is "Other"
		[Required, Phone] public string PhoneNumber { get; set; }
		[Required] public DateOnly BirthDate { get; set; }
	}
}
