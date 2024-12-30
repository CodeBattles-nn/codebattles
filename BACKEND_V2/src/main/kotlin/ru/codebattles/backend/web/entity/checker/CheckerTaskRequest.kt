package ru.codebattles.backend.web.entity.checker

data class Test(
    val `in`: String,
    val out: String,
)

data class CheckerTaskRequest(
    val source: String,
    val compiler: String,
    val tests: List<Test>,
    val meta: String
)