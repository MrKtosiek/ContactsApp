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
		public int CategoryId { get; set; }
		public int? SubCategoryId { get; set; }
		public string? CustomSubCategory { get; set; }
	}
}
