# Use an official Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Second stage: minimal runtime image
FROM openjdk:17-jdk-slim

# Set the working directory for the runtime stage
WORKDIR /app

# Copy the packaged JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port for the device service
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar","app.jar"]