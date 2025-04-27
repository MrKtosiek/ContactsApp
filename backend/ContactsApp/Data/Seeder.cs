using ContactsApp.Models;
using Microsoft.AspNetCore.Identity;

namespace ContactsApp.Data
{
	public class Seeder
	{
		public static void Seed(AppDbContext context)
		{
			if (!context.Categories.Any())
			{
				var categories = new List<Category>
				{
					new Category { Name = "Work" },
					new Category { Name = "Private" },
					new Category { Name = "Other" }
				};

				context.Categories.AddRange(categories);
				context.SaveChanges();

				var work = context.Categories.First(c => c.Name == "Work");

				context.SubCategories.AddRange(new List<SubCategory>
				{
					new SubCategory { Name = "Boss", CategoryId = work.Id },
					new SubCategory { Name = "Client", CategoryId = work.Id }
				});

				context.SaveChanges();
			}

			if (!context.Contacts.Any())
			{
				var contacts = new List<Contact>
				{
					new Contact
					{
						FirstName = "Jan",
						LastName = "Kowalski",
						Email = "jan@kowalski.pl",
						PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
						CategoryId = context.Categories.First(c => c.Name == "Private").Id,
						PhoneNumber = "123456789",
						BirthDate = new DateOnly(1970, 1, 1)
					},
					new Contact
					{
						FirstName = "Wojciech",
						LastName = "Nowak",
						Email = "wojciech@nowak.pl",
						PasswordHash = BCrypt.Net.BCrypt.HashPassword("password456"),
						CategoryId = context.Categories.First(c => c.Name == "Work").Id,
						SubCategoryId = context.SubCategories.First(sc => sc.Name == "Client").Id,
						PhoneNumber = "987654321",
						BirthDate = new DateOnly(1993, 12, 10)
					},
					new Contact
					{
						FirstName = "Mariusz",
						LastName = "Kowalczyk",
						Email = "mariusz@kowalczyk.pl",
						PasswordHash = BCrypt.Net.BCrypt.HashPassword("password789"),
						CategoryId = context.Categories.First(c => c.Name == "Work").Id,
						SubCategoryId = context.SubCategories.First(sc => sc.Name == "Boss").Id,
						PhoneNumber = "321654987",
						BirthDate = new DateOnly(1981, 12, 13)
					},
					new Contact
					{
						FirstName = "Andrzej",
						LastName = "Wiśniewski",
						Email = "andrzej@wisniewski.pl",
						PasswordHash = BCrypt.Net.BCrypt.HashPassword("password321"),
						CategoryId = context.Categories.First(c => c.Name == "Other").Id,
						CustomSubCategory = "Dentist",
						PhoneNumber = "789456123",
						BirthDate = new DateOnly(2000, 2, 24)
					}
				};

				context.Contacts.AddRange(contacts);
				context.SaveChanges();
			}
		}
	}
}
