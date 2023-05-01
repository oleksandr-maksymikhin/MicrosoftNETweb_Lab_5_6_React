using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieTicketsApi.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        public int Row { get; set; }
        public int Seat { get; set; }
        public int Price { get; set; }
        [ForeignKey("FK_123_Movie")]
        public int MovieId { get; set; }
        //virtual
        public Movie? Movie { get; set; }
    }
}
