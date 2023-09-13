using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

public class Activities
{
    public class QueryActivities : IRequest<Result<List<Activity>>> {  }

    public class Handler : IRequestHandler<QueryActivities, Result<List<Activity>>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<Result<List<Activity>>> Handle(QueryActivities request, CancellationToken cancellationToken)
        {
            return Result<List<Activity>>.Success(await _dataContext.Activities.ToListAsync());
        }
    }
}