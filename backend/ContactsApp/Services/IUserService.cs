using ContactsApp.DTOs;

namespace ContactsApp.Services
{
	public interface IUserService
	{
		public Task RegisterAsync(RegisterDto dto);
		public Task<string> LoginAsync(LoginDto dto);
	}
}
