using System.Security.Claims;
using API.DTO.CreateDto;
using API.DTO.ReadDto;
using API.Service;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, IConfiguration configuration)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserReadDto>> Login(LoginDto login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email!);

            if(user == null)
            {
                return Unauthorized();
            }

            var result = await _userManager.CheckPasswordAsync(user, login.Password!);

            if(result == true)
            {
                return CreateUserModel(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserReadDto>> Register(RegisterDto register)
        {
            if (await _userManager.Users.AnyAsync(user => user.UserName == register.Username))
            {
                ModelState.AddModelError("email", "Email taken!");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(user => user.Email == register.Email))
            {
                ModelState.AddModelError("username", "Username taken!");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = register.DisplayName!,
                Email = register.Email,
                UserName = register.Username
            };

            var result = await _userManager.CreateAsync(user, register.Password!);

            if(result.Succeeded)
            {
                return CreateUserModel(user);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserReadDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email)!);
            
            return CreateUserModel(user!);
        }

        private UserReadDto CreateUserModel(AppUser user)
        {
            return new UserReadDto
            {
                DisplayName = user.DisplayName!,
                Token = _tokenService.CreateToken(user, _configuration),
                Username = user.UserName
            };
        }
    }
}