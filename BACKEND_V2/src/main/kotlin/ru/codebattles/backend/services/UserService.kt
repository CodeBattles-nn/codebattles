package ru.codebattles.backend.services


import org.springframework.stereotype.Service
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.UserRepository

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun getByUsername(username: String): User {
        return userRepository.findByMusername(username)
    }
}
