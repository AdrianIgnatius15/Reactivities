using Application.ActivitiesMediator;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
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

        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new EditActivity.EditCommand { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            
            return HandleResult(await Mediator.Send(new DeleteActivity.DeleteCommand {Id = id}));
        }
    }
}