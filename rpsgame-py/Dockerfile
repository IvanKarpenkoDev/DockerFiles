FROM python:alpine

LABEL version="01.01.01"

WORKDIR /the/workdir/testPath

COPY RockPaperScissorsGame.py /the/workdir/testPath

RUN mv RockPaperScissorsGame.py rockpaperscissorsgame.py

CMD ["python", "rockpaperscissorsgame.py"]
