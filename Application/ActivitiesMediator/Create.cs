using Domain;
using MediatR;
using Persistence;

namespace Application.ActivitiesMediator
{
    public class CreateActivity
    {
        public class CreateCommand : IRequest
        {
            public Activity? Activity { get; set; }
        }

        public class Handler : IRequestHandler<CreateCommand>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                await _dataContext.Activities.AddAsync(request.Activity!, cancellationToken);
                await _dataContext.SaveChangesAsync();
            }
        }
    }
}