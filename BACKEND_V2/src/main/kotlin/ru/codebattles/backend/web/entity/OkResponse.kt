package ru.codebattles.backend.web.entity

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Response indicating success")
data class OkResponse(
    @Schema(description = "Status of the response", example = "OK")
    val status: String = "OK",
)