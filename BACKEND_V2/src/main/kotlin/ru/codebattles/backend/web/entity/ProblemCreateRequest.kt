package ru.codebattles.backend.web.entity

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Request to create a problem")
data class ProblemCreateRequest(
    @Schema(description = "Name of the problem", example = "Sum of Two Numbers")
    val name: String,

    @Schema(description = "Description of the problem", example = "Calculate the sum of two integers.")
    val description: String,

    @Schema(description = "Input data for the problem", example = "2 3")
    val inData: String,

    @Schema(description = "Expected output data for the problem", example = "5")
    val outData: String,

    @Schema(description = "Test cases for the problem", example = "[{\"in\": \"2 3\", \"out\": \"5\"}]")
    val tests: String,

    @Schema(description = "Example cases for the problem", example = "[{\"in\": \"1 1\", \"out\": \"2\"}]")
    val examples: String,

    @Schema(description = "Whether the problem is public", example = "true")
    val public: Boolean? = false
)