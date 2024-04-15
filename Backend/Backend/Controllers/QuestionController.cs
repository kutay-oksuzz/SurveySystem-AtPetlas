using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.Extensions.Logging;


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

                // Mevcut survey'in adını ve açıklamasını güncelleyin
                existingSurvey.surveyText = updatedSurveyDataDTO.surveyDetails.surveyName;
                existingSurvey.surveyDescription = updatedSurveyDataDTO.surveyDetails.surveyDescription;

                // Veritabanındaki değişiklikleri kaydedin
                await _context.SaveChangesAsync();

                // Her bir gelen soruyu işleyin
                foreach (var updatedQuestion in updatedSurveyDataDTO.questions)
                {
                    // Sorunun var olan olup olmadığını kontrol edin
                    var existingQuestion = await _context.Questions.FirstOrDefaultAsync(q => q.SurveyId == id && q.questionText == updatedQuestion.questionText);
                    if (existingQuestion == null)
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
                    else
                    {
                        // Eğer soru zaten varsa, var olan seçenekleri silin ve güncellemeleri yapın
                        var existingOptions = await _context.QuestionChoices.Where(o => o.QuestionId == existingQuestion.questionId).ToListAsync();
                        _context.QuestionChoices.RemoveRange(existingOptions);

                        // Soru türü ve gerekli alanı güncelleyin
                        existingQuestion.questionType = updatedQuestion.questionType;

                        // Yeniden kaydedin
                        await _context.SaveChangesAsync();

                        // Yeni seçenekleri ekleyin
                        if (updatedQuestion.options != null && updatedQuestion.options.Any())
                        {
                            foreach (var optionText in updatedQuestion.options)
                            {
                                var newOption = new QuestionChoices
                                {
                                    choiceText = optionText,
                                    QuestionId = existingQuestion.questionId
                                };
                                _context.QuestionChoices.Add(newOption);
                            }
                            await _context.SaveChangesAsync();
                        }
                    }
                }

                return Ok("Survey updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating survey: " + ex.Message);
            }
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
    }
}
