using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ActivitiesMediator
{
    public class EditActivity
    {
        public class EditCommand : IRequest<Result<Unit>>
        {
            public Activity? Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<EditCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator()!);
            }
        }

        public class Handler : IRequestHandler<EditCommand, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(EditCommand request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FirstOrDefaultAsync(activity => activity.Id.Equals(request.Activity!.Id));

                if(activity == null)
                {
                    return null;
                } 

                _mapper.Map(request.Activity, activity);
                var result = await _dataContext.SaveChangesAsync() > 0;

                if(!result)
                {
                return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}