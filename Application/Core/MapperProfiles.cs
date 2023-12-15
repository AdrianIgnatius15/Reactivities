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
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain)!.Url));
            CreateMap<AppUser, Profiles.Profile>().ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));
        }
    }
}