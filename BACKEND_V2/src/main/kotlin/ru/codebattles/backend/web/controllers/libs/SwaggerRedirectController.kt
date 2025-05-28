package ru.codebattles.backend.web.controllers.libs

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class SwaggerRedirectController {
    @GetMapping("/swagger-ui")
    fun redirectToNewUrl() = "redirect:/swagger-ui/index.html"
}
