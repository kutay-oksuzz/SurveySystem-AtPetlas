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
        public DbSet <Results> Results { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Results>()
        .HasOne(r => r.Questionsss)
        .WithMany()
        .HasForeignKey(r => r.QuestionId)
        .OnDelete(DeleteBehavior.Restrict); // Silme davranışını sınırla

            modelBuilder.Entity<Results>()
                .HasOne(r => r.Survey)
                .WithMany()
                .HasForeignKey(r => r.ResSurveyId)
                .OnDelete(DeleteBehavior.Cascade); // Silme davranışını kaskad o
        }

    }
}
