package ru.codebattles.backend.dto

import io.swagger.v3.oas.annotations.media.Schema

data class CreateProblemDto(
    @Schema(description = "Name of the problem", example = "Sum of Two Numbers")
    val name: String,

    @Schema(description = "Description of the problem", example = "Calculate the sum of two integers.")
    val description: String,

    @Schema(description = "Input data for the problem", example = "1 2")
    val inData: String,

    @Schema(description = "Expected output data for the problem", example = "3")
    val outData: String,

    @Schema(description = "Test cases for the problem (JSON)", example = """{"in":"1", "out":"3"}""")
    val tests: String,

    @Schema(description = "Example cases for the problem (JSON)", example = """{"in":"1", "out":"3"}""")
    val examples: String
)