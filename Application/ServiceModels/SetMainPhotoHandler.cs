using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ServiceModels
{
    public class SetMainPhotoHandler
    {
        public class Command : IRequest<Result<Unit>>
    {
        public string Id { get; set; } = string.Empty;
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users
                .Include(user => user.Photos)
            .FirstOrDefaultAsync(user => user.UserName!.Equals(_userAccessor.GetUsername()));

            if(user == null) return null;

            var photo = user.Photos.FirstOrDefault(photo => photo.Id == request.Id);

            if(photo == null) return null;

            var currentMain = user.Photos.FirstOrDefault(photo => photo.IsMain);

            if(currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            var success = await _dataContext.SaveChangesAsync() > 0;

            if(success) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem setting the photo as the main photo");
        }
    }
    }
}