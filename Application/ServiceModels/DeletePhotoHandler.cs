using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ServiceModels
{
    public class DeletePhotoHandler
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(user => user.Photos)
                .FirstOrDefaultAsync(user => user.UserName!.Equals(_userAccessor.GetUsername()))!;

                if(user == null) return null;

                var photo = user.Photos.FirstOrDefault(user => user.Id == request.Id);

                if(photo == null) return null;

                if(photo.IsMain) return Result<Unit>.Failure("You cannot delete your main photo");

                var result = await _photoAccessor.DeletePhoto(photo.Id);

                if(result == null) return Result<Unit>.Failure("Problem deleting photo from Cloudinary");

                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting photo from Cloudinary");
            }
        }
    }
}