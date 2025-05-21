package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.UserProfileDto
import ru.codebattles.backend.dto.UserProfileEditDto
import ru.codebattles.backend.dto.mapper.UserMapper
import ru.codebattles.backend.dto.mapper.UserProfileMapper
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.UserRepository

@Tag(name = "Profile", description = "Endpoints for current profile")
@RestController
@RequestMapping("/api/profile")
@SecurityRequirement(name = "JWT")
class ProfileController(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper,
    private val userProfileMapper: UserProfileMapper,
) {

    @PutMapping
    fun updateProfile(@RequestBody profileData: UserProfileEditDto, @AuthenticationPrincipal user: User): UserProfileDto {
        userMapper.updateUserProfile(profileData, user)
        userRepository.save(user)

        return userProfileMapper.toDto(user)
    }

    @GetMapping
    fun getMe(@AuthenticationPrincipal user: User): UserProfileDto {
        return userProfileMapper.toDto(user)
    }

}
