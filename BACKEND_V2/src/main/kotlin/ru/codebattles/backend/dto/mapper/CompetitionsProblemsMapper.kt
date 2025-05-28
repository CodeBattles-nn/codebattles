package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.dto.CompetitionsProblemsDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.CompetitionsProblems

@Mapper(componentModel = "spring")
interface CompetitionsProblemsMapper : AbstractMapper<CompetitionsProblems, CompetitionsProblemsDto>
