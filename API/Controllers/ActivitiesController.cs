using Application.ActivitiesMediator;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAllActivities() {
            return Ok(await Mediator.Send(new Activities.QueryActivities()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityById(Guid id) {
            return Ok(await Mediator.Send(new ActivityDetails.QueryActivityDetails{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new CreateActivity.CreateCommand { Activity = activity });
            return Ok("Created successfully");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            await Mediator.Send(new EditActivity.EditCommand { Activity = activity });
            return Ok("Edited successfully");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            await Mediator.Send(new DeleteActivity.DeleteCommand {Id = id});
            return Ok("Delete successfully");
        }
    }
}