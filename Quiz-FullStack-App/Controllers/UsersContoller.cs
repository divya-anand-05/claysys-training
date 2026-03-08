using BCrypt.Net;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz_FullStack_App.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Quiz_FullStack_App.Models;

namespace QuizAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly QuizAppDbContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(QuizAppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(ClaimTypes.Name, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {

            // Hash password before saving
            if (!string.IsNullOrEmpty(user.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                // Validation
                if (loginRequest == null ||
                    string.IsNullOrWhiteSpace(loginRequest.Email) ||
                    string.IsNullOrWhiteSpace(loginRequest.Password))
                {
                    return BadRequest("Email and password are required");
                }

                // Find user by email
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email.ToLower() == loginRequest.Email.ToLower());

                if (user == null)
                {
                    return Unauthorized(new
                    {
                        message = "User not found",
                        error = "USER_NOT_FOUND"
                    });
                }

                // KEY FIX: Use BCrypt.Verify() to compare passwords
                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password);

                if (!isPasswordValid)
                {
                    return Unauthorized(new
                    {
                        message = "Invalid password",
                        error = "INVALID_PASSWORD"
                    });
                }

                // Return user data (NOT password!)
                var token = GenerateJwtToken(user);

                return Ok(new
                {
                    token,
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Role,
                    message = "Login successful"
                });
            }
            catch (Exception ex)
            {
                return BadRequest("Login error: " + ex.Message);
            }
        }

        [HttpGet("admin-check")]
        public async Task<ActionResult> CheckAdmin()
        {
            var admin = await _context.Users.FirstOrDefaultAsync(u => u.Email == "admin@gmail.com");
            return Ok(new { exists = admin != null, passwordHash = admin?.Password });
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id) return BadRequest();

            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(u => u.Id == id))
                    return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}