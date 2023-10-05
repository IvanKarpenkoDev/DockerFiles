FROM openjdk:11-jdk-slim

WORKDIR /app

COPY game.java /app/

RUN javac game.java

CMD ["java", "game"]