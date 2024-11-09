# Phase 1 of build
    # Step 1 -> Taking a base image for maven to package a jar (jdk version 17+) need to take it as alias
    # Step 2 -> Creating a working directory
    # Step 3 -> Copying pom.xml
    # Step 4 -> downloading dependency from internet with maven in offline mode
    # Step 5 -> Copying src folder to the image
    # Step 6 -> Building the application with maven
    # Step 7 -> extracting the jar in layer mode -> it will extract the jar in layers : dependency , snapshot-dependency
    #, application , spring-boot-loader

FROM maven:3.9.9-eclipse-temurin-21-jammy AS phase_1_maven_build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src src

RUN mvn package

RUN java -Djarmode=layertools -jar target/Medium-blog-server-1.0-SNAPSHOT.jar extract
# Phase 2 of build -> Now as we have the jar with dependecies we only need java runtime to run the jar
    # Step 1 -> Taking a base image of java runtime (same version in which build happened)
    # Step 2 -> Creating a working directory
    # Step 3 -> Now we will copy each layer separately from the previous phase
    # Step 4 -> now we will run the jar from jar launcher spring boot as we have separate layers

FROM openjdk:23-ea-21-oracle

WORKDIR /app

COPY --from=phase_1_maven_build app/dependencies ./
COPY --from=phase_1_maven_build app/snapshot-dependencies ./
COPY --from=phase_1_maven_build app/application ./
COPY --from=phase_1_maven_build app/spring-boot-loader ./
ENTRYPOINT ["java","org.springframework.boot.loader.launch.JarLauncher"]
