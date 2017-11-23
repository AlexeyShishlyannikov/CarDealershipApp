using AutoCity.Controllers.Resources;
using AutoCity.Core.Models;
using AutoMapper;

namespace AutoCity.Mapping
{
    public class MappingProfile : Profile
    {
		public MappingProfile()
		{
			// API Mapping : Domain to Resource
			CreateMap<Vehicle, VehicleResource>()
				.ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make));

			// API Mapping : Resource to Domain
			CreateMap<VehicleResource, Vehicle>();

		}

    }
}