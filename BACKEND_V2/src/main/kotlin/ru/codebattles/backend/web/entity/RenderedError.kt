package ru.codebattles.backend.web.entity

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Details of an error response")
data class RenderedError(
    @Schema(description = "Detailed error message", example = "Invalid input data")
    val detail: String
)