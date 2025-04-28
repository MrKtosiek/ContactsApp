using ContactsApp.Data;
using ContactsApp.Middleware;
using ContactsApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

ConfigureServices(builder);

var app = builder.Build();

ConfigureApp(app);

app.Run();



void ConfigureServices(WebApplicationBuilder builder)
{
	// Database
	builder.Services.AddDbContext<AppDbContext>(options =>
		options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

	// Controllers
	builder.Services.AddControllers();

	// Swagger
	builder.Services.AddEndpointsApiExplorer();
	builder.Services.AddSwaggerGen();

	// Dependency Injection
	builder.Services.AddScoped<IUserService, UserService>();
	builder.Services.AddScoped<IContactService, ContactService>();

	// JWT Authentication
	ConfigureJwt(builder);

	// Authorization
	builder.Services.AddAuthorization();

	// CORS
	ConfigureCors(builder);
}

void ConfigureJwt(WebApplicationBuilder builder)
{
	var jwtSettings = builder.Configuration.GetSection("JwtSettings");
	var issuer = jwtSettings["Issuer"];
	var audience = jwtSettings["Audience"];
	var secretKey = jwtSettings["SecretKey"];

	if (string.IsNullOrWhiteSpace(issuer) ||
		string.IsNullOrWhiteSpace(audience) ||
		string.IsNullOrWhiteSpace(secretKey))
	{
		throw new InvalidOperationException("JWT settings are not configured correctly.");
	}

	builder.Services.AddAuthentication("Bearer")
		.AddJwtBearer("Bearer", options => {
			options.TokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuer = true,
				ValidateAudience = true,
				ValidateLifetime = true,
				ValidateIssuerSigningKey = true,
				ValidIssuer = issuer,
				ValidAudience = audience,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
			};
		});
}

void ConfigureCors(WebApplicationBuilder builder)
{
	var AllowSpecificOrigins = "_allowSpecificOrigins";
	builder.Services.AddCors(options =>
	{
		options.AddPolicy(name: AllowSpecificOrigins,
			policy =>
			{
				policy.WithOrigins("http://localhost:5173")
					.AllowAnyHeader()
					.AllowAnyMethod();
			});
	});
}

void ConfigureApp(WebApplication app)
{
	// Configure the HTTP request pipeline.
	if (app.Environment.IsDevelopment())
	{
		app.UseSwagger();
		app.UseSwaggerUI();
	}

	SeedDatabase(app);

	app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

	app.UseHttpsRedirection();

	app.UseCors("_allowSpecificOrigins");

	app.UseAuthentication();
	app.UseAuthorization();

	app.MapControllers();
}

void SeedDatabase(WebApplication app)
{
	using (var scope = app.Services.CreateScope())
	{
		var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
		dbContext.Database.EnsureCreated();
		Seeder.Seed(dbContext);
	}
}
