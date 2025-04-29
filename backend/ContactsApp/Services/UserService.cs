using ContactsApp.Data;
using ContactsApp.DTOs;
using ContactsApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ContactsApp.Services
{
	public class UserService : IUserService
	{
		private readonly AppDbContext _context;
		private readonly IConfiguration _configuration;

		public UserService(AppDbContext context, IConfiguration configuration)
		{
			_context = context;
			_configuration = configuration;
		}

		public async Task RegisterAsync(RegisterDto dto)
		{
			if (string.IsNullOrEmpty(dto.Username) || string.IsNullOrEmpty(dto.Password))
			{
				throw new ArgumentException("Username and password are required.");
			}

			if (await _context.Users.AnyAsync(u => u.Name == dto.Username))
			{
				throw new InvalidOperationException("Username taken.");
			}

			if (!IsValidPassword(dto.Password))
			{
				throw new ArgumentException("Password must be at least 8 characters long and contain at least one letter and one digit.");
			}

			var user = new User
			{
				Name = dto.Username,
				PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
			};

			await _context.Users.AddAsync(user);
			await _context.SaveChangesAsync();
		}

		public async Task<string> LoginAsync(LoginDto dto)
		{
			User? user = await _context.Users.FirstOrDefaultAsync(u => u.Name == dto.Username);

			if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
			{
				throw new InvalidOperationException("Invalid username or password.");
			}

			return GenerateToken(user);
		}

		private bool IsValidPassword(string password)
		{
			if (string.IsNullOrWhiteSpace(password)) return false;

			// Minimum 8 chars, one letter and one digit
			var hasMinimumLength = password.Length >= 8;
			var hasLetter = password.Any(char.IsLetter);
			var hasDigit = password.Any(char.IsDigit);

			return hasMinimumLength && hasLetter && hasDigit;
		}

		private string GenerateToken(User user)
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.Name),
			};

			var issuer = _configuration["JwtSettings:Issuer"];
			var audience = _configuration["JwtSettings:Audience"];
			var secretKey = _configuration["JwtSettings:SecretKey"];
			var expirationString = _configuration["JwtSettings:TokenExpirationInMinutes"];

			// Validate JWT settings
			if (string.IsNullOrWhiteSpace(issuer) ||
				string.IsNullOrWhiteSpace(audience) ||
				string.IsNullOrWhiteSpace(secretKey) ||
				string.IsNullOrWhiteSpace(expirationString) ||
				!int.TryParse(expirationString, out int expiration))
			{
				throw new InvalidOperationException("JWT settings are not configured correctly.");
			}

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
			var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: issuer,
				audience: audience,
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(expiration),
				signingCredentials: credentials
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
