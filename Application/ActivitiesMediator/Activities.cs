using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

public class Activities
{
    public class QueryActivities : IRequest<List<Activity>> {  }

    public class Handler : IRequestHandler<QueryActivities, List<Activity>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<List<Activity>> Handle(QueryActivities request, CancellationToken cancellationToken)
        {
            return await _dataContext.Activities.ToListAsync();
        }
    }
}