package ru.codebattles.backend.web.entity.checker

enum class ProcessEndStatus(private val msg: String) {
    SUCCESS("OK"),
    RUNTIME_ERROR("RE"),
    COMPILE_ERROR("CE"),
    TIME_LIMIT("TL"),
    WRONG_ANSWER("WA"),
    NOT_EXECUTED("NE"),
    ;

    override fun toString(): String {
        return msg
    }
}
