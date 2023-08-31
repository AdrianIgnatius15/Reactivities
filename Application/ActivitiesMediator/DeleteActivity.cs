using Domain;
using AutoMapper;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.ActivitiesMediator
{
    public class DeleteActivity
    {
        public class DeleteCommand : IRequest
        {
            public Guid? Id { get; set; }
        }

        public class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task Handle(DeleteCommand request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FirstOrDefaultAsync(activity => activity.Id.Equals(request.Id), cancellationToken);
                _dataContext.Activities.Remove(activity!);
                await _dataContext.SaveChangesAsync();
            }
        }
    }
}