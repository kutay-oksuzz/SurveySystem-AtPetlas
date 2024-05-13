using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.Extensions.Logging;
using Results = Backend.Models.Results;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly APIDbContext _context;

        public QuestionController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/Surveys
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Surveys>>> GetSurveys()
        {
            return await _context.Surveys.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Surveys>> GetSurvey(int id)
        {
            try
            {
                SurveyDataDTO editmodel = new SurveyDataDTO();
                SurveyDetailsDTO surveyDetails = new SurveyDetailsDTO();

                var survey = await _context.Surveys.FirstOrDefaultAsync(s => s.surveyId == id);

                if (survey == null)
                {
                    return NotFound("Survey not found.");
                }

                surveyDetails.surveyDescription = survey.surveyDescription;
                surveyDetails.surveyName = survey.surveyText;
                editmodel.surveyDetails = surveyDetails;

                var questions = await _context.Questions
                    .Where(q => q.SurveyId == survey.surveyId)
                    .ToListAsync();

                if (questions == null || questions.Count == 0)
                {
                    editmodel.questions = new List<QuestionDTO>(); // Boş bir dizi oluştur
                    return Ok(editmodel);
                }

                List<QuestionDTO> sorular = new List<QuestionDTO>();
                foreach (var question in questions)
                {
                    QuestionDTO soru = new QuestionDTO();

                    soru.questionText = question.questionText;
                    soru.questionType = question.questionType;
                    soru.open = false;
                    soru.required = true;

                    var questionChoices = await _context.QuestionChoices
                        .Where(q => q.QuestionId == question.questionId)
                        .ToListAsync();

                    List<string> sorusecenek = new List<string>();
                    foreach (var item in questionChoices)
                    {
                        sorusecenek.Add(item.choiceText);
                    }
                    soru.options = sorusecenek;
                    sorular.Add(soru);
                }
                editmodel.questions = sorular;
                return Ok(editmodel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving survey data: " + ex.Message);
            }
        }

        // Anket Çözülme Ekranı API
        [HttpGet("/getSurveyByCode/{surveyCode}")]
        public async Task<ActionResult<Surveys>> GetSurveyByCode(string surveyCode)
        {
            try
            {
                ByCodeDTO editmodel = new ByCodeDTO();
                SurveyDetailDTO surveyDetails = new SurveyDetailDTO();

                var survey = await _context.Surveys.FirstOrDefaultAsync(s => s.surveyCode == surveyCode);

                if (survey == null)
                {
                    return NotFound("Survey not found.");
                }

                surveyDetails.surveyDescription = survey.surveyDescription;
                surveyDetails.surveyName = survey.surveyText;
                surveyDetails.surveyId = survey.surveyId;
                editmodel.surveyDetails = surveyDetails;

                var questions = await _context.Questions
                    .Where(q => q.SurveyId == survey.surveyId)
                    .ToListAsync();

                if (questions == null || questions.Count == 0)
                {
                    editmodel.questionsByCode = new List<QuestionDTOCode>(); // Boş bir dizi oluştur
                    return Ok(editmodel);
                }

                List<QuestionDTOCode> sorular = new List<QuestionDTOCode>();
                foreach (var question in questions)
                {
                    QuestionDTOCode soru = new QuestionDTOCode();
                    soru.questionId = question.questionId;
                    soru.questionText = question.questionText;
                    soru.questionType = question.questionType;
                    soru.open = false;
                    soru.required = true;

                    var questionChoices = await _context.QuestionChoices
                        .Where(q => q.QuestionId == question.questionId)
                        .ToListAsync();

                    List<string> sorusecenek = new List<string>();
                    List<int> choiceIds = new List<int>();
                    foreach (var item in questionChoices)
                    {
                        sorusecenek.Add(item.choiceText);
                        choiceIds.Add(item.choiceId);
                    }
                    soru.options = sorusecenek;
                    soru.choiceIds = choiceIds;
                    sorular.Add(soru);
                }
                editmodel.questionsByCode = sorular;
                return Ok(editmodel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving survey data: " + ex.Message);
            }
        }

        // Anket Oluşturma API
        [HttpPost]
        [Route("postdata")]
        public async Task<ActionResult> PostData([FromBody] SurveyDataDTO surveyDataDTO)
        {
            try
            {
                if (surveyDataDTO == null)
                {
                    return BadRequest("No data provided.");
                }

                var surveyName = surveyDataDTO.surveyDetails.surveyName;
                var surveyDescription = surveyDataDTO.surveyDetails.surveyDescription;
                var questions = surveyDataDTO.questions;

                var surveyDetails = new Surveys
                {
                    surveyText = surveyName,
                    surveyDescription = surveyDescription,
                    surveyDate = DateTime.Now
                };
                _context.Surveys.Add(surveyDetails);
                await _context.SaveChangesAsync();

                foreach (var question in questions)
                {
                    var newQuestion = new Question
                    {
                        questionText = question.questionText,
                        questionType = question.questionType,
                        SurveyId = surveyDetails.surveyId 
                    };
                    _context.Questions.Add(newQuestion);
                    await _context.SaveChangesAsync();

                    if (question.options != null && question.options.Any())
                    {
                        foreach (var optionText in question.options)
                        {
                            var newOption = new QuestionChoices
                            {
                                choiceText = optionText,
                                QuestionId = newQuestion.questionId
                            };
                            _context.QuestionChoices.Add(newOption);
                        }
                        await _context.SaveChangesAsync();
                    }
                }

                return Ok("Survey data processed successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing survey data: " + ex.Message);
            }
        }

        // Anket Güncelleme API
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSurvey(int id, [FromBody] SurveyDataDTO updatedSurveyDataDTO)
        {
            try
            {
                if (updatedSurveyDataDTO == null)
                {
                    return BadRequest("No data provided for update.");
                }

                // Güncellenecek anketin var olup olmadığını kontrol edin
                var existingSurvey = await _context.Surveys.FindAsync(id);
                if (existingSurvey == null)
                {
                    return NotFound("Survey not found.");
                }

                // Mevcut anketin tüm sorularını ve seçeneklerini sil
                var existingQuestions = await _context.Questions.Where(q => q.SurveyId == id).ToListAsync();
                foreach (var existingQuestion in existingQuestions)
                {
                    var existingOptions = await _context.QuestionChoices.Where(o => o.QuestionId == existingQuestion.questionId).ToListAsync();
                    _context.QuestionChoices.RemoveRange(existingOptions);
                }
                _context.Questions.RemoveRange(existingQuestions);

                // Yeni verileri ekleyin
                foreach (var updatedQuestion in updatedSurveyDataDTO.questions)
                {
                    // Yeni bir soru oluşturun ve kaydedin
                    var newQuestion = new Question
                    {
                        questionText = updatedQuestion.questionText,
                        questionType = updatedQuestion.questionType,
                        SurveyId = id
                    };
                    _context.Questions.Add(newQuestion);
                    await _context.SaveChangesAsync();

                    // Soruya ait seçenekleri işleyin
                    if (updatedQuestion.options != null && updatedQuestion.options.Any())
                    {
                        foreach (var optionText in updatedQuestion.options)
                        {
                            var newOption = new QuestionChoices
                            {
                                choiceText = optionText,
                                QuestionId = newQuestion.questionId
                            };
                            _context.QuestionChoices.Add(newOption);
                        }
                        await _context.SaveChangesAsync();
                    }
                }

                // Anketin adı ve açıklamasını güncelle
                existingSurvey.surveyText = updatedSurveyDataDTO.surveyDetails.surveyName;
                existingSurvey.surveyDescription = updatedSurveyDataDTO.surveyDetails.surveyDescription;

                // Veritabanındaki değişiklikleri kaydet
                await _context.SaveChangesAsync();

                return Ok("Survey updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating survey: " + ex.Message);
            }
        }


        // Anketi Çözen Kullanıcının Gönderdiği Data'lar
        [HttpPost]
        [Route("postResults")]
        public async Task<ActionResult> PostResults([FromBody] Dictionary<string, object> postData)
        {
            try
            {
                if (postData == null || !postData.ContainsKey("ResSurveyId"))
                {
                    return BadRequest("Invalid data format.");
                }

                string resSurveyId = postData["ResSurveyId"].ToString();
                int surveyId;

                if (!int.TryParse(resSurveyId, out surveyId))
                {
                    return BadRequest("Invalid ResSurveyId format.");
                }

                // ResSurveyId'yi kaydet
                // Burada örneğin bir değişkene atayabiliriz: int resSurveyId = surveyId;

                if (postData.ContainsKey("data"))
                {
                    var jsonData = postData["data"].ToString();
                    var data = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonData);
                    if (data != null)
                    {
                        var resultsToAdd = new List<Results>(); // Eklemek için bekleyen Results nesnelerini tutmak için bir liste oluşturun

                        foreach (var key in data.Keys)
                        {
                            if (!int.TryParse(key, out int questionId))
                            {
                                continue; // Anahtar bir sayısal değilse atla
                            }

                            object value = data[key];

                            if (value is string stringValue)
                            {
                                var resultWithStringValue = new Results
                                {
                                    ResSurveyId = surveyId,
                                    QuestionId = questionId,
                                    TextResponse = stringValue
                                };
                                _context.Results.Add(resultWithStringValue);
                            }
                            else if (value is Newtonsoft.Json.Linq.JArray arrayValue)
                            {
                                // Veri bir dizi ise, her bir elemanı ChoiceId olarak kabul edelim
                                foreach (var item in arrayValue)
                                {
                                    if (int.TryParse(item.ToString(), out int choiceId))
                                    {
                                        // Yeni bir Results nesnesi oluştur ve ChoiceId özelliğini ayarla
                                        var resultWithArrayValue = new Results
                                        {
                                            ResSurveyId = surveyId,
                                            QuestionId = questionId,
                                            ChoiceId = choiceId,
                                            TextResponse = ""
                                        };
                                        _context.Results.Add(resultWithArrayValue); // Results nesnesini ekleyin
                                    }
                                }
                            }
                        }

                        // Tüm Results nesnelerini tek seferde Results tablosuna ekleyin
                        await _context.SaveChangesAsync();
                    }
                }

                return Ok("Data received and saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing data: " + ex.Message);
            }
        }

        [HttpGet]
        [Route("getResultsSurvey/{resSurveyId}")]
        public ActionResult<IEnumerable<object>> GetResultsBySurveyId(int resSurveyId)
        {
            var results = _context.Results
                .Where(r => r.ResSurveyId == resSurveyId)
                .Include(r => r.Questionsss)
                .Include(r => r.Choice)
                .GroupBy(r => r.Questionsss.questionText)
                .Select(g => new
                {
                    QuestionText = g.Key,
                    QuestionType = g.First().Questionsss.questionType,
                    Choices = g.GroupBy(r => r.Choice.choiceText)
                               .Select(grp => new
                               {
                                   ChoiceText = grp.Key,
                                   ResponseCounter = grp.Count()
                               }).ToList()

                })
                .ToList();


            if (results == null || !results.Any())
            {
                return NotFound(); // Sonuç bulunamadıysa 404 Not Found döndür
            }

            foreach (var result in results)
            {
                // Choices listesinde ChoiceId'si null olanların yerine TextResponse değerini ekleyelim
                var textResponses = _context.Results
                    .Where(r => r.ResSurveyId == resSurveyId && r.Questionsss.questionText == result.QuestionText && r.ChoiceId == null)
                    .Select(r => r.TextResponse)
                    .ToList();

                foreach (var textResponse in textResponses)
                {
                    result.Choices.Add(new
                    {
                        ChoiceText = textResponse,
                        ResponseCounter = 0
                    });
                }

            }

            return results;
        }


        [HttpDelete("delete-all")]
        public async Task<IActionResult> DeleteAllTables()
        {
            var questions = await _context.Questions.ToListAsync();
            if (questions != null && questions.Any())
            {
                _context.Questions.RemoveRange(questions);
            }

            var questionChoices = await _context.QuestionChoices.ToListAsync();
            if (questionChoices != null && questionChoices.Any())
            {
                _context.QuestionChoices.RemoveRange(questionChoices);
            }

            var surveys = await _context.Surveys.ToListAsync();
            if (surveys != null && surveys.Any())
            {
                _context.Surveys.RemoveRange(surveys);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("delete-results")]
        public async Task<IActionResult> DeleteResultsTable()
        {
            var results = await _context.Results.ToListAsync();
            if (results != null && results.Any())
            {
                _context.Results.RemoveRange(results);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
