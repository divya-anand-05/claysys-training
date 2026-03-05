using Microsoft.AspNetCore.Mvc;
using QuizAPI.Models;
using QuizAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResultsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public ResultsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/results - Get all results
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Result>>> GetResults()
        {
            return await _context.Results.ToListAsync();
        }

        // GET: api/results/{id} - Get single result by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Result>> GetResult(int id)
        {
            var result = await _context.Results.FindAsync(id);
            if (result == null) return NotFound();
            return result;
        }

        // GET: api/results/user/{userId} - Get all results for a specific user
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Result>>> GetResultsByUserId(int userId)
        {
            var results = await _context.Results
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.DateTaken)  // Most recent first
                .ToListAsync();

            
            // This allows the course page to load even if user has no results yet
            return Ok(results);
        }

        // POST: api/results - Create new result
        [HttpPost]
        public async Task<ActionResult<Result>> CreateResult(Result result)
        {
            _context.Results.Add(result);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetResult), new { id = result.Id }, result);
        }

        // PUT: api/results/{id} - Update existing result
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResult(int id, Result result)
        {
            if (id != result.Id) return BadRequest();
            _context.Entry(result).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Results.Any(r => r.Id == id))
                    return NotFound();
                throw;
            }
            return NoContent();
        }

        // DELETE: api/results/{id} - Delete result
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResult(int id)
        {
            var result = await _context.Results.FindAsync(id);
            if (result == null) return NotFound();
            _context.Results.Remove(result);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}