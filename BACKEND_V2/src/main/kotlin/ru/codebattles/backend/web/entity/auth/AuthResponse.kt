package ru.codebattles.backend.web.entity.auth

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Response containing authentication token")
data class AuthResponse(
    @Schema(description = "JWT token for authentication", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    val token: String
)