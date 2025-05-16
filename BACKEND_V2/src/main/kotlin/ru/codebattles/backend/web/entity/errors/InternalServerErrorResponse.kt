package ru.codebattles.backend.web.entity.errors

import io.swagger.v3.oas.annotations.media.Schema


@Schema(
    description = "Response returned when an unexpected error occurs on the server."
)
class InternalServerErrorResponse(
    @Schema(
        description = "Detailed message about the error.",
        example = "An unexpected error occurred. Please try again later."
    )
    val message: String? = "Internal Server Error",

    @Schema(
        description = "HTTP status code representing the error.",
        example = "500"
    )
    val code: Int? = 500
)