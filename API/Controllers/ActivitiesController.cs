using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public ActivitiesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetAllActivities() {
            var activities = await _dataContext.Activities.ToListAsync();
            return Ok(activities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityById(Guid id) {
            var activity = await _dataContext.Activities.FirstOrDefaultAsync(activity => activity.Id == id);
            return Ok(activity);
        }
    }
}