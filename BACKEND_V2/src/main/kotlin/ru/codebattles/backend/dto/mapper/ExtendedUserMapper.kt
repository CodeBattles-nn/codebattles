package ru.codebattles.backend.dto.mapper

import org.mapstruct.BeanMapping
import org.mapstruct.Mapper
import org.mapstruct.MappingTarget
import org.mapstruct.NullValuePropertyMappingStrategy
import ru.codebattles.backend.dto.ExtendedUserDto
import ru.codebattles.backend.dto.UserDto
import ru.codebattles.backend.dto.UserProfileEditDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.User


@Mapper(componentModel = "spring")
interface ExtendedUserMapper : AbstractMapper<User, ExtendedUserDto>
