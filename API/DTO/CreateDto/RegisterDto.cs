using System.ComponentModel.DataAnnotations;

namespace API.DTO.CreateDto
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Display name is required")]
        public string? DisplayName { get; set; }

        public string? Username { get; set; }
    }
}