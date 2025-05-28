package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.dto.UserProfileDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.User


@Mapper(componentModel = "spring")
interface UserProfileMapper : AbstractMapper<User, UserProfileDto>