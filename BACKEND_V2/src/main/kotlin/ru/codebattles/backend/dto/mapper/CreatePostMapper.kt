package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.dto.CreatePostDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.Posts

@Mapper(componentModel = "spring")
interface CreatePostMapper : AbstractMapper<Posts, CreatePostDto>
