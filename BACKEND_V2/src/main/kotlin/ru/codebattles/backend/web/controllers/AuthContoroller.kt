package ru.codebattles.backend.web.controllers

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.codebattles.backend.services.JwtService
import ru.codebattles.backend.web.entity.auth.AuthRequest
import ru.codebattles.backend.web.entity.auth.AuthResponse

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JwtService
) {

    @PostMapping("/login")
    fun login(@RequestBody authRequest: AuthRequest): AuthResponse {
        val authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(authRequest.username, authRequest.password)
        )
        val token = jwtService.generateToken(authentication.name)
        return AuthResponse(token)
    }
}


