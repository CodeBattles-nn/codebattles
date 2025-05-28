package ru.codebattles.backend.core.commandrunner

import org.springframework.boot.CommandLineRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.entity.UserRole
import ru.codebattles.backend.entity.Variable
import ru.codebattles.backend.repository.UserRepository
import ru.codebattles.backend.repository.VariablesRepository

@Component
class DefaultAdminCommandRunner(
    val variablesRepository: VariablesRepository,
    val userRepository: UserRepository,
    val passwordEncoder: PasswordEncoder,
) : CommandLineRunner {

    val VARIABLE_KEY: String = "DEFAULT_USER_EXECUTOR_COMPLETE"


    override fun run(vararg args: String?) {
        val notFirstExecute = variablesRepository.existsByKey(VARIABLE_KEY)
        val userWithUsernameAdminExists = userRepository.existsByMusername("admin")

        if (notFirstExecute) {
            return
        }

        if (!userWithUsernameAdminExists) {
            val user = User(mpassword = passwordEncoder.encode("admin"), musername = "admin")
            user.roles = mutableSetOf(UserRole.ROLE_ADMIN, UserRole.USER)

            userRepository.save(user)
        }

        variablesRepository.save(Variable(key = VARIABLE_KEY, value = "true"))
    }
}
