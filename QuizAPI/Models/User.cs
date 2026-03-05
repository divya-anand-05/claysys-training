using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

[Index(nameof(Email), IsUnique = true)]
public class User
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required")]
    [StringLength(100)]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [StringLength(255)]
    public string Password { get; set; }

    [StringLength(50)]
    public string Role { get; set; } 
}