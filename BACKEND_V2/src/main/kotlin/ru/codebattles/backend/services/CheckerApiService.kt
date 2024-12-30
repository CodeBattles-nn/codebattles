package ru.codebattles.backend.services

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import ru.codebattles.backend.web.entity.checker.CheckerTaskRequest


@Service
class CheckerApiService(
    val objectMapper: ObjectMapper,
) {

    fun sendCheckerTask(payload: CheckerTaskRequest, url: String) {
        val restTemplate: RestTemplate = RestTemplate()

        val headers: HttpHeaders = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON
        val json = objectMapper.writeValueAsString(payload)
        val entity = HttpEntity(json, headers)
        val response = restTemplate.postForEntity(
            url, entity,
            String::class.java
        )
    }
}
