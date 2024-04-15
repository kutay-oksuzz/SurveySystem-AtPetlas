using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Surveys
    {
        [Key]
        public int surveyId { get; set; }
        public string surveyText { get; set; }

        public string surveyDescription { get; set; }

        public DateTime surveyDate { get; set; }

        public Surveys()
        {
            surveyDate = DateTime.Now; // Oluşturulduğu andaki tarih
        }

    }
}
