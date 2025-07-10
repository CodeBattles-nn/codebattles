package ru.codebattles.backend.dto


import io.swagger.v3.oas.annotations.media.Schema
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority

data class ExtendedUserDto(
    @Schema(description = "Unique identifier of the user", example = "1")
    val id: Long,

    @Schema(description = "Username of the user", example = "john_doe")
    val username: String,

    @Schema(description = "User display name", example = "John Doe")
    val name: String,

    val roles: List<String>,


){
    fun getIsAdmin(): Boolean {
        return roles.contains("ROLE_ADMIN") || roles.contains("ADMIN")
    }
}