package ru.codebattles.backend.services


import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import ru.codebattles.backend.dto.CreateUserDto
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.entity.UserRole
import ru.codebattles.backend.repository.UserRepository

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
) {
    fun getByUsername(username: String): User {
        return userRepository.findByMusername(username)
    }
    fun create(userDto: CreateUserDto): User {

        val user = User(
            mpassword = passwordEncoder.encode(userDto.mpassword),
            musername = userDto.musername,
            name = userDto.name
        )
        user.roles = mutableSetOf(UserRole.USER)

        userRepository.save(user)

        return user
    }

    fun changePassword(user: User, currentPassword: String, newPassword: String): Boolean {
        if (!passwordEncoder.matches(currentPassword, user.mpassword)) {
            return false
        }
        
        user.mpassword = passwordEncoder.encode(newPassword)
        userRepository.save(user)
        return true
    }
}
