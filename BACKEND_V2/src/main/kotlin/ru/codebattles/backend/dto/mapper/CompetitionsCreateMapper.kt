package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.NullValuePropertyMappingStrategy
import ru.codebattles.backend.dto.CompetitionCreateDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.Competition
import ru.codebattles.backend.entity.User

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
interface CompetitionsCreateMapper : AbstractMapper<Competition, CompetitionCreateDto> {
    @Deprecated("Use method with other signature")
    override fun fromDto(obj: CompetitionCreateDto): Competition

    @Mapping(target = "organizer", source = "user")
    fun fromDto(dto: CompetitionCreateDto, user: User): Competition

}
