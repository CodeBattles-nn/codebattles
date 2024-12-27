package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.dto.ProblemDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.Problem

@Mapper(componentModel = "spring")
interface ProblemsMapper : AbstractMapper<Problem, ProblemDto>
