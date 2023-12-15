using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } = string.Empty;

        public string Bio { get; set; } = string.Empty;

        public ICollection<ActivityAttendee> Activities { get; set; } = null!;

        public ICollection<Photo> Photos { get; set; } = new Collection<Photo>();
    }
}