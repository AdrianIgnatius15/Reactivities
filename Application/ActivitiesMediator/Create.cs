using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.FirstOrDefaultAsync(user => user.UserName! == _userAccessor.GetUsername());
                Console.WriteLine($"Username found {user!.UserName}");
                var attendee = new ActivityAttendee()
                {
                    AppUser = user!,
                    Activity = request.Activity!,
                    isHost = true
                };
                request.Activity!.Attendees.Add(attendee);

                _dataContext.Activities.Add(request.Activity!);
                var result = await _dataContext.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}