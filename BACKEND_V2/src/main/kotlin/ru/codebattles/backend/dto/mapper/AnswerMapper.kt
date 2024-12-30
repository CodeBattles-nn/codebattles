package ru.codebattles.backend.dto.mapper

import org.mapstruct.Mapper
import ru.codebattles.backend.dto.AnswerDto
import ru.codebattles.backend.dto.ProblemDto
import ru.codebattles.backend.dto.mapper.core.AbstractMapper
import ru.codebattles.backend.entity.Answer
import ru.codebattles.backend.entity.Problem

@Mapper(componentModel = "spring")
interface AnswerMapper : AbstractMapper<Answer, AnswerDto>
