using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieTicketsApi.Models;

namespace MovieTicketsApi.Data
{
    public class MovieTicketsApiContext : DbContext
    {
        public MovieTicketsApiContext (DbContextOptions<MovieTicketsApiContext> options)
            : base(options)
        {
        }

        public DbSet<MovieTicketsApi.Models.Movie> Movie { get; set; } = default!;
        public DbSet<MovieTicketsApi.Models.Ticket> Ticket { get; set; } = default!;
    }
}
