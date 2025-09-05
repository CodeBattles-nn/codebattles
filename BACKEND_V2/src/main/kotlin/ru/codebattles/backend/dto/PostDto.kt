package ru.codebattles.backend.dto

import io.swagger.v3.oas.annotations.media.Schema

data class PostDto(
    @Schema(description = "Unique identifier of the post", example = "1")
    val id: Long? = null,


    @Schema(description = "Title of post")
    val title: String,

    @Schema(description = "Content of post")
    val content: String,

    @Schema(description = "Show post at main page")
    val showAtMain: Boolean,
)

