
using Microsoft.EntityFrameworkCore;
using Quiz_FullStack_App.Models;


namespace Quiz_FullStack_App.Data
{
    public class QuizAppDbContext : DbContext
    {
        public QuizAppDbContext(DbContextOptions<QuizAppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<Result> Results { get; set; }
    }
}
