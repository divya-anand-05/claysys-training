using System.ComponentModel.DataAnnotations;

public class Questions
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Course is required")]
    [StringLength(100)]
    public string Course { get; set; }

    [Required(ErrorMessage = "Question text is required")]
    [StringLength(500)]
    public string QuestionText { get; set; }

    [Required]
    [StringLength(200)]
    public string OptionA { get; set; }

    [Required]
    [StringLength(200)]
    public string OptionB { get; set; }

    [Required]
    [StringLength(200)]
    public string OptionC { get; set; }

    [Required]
    [StringLength(200)]
    public string OptionD { get; set; }

    [Required(ErrorMessage = "Correct answer must be A, B, C, or D")]
    [RegularExpression("^[A-D]$")]
    public string CorrectAnswer { get; set; }
}