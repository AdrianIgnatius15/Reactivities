using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
        
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _userAccessor;

        public IsHostRequirementHandler(DataContext dataContext, IHttpContextAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(userId == null) return Task.CompletedTask;

            var activityId = Guid.Parse(_userAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString()!);

            var attendees = _dataContext
                .ActivityAttendees
                    .AsNoTracking()
                    .SingleOrDefaultAsync( x => x.AppUserId == userId && x.ActivityId == activityId).Result;

            if(attendees == null) return Task.CompletedTask;

            if(attendees.isHost) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}