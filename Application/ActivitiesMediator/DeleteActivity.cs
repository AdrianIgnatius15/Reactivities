using Domain;
using AutoMapper;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.ActivitiesMediator
{
    public class DeleteActivity
    {
        public class DeleteCommand : IRequest<Result<Unit>>
        {
            public Guid? Id { get; set; }
        }

        public class Handler : IRequestHandler<DeleteCommand, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(DeleteCommand request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FirstOrDefaultAsync(activity => activity.Id.Equals(request.Id), cancellationToken);
                
                // if(activity == null) 
                // {
                //     return null;
                // }
                _dataContext.Activities.Remove(activity!);

                var result = await _dataContext.SaveChangesAsync() > 0;

                if(!result)
                {
                    return Result<Unit>.Failure("Failed to delete activity!");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}