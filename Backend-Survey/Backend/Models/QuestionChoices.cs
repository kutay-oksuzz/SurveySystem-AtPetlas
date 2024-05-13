using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class QuestionChoices
    {
        [Key]
        public int choiceId { get; set; }
        public string choiceText { get; set; }

        // Sorunun ID'si
        public int QuestionId { get; set; }

        public virtual Question Question { get; set; } 

    }
}
