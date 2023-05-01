

using System.ComponentModel.DataAnnotations;

namespace MovieTicketsApi.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Director { get; set; }
        public string? Poster { get; set; }
        //virtual
        public List<Ticket>? Tickets { get; set; }
    }
}
