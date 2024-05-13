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

        public string surveyCode { get; set; }

        public Surveys()
        {
            surveyDate = DateTime.Now; // Oluşturulduğu andaki tarih
            surveyCode = GenerateSurveyCode();
        }

        private string GenerateSurveyCode()
        {
            Random random = new Random();
            const string chars = "0123456789";
            char[] code = new char[5];
            for (int i = 0; i < 5; i++)
            {
                code[i] = chars[random.Next(chars.Length)];
            }
            return new string(code);
        }

    }
}
