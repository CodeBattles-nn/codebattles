package ru.codebattles.backend.core.commandrunner

import lombok.extern.java.Log
import org.springframework.boot.CommandLineRunner
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import ru.codebattles.backend.entity.Role
import ru.codebattles.backend.repository.RolesRepository

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
class DefaultRolesCommandRunner(
    val rolesRepository: RolesRepository
) : CommandLineRunner {

    val defaultRolesList: List<String> = listOf(
        "ROLE_USER", "ROLE_ADMIN",
    )

    override fun run(vararg args: String?) {
        for (role in defaultRolesList) {
            if (!rolesRepository.existsByName(role)) {
                rolesRepository.save(Role(name = role))
            }
        }
    }
}
