using System.Net;

namespace ContactsApp.Middleware
{
	public class GlobalExceptionHandlerMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

		public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
		{
			_next = next;
			_logger = logger;
		}

		public async Task InvokeAsync(HttpContext httpContext)
		{
			try
			{
				await _next(httpContext);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "An unexpected error occurred.");

				// Set status to 500
				httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
				httpContext.Response.ContentType = "application/json";
				var errorResponse = new { message = "An unexpected error occurred. Please try again later." };
				await httpContext.Response.WriteAsJsonAsync(errorResponse);
			}
		}
	}
}
