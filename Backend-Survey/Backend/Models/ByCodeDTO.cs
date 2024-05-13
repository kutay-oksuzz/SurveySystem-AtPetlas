namespace Backend.Models
{
    public class ByCodeDTO
    {
        public SurveyDetailDTO surveyDetails { get; set; }
        public List<QuestionDTOCode> questionsByCode { get; set; }
    }

    public class SurveyDetailDTO
    {
        public string surveyName { get; set; }
        public int surveyId {  get; set; }
        public string surveyDescription { get; set; }
    }


    public class QuestionDTOCode
    {
        public int questionId { get; set; }
        public string questionText { get; set; }
        public string questionType { get; set; }
        public List<string> options { get; set; }
        public List<int> choiceIds { get; set; }
        public bool open { get; set; }
        public bool required { get; set; }
    }
}
