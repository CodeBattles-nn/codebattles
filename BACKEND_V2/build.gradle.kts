plugins {
	kotlin("jvm") version "1.9.25"
	kotlin("plugin.spring") version "1.9.25"
	id("org.springframework.boot") version "3.4.1"
	id("io.spring.dependency-management") version "1.1.7"
	kotlin("plugin.jpa") version "1.9.25"
	id("org.jetbrains.kotlin.kapt") version "1.9.25"
}

group = "ru.codebattles"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

repositories {
	mavenCentral()
}

// Version properties
val kotlinVersion = "1.9.25"
val springBootVersion = "3.4.1"
val springDependencyManagementVersion = "1.1.7"
val springDocOpenApiVersion = "2.8.8"
val flywayVersion = "11.8.2"
val mapstructVersion = "1.5.5.Final"
val jjwtVersion = "0.11.5"
val lombokVersion = "1.18.30"
val postgresqlVersion = "42.6.0"
val logbackEncoderVersion = "7.4"

dependencies {
	// Spring Boot starters
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-actuator")

	// Kotlin
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")

	// Documentation
	implementation("org.springdoc:springdoc-openapi-starter-common:$springDocOpenApiVersion")
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:$springDocOpenApiVersion")

	// Database
	implementation("org.flywaydb:flyway-core:$flywayVersion")
	runtimeOnly("org.postgresql:postgresql:$postgresqlVersion")
	runtimeOnly("org.flywaydb:flyway-database-postgresql:$flywayVersion")

	// Security
	implementation("io.jsonwebtoken:jjwt-api:$jjwtVersion")
	implementation("io.jsonwebtoken:jjwt-impl:$jjwtVersion")
	implementation("io.jsonwebtoken:jjwt-jackson:$jjwtVersion")

	// Logging
	implementation("net.logstash.logback:logstash-logback-encoder:${logbackEncoderVersion}")

	// Mapping
	implementation("org.mapstruct:mapstruct:$mapstructVersion")
	kapt("org.mapstruct:mapstruct-processor:$mapstructVersion")

	// Lombok
	compileOnly("org.projectlombok:lombok:$lombokVersion")
	annotationProcessor("org.projectlombok:lombok:$lombokVersion")

	// Testing
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

kotlin {
	compilerOptions {
		freeCompilerArgs.addAll("-Xjsr305=strict")
	}
}

allOpen {
	annotation("jakarta.persistence.Entity")
	annotation("jakarta.persistence.MappedSuperclass")
	annotation("jakarta.persistence.Embeddable")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

kapt {
	correctErrorTypes = true
	arguments {
		arg("mapstruct.unmappedTargetPolicy", "ignore")
	}
}

sourceSets {
	main {
		java {
			srcDir("build/generated/sources/annotationProcessor/java/main")
		}
	}
}