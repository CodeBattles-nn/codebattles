package ru.codebattles.backend.exceptions

class ConflictException(
    override val message: String?
) : RuntimeException()
