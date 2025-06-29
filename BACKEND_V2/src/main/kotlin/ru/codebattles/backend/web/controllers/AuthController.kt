package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.dto.CreateUserDto
import ru.codebattles.backend.exceptions.ConflictException
import ru.codebattles.backend.repository.UserRepository
import ru.codebattles.backend.services.JwtService
import ru.codebattles.backend.services.UserService
import ru.codebattles.backend.web.entity.auth.AuthRequest
import ru.codebattles.backend.web.entity.auth.AuthResponse
import ru.codebattles.backend.web.entity.auth.RegisterRequest


@Tag(name = "Auth", description = "Endpoints for authentication")
@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JwtService,
    private val userService: UserService,
    private val userRepository: UserRepository
) {

    @Operation(
        summary = "Login",
        description = "Enter credentials to get JWT token."
    )
    @PostMapping("/login")
    fun login(@RequestBody authRequest: AuthRequest): AuthResponse {
        val authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(authRequest.username, authRequest.password)
        )
        val token = jwtService.generateToken(authentication.name)
        return AuthResponse(token)
    }

    @Operation(
        summary = "Register",
        description = "Enter credentials to get JWT token."
    )
    @PostMapping("/register")
    fun register(@RequestBody registerRequest: RegisterRequest): AuthResponse {
        if (userRepository.existsByMusername(registerRequest.username)){
            throw ConflictException("Username already exists")
        }

        userService.create(
            CreateUserDto(
                musername = registerRequest.username,
                mpassword = registerRequest.password,
                name = registerRequest.name,
            )
        )

        val authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(registerRequest.username, registerRequest.password)
        )
        val token = jwtService.generateToken(authentication.name)
        return AuthResponse(token)
    }
}


