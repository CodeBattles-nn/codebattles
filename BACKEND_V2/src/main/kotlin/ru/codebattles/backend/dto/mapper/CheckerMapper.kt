package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.dto.CheckerDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.Checker

@Mapper(componentModel = "spring")
interface CheckerMapper : AbstractMapper<Checker, CheckerDto>
