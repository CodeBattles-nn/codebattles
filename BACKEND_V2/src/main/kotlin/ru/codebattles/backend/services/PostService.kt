package ru.codebattles.backend.services

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.dto.CreatePostDto
import ru.codebattles.backend.dto.PostDto
import ru.codebattles.backend.dto.mapper.PostMapper
import ru.codebattles.backend.entity.Posts
import ru.codebattles.backend.repository.PostRepository

@Service
class PostService(
    private val postRepository: PostRepository,
    private val postMapper: PostMapper,
) {

    fun getAll(): List<PostDto> {
        return postMapper.toDtoS(
            postRepository.findAll()
        )
    }

    fun getById(id: Long): PostDto {
        val optionalPost = postRepository.findById(id)
        if (optionalPost.isPresent) {
            return postMapper.toDto(optionalPost.get())
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found")
    }

    fun getMainPagePosts(): List<PostDto> {
        return postMapper.toDtoS(
            postRepository.findByShowAtMainTrue()
        )
    }

    fun create(createPostDto: CreatePostDto): PostDto {
        val post = Posts(
            title = createPostDto.title,
            content = createPostDto.content,
            showAtMain = createPostDto.showAtMain
        )

        val savedPost = postRepository.save(post)
        return postMapper.toDto(savedPost)
    }

    fun update(id: Long, postDto: PostDto): PostDto {
        val existingPost = postRepository.findById(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found") }

        existingPost.title = postDto.title
        existingPost.content = postDto.content
        existingPost.showAtMain = postDto.showAtMain

        val updatedPost = postRepository.save(existingPost)
        return postMapper.toDto(updatedPost)
    }

    fun delete(id: Long) {
        if (!postRepository.existsById(id)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found")
        }
        postRepository.deleteById(id)
    }
}
