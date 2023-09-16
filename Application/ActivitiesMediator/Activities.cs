using Application.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

public class Activities
{
    public class QueryActivities : IRequest<Result<List<ActivityDto>>> {  }

    public class Handler : IRequestHandler<QueryActivities, Result<List<ActivityDto>>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        public async Task<Result<List<ActivityDto>>> Handle(QueryActivities request, CancellationToken cancellationToken)
        {
            var activities = await _dataContext.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<ActivityDto>>.Success(activities);
        }
    }
}