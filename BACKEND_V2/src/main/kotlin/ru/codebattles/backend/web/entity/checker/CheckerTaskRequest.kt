package ru.codebattles.backend.web.entity.checker

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Test case for the checker")
data class Test(
    @Schema(description = "Input for the test case", example = "2 3")
    val `in`: String,

    @Schema(description = "Expected output for the test case", example = "5")
    val out: String,
)

@Schema(description = "Request to create a checker task")
data class CheckerTaskRequest(
    @Schema(description = "Source code to be checked", example = "print(input())")
    val source: String,

    @Schema(description = "Compiler to be used", example = "python3")
    val compiler: String,

    @Schema(description = "List of test cases")
    val tests: List<Test>,

    @Schema(description = "Metadata for the task", example = "task-123")
    val meta: String
)