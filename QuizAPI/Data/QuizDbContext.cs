
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Data
{
    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions <QuizDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<Result> Results { get; set; }
    }
}
