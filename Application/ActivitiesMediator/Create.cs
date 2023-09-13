using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ActivitiesMediator
{
    public class CreateActivity
    {
        public class CreateCommand : IRequest<Result<Unit>>
        {
            public Activity? Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<CreateCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator()!);
            }
        }

        public class Handler : IRequestHandler<CreateCommand, Result<Unit>>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                await _dataContext.Activities.AddAsync(request.Activity!, cancellationToken);
                var result = await _dataContext.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}