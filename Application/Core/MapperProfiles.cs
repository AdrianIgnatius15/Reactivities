using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}