package ru.codebattles.backend.aspects

import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import ru.codebattles.backend.entity.User
import ru.codebattles.backend.repository.CompetitionRepository
import java.nio.file.AccessDeniedException

@Aspect
@Component
class CompetitionAccessAspect(
    private val competitionRepository: CompetitionRepository,
) {
    @Before("@annotation(ru.codebattles.backend.annotations.CompetitionAccessRequired) && args(compId, ..)")
    fun checkAccess(compId: Long) {
//        val authentication = SecurityContextHolder.getContext().authentication
//        if (authentication == null || !authentication.isAuthenticated) {
//            throw IllegalStateException("User is not authenticated!")
//        }
//
//        val user: User = authentication.principal as User
//
//        if (user.isAdmin()) return
//        if (competitionRepository.existsByIdAndMembersId(compId, user.id!!)) return
//
//        throw AccessDeniedException("User does not have access to this competition")
    }
}