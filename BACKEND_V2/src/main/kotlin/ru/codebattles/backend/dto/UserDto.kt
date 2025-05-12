package ru.codebattles.backend.dto


import io.swagger.v3.oas.annotations.media.Schema

data class UserDto(
    @Schema(description = "Unique identifier of the user", example = "1")
    val id: Long,

    @Schema(description = "Username of the user", example = "john_doe")
    val username: String,
)