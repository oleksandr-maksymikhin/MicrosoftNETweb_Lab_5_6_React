using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MovieTicketsApi.Data;
namespace MovieTicketsApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<MovieTicketsApiContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("MovieTicketsApiContext") ?? throw new InvalidOperationException("Connection string 'MovieTicketsApiContext' not found.")));

            // Add services to the container.

            builder.Services.AddControllers();

            //to override the error of "Access to XMLHttpRequest at 'http://localhost:5095/api/movies' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."
            builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
            {
                builder.WithOrigins("http://192.168.1.100:4200", "http://localhost:4200", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
            }));

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Configure the HTTP request pipeline.
            //to override the error of "Access to XMLHttpRequest at 'http://localhost:5095/api/movies' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."
            app.UseCors("corsapp");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}