namespace Backend.Models
{
    public class SurveyDataDTO
    {
        public SurveyDetailsDTO surveyDetails { get; set; }
        public List<QuestionDTO> questions { get; set; }

    }

    public class SurveyDetailsDTO
    {
        public string surveyName { get; set; }
        public string surveyDescription { get; set; }
    }

    public class QuestionDTO
    {

        public string questionText { get; set; }
        public string questionType { get; set; }
        public List<string> options { get; set; }

        public bool open { get; set; }
        public bool required { get; set; }
    }

    
}
