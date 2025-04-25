package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CreateUserDto
import ru.codebattles.backend.dto.UserDto
import ru.codebattles.backend.dto.mapper.UserMapper
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.UserRepository
import ru.codebattles.backend.services.CompetitionService
import ru.codebattles.backend.services.UserService
import ru.codebattles.backend.web.entity.LinkUserRequest
import ru.codebattles.backend.web.entity.OkResponse
import java.util.*

@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name = "JWT")
class UsersController(
    val userRepository: UserRepository,
    val userMapper: UserMapper,
    private val userService: UserService,
    private val competitionService: CompetitionService,
) {
    @GetMapping("me")
    fun getProfile(@AuthenticationPrincipal user: User): Optional<User> {
        return userRepository.findById(user.id!!)
    }


    @GetMapping
    fun getAll(@AuthenticationPrincipal user: User): List<UserDto> {
        return userMapper.toDtoS(
            userRepository.findAll()
        )
    }

    @PostMapping
    fun create(@RequestBody(required = true) userDto: CreateUserDto): UserDto {

        return userMapper.toDto(
            userService.create(userDto)
        )
    }

    @PostMapping("link")
    fun linkUser(@RequestBody(required = true) linkReq: LinkUserRequest): OkResponse {

        competitionService.joinUser(
            linkReq.competitionId,
            linkReq.userId,
        )

        return OkResponse()
    }

}
