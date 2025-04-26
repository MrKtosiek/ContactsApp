using ContactsApp.Models;

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
					new Category { Name = "Business" },
					new Category { Name = "Private" },
					new Category { Name = "Other" }
				};

				context.Categories.AddRange(categories);
				context.SaveChanges();

				var business = context.Categories.First(c => c.Name == "Business");

				context.SubCategories.AddRange(new List<SubCategory>
				{
					new SubCategory { Name = "Boss", CategoryId = business.Id },
					new SubCategory { Name = "Client", CategoryId = business.Id }
				});

				context.SaveChanges();
			}

			if (!context.Contacts.Any())
			{
				var kontakt = new Contact
				{
					FirstName = "Jan",
					LastName = "Kowalski",
					Email = "jan@kowalski.pl",
					CategoryId = context.Categories.First(c => c.Name == "Private").Id
				};

				context.Contacts.Add(kontakt);
				context.SaveChanges();
			}
		}
	}
}
