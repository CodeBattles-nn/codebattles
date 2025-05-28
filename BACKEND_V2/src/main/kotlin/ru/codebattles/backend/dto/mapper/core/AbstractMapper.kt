package ru.codebattles.backend.dto.mapper.core


interface AbstractMapper<OBJ, DTO> {
    fun toDto(obj: OBJ): DTO
    fun fromDto(obj: DTO): OBJ
    fun fromDtoS(obj: List<DTO>): List<OBJ>
    fun toDtoS(obj: List<OBJ>): List<DTO>
    fun toDtoS(obj: Set<OBJ>): List<DTO>
}
