plugins {
    kotlin("jvm") version "1.9.23"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
    implementation("org.jetbrains.kotlinx:multik-core:0.2.3")
    implementation("org.jetbrains.kotlinx:multik-default:0.2.3")
    implementation("org.jetbrains.exposed:exposed-core:0.50.0")
    implementation("org.jetbrains.exposed:exposed-crypt:0.50.0")
    implementation("org.jetbrains.exposed:exposed-dao:0.50.0")
    implementation("org.jetbrains.exposed:exposed-jdbc:0.50.0")

    implementation("org.jetbrains.exposed:exposed-jodatime:0.50.0")


    implementation("org.jetbrains.exposed:exposed-json:0.50.0")
    implementation("org.jetbrains.exposed:exposed-money:0.50.0")
    implementation("org.jetbrains.exposed:exposed-spring-boot-starter:0.50.0") // Make sure you have Kotlin stdlib include
}

tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(21)
}