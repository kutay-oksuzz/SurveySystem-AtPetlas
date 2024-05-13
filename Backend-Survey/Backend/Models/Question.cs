using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Question
    {
        [Key]
        public int questionId { get; set; }
        public string questionText {  get; set; }

        public string questionType { get; set; }

        // Anketin ID'si
        public int SurveyId { get; set; }

        public virtual Surveys Survey { get; set; }


    }
}
