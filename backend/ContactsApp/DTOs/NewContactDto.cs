using ContactsApp.Models;
using System.ComponentModel.DataAnnotations;

namespace ContactsApp.DTOs
{
	public class NewContactDto
	{
		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; }

		[Required]
		[MinLength(8)]
		public string Password { get; set; }

		[Required]
		public string Category { get; set; }
		public string? SubCategory { get; set; }
		public string? CustomSubCategory { get; set; }

		[Required] public string PhoneNumber { get; set; }
		[Required] public DateOnly BirthDate { get; set; }
	}
}
