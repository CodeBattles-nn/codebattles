package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.dto.UserDto
import ru.codebattles.backend.dto.mapper.UserMapper
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.UserRepository
import java.util.*

@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name = "JWT")
class UsersController(
    val userRepository: UserRepository,
    val userMapper: UserMapper,
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
}
