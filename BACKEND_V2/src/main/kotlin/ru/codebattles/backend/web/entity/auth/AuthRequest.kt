package ru.codebattles.backend.web.entity.auth
import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Request for user authentication")
data class AuthRequest(
    @Schema(description = "Username of the user", example = "john_doe")
    val username: String,

    @Schema(description = "Password of the user", example = "password123")
    val password: String
)