package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.dto.CreateProblemDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.Problem

@Mapper(componentModel = "spring")
interface CreateProblemsMapper : AbstractMapper<Problem, CreateProblemDto>
