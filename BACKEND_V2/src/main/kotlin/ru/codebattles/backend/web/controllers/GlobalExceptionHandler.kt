package ru.codebattles.backend.web.controllers

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import ru.codebattles.backend.web.entity.RenderedError

//@ControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(NoSuchElementException::class)
    fun handleNoSuchElementException(ex: NoSuchElementException?): ResponseEntity<RenderedError> {
        return ResponseEntity(RenderedError(detail = "Not found"), HttpStatus.NOT_FOUND)
    }
}