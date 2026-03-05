namespace QuizAPI.Models
{
    public class Result
    {
        public int Id { get; set; }
        public int UserId {  get; set; }
        public string Course { get; set; }
        public int Score { get; set; }
        public int TotalMarks { get; set; }
        public DateTime DateTaken { get; set; }
    }
}
