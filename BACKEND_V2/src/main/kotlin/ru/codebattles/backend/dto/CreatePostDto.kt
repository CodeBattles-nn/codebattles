package ru.codebattles.backend.dto

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class CreatePostDto(
    @field:NotBlank
    @Schema(description = "Title of the post", example = "Welcome to Code Battles")
    val title: String,

    @field:NotBlank
    @Schema(description = "Content of the post", example = "This is the main content of the post...")
    val content: String,

    @field:NotNull
    @Schema(description = "Show post at main page", example = "true")
    val showAtMain: Boolean,
)
