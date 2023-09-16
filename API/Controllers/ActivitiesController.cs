using Application.ActivitiesMediator;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllActivities() {
            return HandleResult(await Mediator.Send(new Activities.QueryActivities()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivityById(Guid id) {
            // return Ok(await Mediator.Send(new ActivityDetails.QueryActivityDetails{Id = id}));

            var result = await Mediator.Send(new ActivityDetails.QueryActivityDetails{Id = id});
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            
            return HandleResult(await Mediator.Send(new CreateActivity.CreateCommand { Activity = activity }));
        }

        [Authorize(Policy = "isActivityHost")]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new EditActivity.EditCommand { Activity = activity }));
        }

        [Authorize(Policy = "isActivityHost")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            
            return HandleResult(await Mediator.Send(new DeleteActivity.DeleteCommand {Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}