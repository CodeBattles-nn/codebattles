package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.dto.UserDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.User

@Mapper(componentModel = "spring")
interface UserMapper : AbstractMapper<User, UserDto>
