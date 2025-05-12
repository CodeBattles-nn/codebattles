package ru.codebattles.backend.services;

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import ru.codebattles.backend.entity.Checker
import ru.codebattles.backend.repository.CheckerRepository
import java.io.IOException

@Service
class CheckerService(
    private val checkerRepository: CheckerRepository,
    private val objectMapper: ObjectMapper,
) {


    @Throws(IOException::class)
    fun patch(id: Long, patchNode: JsonNode): Checker {
        val checker: Checker = checkerRepository.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Entity with id `$id` not found")
        }
        objectMapper.readerForUpdating(checker).readValue<Checker>(patchNode)
        return checkerRepository.save(checker)
    }

    fun create(checker: Checker): Checker {
        return checkerRepository.save(checker)
    }


    fun delete(id: Long): Checker? {
        val checker: Checker? = checkerRepository.findById(id).orElse(null)
        if (checker != null) {
            checkerRepository.delete(checker)
        }
        return checker
    }
}