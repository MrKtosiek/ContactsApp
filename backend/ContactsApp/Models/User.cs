using System.ComponentModel.DataAnnotations;

namespace ContactsApp.Models
{
	public class User
	{
		[Required] public int Id { get; set; }
		[Required] public string Name { get; set; }
		[Required] public string PasswordHash { get; set; }
	}
}
