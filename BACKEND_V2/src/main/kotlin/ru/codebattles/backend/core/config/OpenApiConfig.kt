package ru.codebattles.backend.core.config

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType
import io.swagger.v3.oas.annotations.info.Contact
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.security.SecurityScheme

@OpenAPIDefinition(
    info = Info(
        title = "Codebattles backend",
        description = """
            This is a backend for the Codebattles competition system.
            It is designed to handle various aspects of the competition, including user management, problem management, and competition management.
            The system allows users to register, login, and participate in competitions.
            
            Tips:
            - [ADMIN] - Requires admin role
        """,
        version = "0.1.0",
        contact = Contact(name = "Suslov Yaroslav", email = "genius@doctorixx.ru")
    )
)
@SecurityScheme(
    name = "JWT",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer"
)
class OpenApiConfig
