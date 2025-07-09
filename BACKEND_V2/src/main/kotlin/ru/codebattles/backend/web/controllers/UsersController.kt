package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.annotation.security.RolesAllowed
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.ChangePasswordDto
import ru.codebattles.backend.dto.CreateUserDto
import ru.codebattles.backend.dto.ExtendedUserDto
import ru.codebattles.backend.dto.UserDto
import ru.codebattles.backend.dto.mapper.ExtendedUserMapper
import ru.codebattles.backend.dto.mapper.UserMapper
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.UserRepository
import ru.codebattles.backend.services.CompetitionService
import ru.codebattles.backend.services.UserService
import ru.codebattles.backend.web.entity.LinkUserRequest
import ru.codebattles.backend.web.entity.OkResponse

@Tag(name = "Users", description = "Endpoints for managing users")
@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name = "JWT")
class UsersController(
    val userRepository: UserRepository,
    val userMapper: UserMapper,
    private val userService: UserService,
    private val competitionService: CompetitionService,
    private val extendedUserMapper: ExtendedUserMapper,
) {
    @Operation(
        summary = "Get current user",
        description = "Retrieves current user."
    )
    @GetMapping("me")
    fun getProfile(@AuthenticationPrincipal user: User): ExtendedUserDto {
        return extendedUserMapper.toDto(user)
    }


    @Operation(
        summary = "[ADMIN] Get all users",
        description = "Retrieves a list of all users. Required admin role"
    )
    @RolesAllowed("ADMIN")
    @GetMapping
    fun getAll(@AuthenticationPrincipal user: User): List<UserDto> {
        return userMapper.toDtoS(
            userRepository.findAll()
        )
    }

    @Operation(
        summary = "[ADMIN] Create user",
        description = "Create user with provided data. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @PostMapping
    fun create(@RequestBody(required = true) userDto: CreateUserDto): UserDto {

        return userMapper.toDto(
            userService.create(userDto)
        )
    }

    @Operation(
        summary = "[ADMIN] Link user to competition",
        description = "Links a user to a competition. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @PostMapping("link")
    fun linkUser(@RequestBody(required = true) linkReq: LinkUserRequest): OkResponse {

        competitionService.joinUser(
            linkReq.competitionId,
            linkReq.userId,
        )

        return OkResponse()
    }

    @Operation(
        summary = "Change password",
        description = "Changes the password for the current user. Requires current password verification."
    )
    @PostMapping("/change-password")
    fun changePassword(
        @AuthenticationPrincipal user: User,
        @RequestBody changePasswordDto: ChangePasswordDto
    ): ResponseEntity<OkResponse> {
        val success = userService.changePassword(
            user,
            changePasswordDto.currentPassword,
            changePasswordDto.newPassword
        )
        
        return if (success) {
            ResponseEntity.ok(OkResponse())
        } else {
            ResponseEntity.badRequest().body(OkResponse())
        }
    }
}
