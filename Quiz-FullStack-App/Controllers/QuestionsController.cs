using Microsoft.AspNetCore.Mvc;
using Quiz_FullStack_App.Models;
using Microsoft.AspNetCore.Authorization;
using Quiz_FullStack_App.Data;
using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizAppDbContext _context;

        public QuestionsController(QuizAppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Questions>>> GetQuestions()
        {
            return await _context.Questions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Questions>> GetQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null) return NotFound();
            return question;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Questions>> CreateQuestion(Questions question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetQuestion), new { id = question.Id }, question);
        }

        [HttpGet("course/{course}")]
        public async Task<ActionResult<IEnumerable<Questions>>> GetQuestionsByCourse(string course)
        {
            try
            {
                var questions = await _context.Questions
                    .Where(q => q.Course.ToLower() == course.ToLower())
                    .ToListAsync();

                if (questions == null || questions.Count == 0)
                {
                    return NotFound($"No questions found for course: {course}");
                }

                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest("Error fetching questions: " + ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, Questions question)
        {
            if (id != question.Id) return BadRequest();

            _context.Entry(question).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Questions.Any(q => q.Id == id))
                    return NotFound();
                throw;
            }
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null) return NotFound();

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}