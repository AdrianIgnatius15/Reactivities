using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Application.ActivitiesMediator.ActivityDetails;

namespace Application.ActivitiesMediator
{
    public class ActivityDetails
    {
        public class QueryActivityDetails : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }
    }

    public class Handler : IRequestHandler<QueryActivityDetails, Result<Activity>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Activity>> Handle(QueryActivityDetails request, CancellationToken cancellationToken)
        {
            var activity = await _dataContext.Activities.FirstOrDefaultAsync(activity => activity.Id.Equals(request.Id));
            
            return Result<Activity>.Success(activity!);
        }
    }
}