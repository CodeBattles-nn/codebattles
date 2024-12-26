package ru.codebattles.backend.dto.mapper.core


interface AbstractMapper<OBJ, DTO> {
    fun toDto(obj: OBJ): DTO
    fun fromDto(obj: DTO): OBJ
}
