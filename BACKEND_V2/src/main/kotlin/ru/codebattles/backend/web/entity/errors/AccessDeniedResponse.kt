package ru.codebattles.backend.web.entity.errors

import io.swagger.v3.oas.annotations.media.Schema

@Schema(
    description = "Response returned when the user does not have permission to access the requested resource."
)
class AccessDeniedResponse(
    @Schema(
        description = "Detailed message about the error.",
        example = "You do not have permission to access this resource."
    )
    val message: String? = "Forbidden",

    @Schema(
        description = "HTTP status code representing the error.",
        example = "403"
    )
    val code: Int? = 403
)