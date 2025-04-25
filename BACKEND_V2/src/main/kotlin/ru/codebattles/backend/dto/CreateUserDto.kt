package ru.codebattles.backend.dto

import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull

/**
 * DTO for {@link ru.codebattles.backend.entity.User}
 */
data class CreateUserDto(
    @field:NotNull @field:NotEmpty
    val musername: String? = null,
    @field:NotNull @field:NotEmpty
    val mpassword: String? = null,
    val name: String? = ""
)