using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Backend.Models
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions option) : base(option)
        {
        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Surveys> Surveys { get; set;}
        public DbSet <QuestionChoices> QuestionChoices { get; set; }

    }
}
