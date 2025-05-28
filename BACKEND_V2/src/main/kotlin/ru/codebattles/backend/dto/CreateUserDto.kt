package ru.codebattles.backend.dto

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull

data class CreateUserDto(
    @field:NotNull @field:NotEmpty
    @Schema(description = "Username of the user", example = "john_doe")
    val musername: String? = null,

    @field:NotNull @field:NotEmpty
    @Schema(description = "Password of the user", example = "securepassword123")
    val mpassword: String? = null,

    @Schema(description = "Full name of the user", example = "John Doe")
    val name: String? = ""
)