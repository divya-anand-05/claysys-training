using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
//using Microsoft.OpenApi.Models;
using QuizAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Quiz API",
        Version = "v1.0",
        Description = "Quiz Application API with Questions, Users, and Results management"
    });
});

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", builder =>
    {
        builder.WithOrigins("http://localhost:4200","http://localhost:51966")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});

// Add DbContext
builder.Services.AddDbContext<QuizDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<QuizDbContext>();

    // Create admin if doesn't exist
    if (!context.Users.Any(u => u.Email == "admin@gmail.com"))
    {
        var admin = new User
        {
            Name = "Admin",
            Email = "admin@gmail.com",
            Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
            Role = "Admin"  
        };
        context.Users.Add(admin);
        context.SaveChanges();
    }
}


app.UseCors("AllowAngular");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();