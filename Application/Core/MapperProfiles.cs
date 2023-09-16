using Application.DTO;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, 
                options => 
                options.MapFrom(s => s.Attendees.FirstOrDefault(x => x.isHost)!.AppUser.UserName));
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}