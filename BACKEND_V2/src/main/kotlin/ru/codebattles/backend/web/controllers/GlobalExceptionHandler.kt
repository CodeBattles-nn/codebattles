package ru.codebattles.backend.web.controllers

import org.springframework.http.HttpStatus
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.core.AuthenticationException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import ru.codebattles.backend.exceptions.ConflictException
import ru.codebattles.backend.web.entity.errors.AccessDeniedResponse
import ru.codebattles.backend.web.entity.errors.ConflictResponse
import ru.codebattles.backend.web.entity.errors.InternalServerErrorResponse
import ru.codebattles.backend.web.entity.errors.UnauthorizedResponse


@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(Throwable::class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    fun handleThrowable(e: Throwable): InternalServerErrorResponse {
        return InternalServerErrorResponse(message = e.message)
    }

    @ExceptionHandler(AccessDeniedException::class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    fun handleAccessDeniedException(e: AccessDeniedException): AccessDeniedResponse {
        return AccessDeniedResponse(message = e.message)
    }

    @ExceptionHandler(ConflictException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handleConflictException(e: ConflictException): ConflictResponse {
        return ConflictResponse(message = e.message)
    }

    @ExceptionHandler(AuthenticationException::class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    fun handleAuthenticationException(e: AuthenticationException): UnauthorizedResponse {
        return UnauthorizedResponse(message = e.message)
    }


}