package ru.codebattles.backend.web.controllers

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.annotation.security.RolesAllowed
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import ru.codebattles.backend.dto.CreatePostDto
import ru.codebattles.backend.dto.PostDto
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.services.PostService

@Tag(name = "Posts", description = "Endpoints for managing posts")
@RestController
@RequestMapping("/api/posts")
@SecurityRequirement(name = "JWT")
class PostController(
    private val postService: PostService,
) {

    @Operation(
        summary = "Get all posts",
        description = "Retrieves a list of all posts."
    )
    @GetMapping
    fun getAll(): List<PostDto> {
        return postService.getAll()
    }

    @Operation(
        summary = "Get main page posts",
        description = "Retrieves posts that should be shown on the main page."
    )
    @GetMapping("/main")
    fun getMainPagePosts(): List<PostDto> {
        return postService.getMainPagePosts()
    }

    @Operation(
        summary = "Get post by ID",
        description = "Retrieves a post by its ID."
    )
    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): PostDto {
        return postService.getById(id)
    }

    @Operation(
        summary = "[ADMIN] Create a new post",
        description = "Creates a new post. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @PostMapping
    fun create(@RequestBody createPostDto: CreatePostDto, @AuthenticationPrincipal user: User): PostDto {
        return postService.create(createPostDto)
    }

    @Operation(
        summary = "[ADMIN] Update a post",
        description = "Updates an existing post by ID. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody postDto: PostDto, @AuthenticationPrincipal user: User): PostDto {
        return postService.update(id, postDto)
    }

    @Operation(
        summary = "[ADMIN] Delete a post",
        description = "Deletes a post by ID. Required admin role."
    )
    @RolesAllowed("ADMIN")
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long, @AuthenticationPrincipal user: User): ResponseEntity<Void> {
        postService.delete(id)
        return ResponseEntity.noContent().build()
    }
}
