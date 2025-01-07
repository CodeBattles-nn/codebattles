package ru.codebattles.backend.web.controllers

import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.UserRepository
import java.util.*

@RestController
@RequestMapping("/api/users")
class UsersController(
    val userRepository: UserRepository,
) {
    @GetMapping("me")
    fun getProfile(@AuthenticationPrincipal user: User): Optional<User> {
        return userRepository.findById(user.id!!)
    }
}
