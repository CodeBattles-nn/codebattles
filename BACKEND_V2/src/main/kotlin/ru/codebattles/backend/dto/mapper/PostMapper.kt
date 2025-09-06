package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.dto.PostDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.Posts

@Mapper(componentModel = "spring")
interface PostMapper : AbstractMapper<Posts, PostDto>
