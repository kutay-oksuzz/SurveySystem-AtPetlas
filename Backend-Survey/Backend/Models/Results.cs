using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Results
    {
        [Key]
        public int ResultId { get; set; }

        public int QuestionId { get; set; }  

        public int? ChoiceId { get; set; }

        public int ResSurveyId { get; set; }

        public string TextResponse {  get; set; }

       
        public virtual Question Questionsss { get; set; }

     
        public virtual QuestionChoices Choice { get; set; }

        public virtual Surveys Survey { get; set; }
    }
}
