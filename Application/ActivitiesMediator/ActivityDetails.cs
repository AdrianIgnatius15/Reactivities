using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Application.ActivitiesMediator.ActivityDetails;

namespace Application.ActivitiesMediator
{
    public class ActivityDetails
    {
        public class QueryActivityDetails : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }
    }

    public class Handler : IRequestHandler<QueryActivityDetails, Activity>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Activity> Handle(QueryActivityDetails request, CancellationToken cancellationToken)
        {
            return await _dataContext.Activities.FirstOrDefaultAsync(activity => activity.Id.Equals(request.Id));
        }
    }
}