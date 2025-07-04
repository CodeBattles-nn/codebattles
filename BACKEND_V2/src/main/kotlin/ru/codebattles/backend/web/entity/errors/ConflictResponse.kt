package ru.codebattles.backend.web.entity.errors

import io.swagger.v3.oas.annotations.media.Schema

@Schema(
    description = "Response returned when the conflict in data."
)
class ConflictResponse(
    @Schema(
        description = "Detailed message about the error.",
        example = "Authentication is required to access this resource."
    )
    val message: String? = "Conflict",

    @Schema(
        description = "HTTP status code representing the error.",
        example = "401"
    )
    val code: Int? = 409
)