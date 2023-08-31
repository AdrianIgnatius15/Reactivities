using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ActivitiesMediator
{
    public class EditActivity
    {
        public class EditCommand : IRequest
        {
            public Activity? Activity { get; set; }
        }

        public class Handler : IRequestHandler<EditCommand>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task Handle(EditCommand request, CancellationToken cancellationToken)
            {
                if(request.Activity!.Id != Guid.Empty)
                {
                    var activity = await _dataContext.Activities.FirstOrDefaultAsync(activity => activity.Id == request.Activity.Id, cancellationToken);
                    _mapper.Map(request.Activity, activity);

                    activity!.Title = request.Activity.Title;
                    await _dataContext.SaveChangesAsync();
                }
            }
        }
    }
}