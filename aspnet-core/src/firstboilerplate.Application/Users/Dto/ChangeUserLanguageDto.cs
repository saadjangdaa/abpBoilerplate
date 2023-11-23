using System.ComponentModel.DataAnnotations;

namespace firstboilerplate.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}