using Microsoft.AspNetCore.Mvc;
using Application.ServiceModels;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] AddPhotoHandler.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new DeletePhotoHandler.Command{Id = id}));
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMainPhotoHandler.Command{Id = id}));
        }
    }
}