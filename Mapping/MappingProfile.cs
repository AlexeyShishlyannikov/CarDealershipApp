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
			CreateMap<Contacts, ContactsResource>();
			CreateMap<Photo, PhotoResource>();

			// API Mapping : Resource to Domain
			CreateMap<VehicleResource, Vehicle>()
				.ForMember(v => v.Id, opt => opt.Ignore());
			CreateMap<ContactsResource, Contacts>();
			CreateMap<PhotoResource, Photo>();
		}

    }
}