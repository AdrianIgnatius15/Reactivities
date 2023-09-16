using Application.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Application.ActivitiesMediator.ActivityDetails;

namespace Application.ActivitiesMediator
{
    public class ActivityDetails
    {
        public class QueryActivityDetails : IRequest<Result<ActivityDto>>
        {
            public Guid Id { get; set; }
        }
    }

    public class Handler : IRequestHandler<QueryActivityDetails, Result<ActivityDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<ActivityDto>> Handle(QueryActivityDetails request, CancellationToken cancellationToken)
        {
            var activity = await _dataContext.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(activity => activity.Id.Equals(request.Id));
            
            return Result<ActivityDto>.Success(activity!);
        }
    }
}