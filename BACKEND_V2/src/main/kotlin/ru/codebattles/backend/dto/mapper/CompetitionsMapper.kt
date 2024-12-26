package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper

@Mapper(componentModel = "spring")
interface CompetitionsMapper : AbstractMapper<Competition, CompetitionDto>
