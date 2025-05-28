package ru.codebattles.backend.dto.mapper

import org.mapstruct.BeanMapping
import org.mapstruct.Mapper
import org.mapstruct.MappingTarget
import org.mapstruct.NullValuePropertyMappingStrategy
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.dto.CompetitionDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.web.entity.CompetitionEditDto

@Mapper(componentModel = "spring")
interface CompetitionsMapper : AbstractMapper<Competition, CompetitionDto> {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    fun update(dto: CompetitionEditDto?, @MappingTarget entity: Competition?)
}
