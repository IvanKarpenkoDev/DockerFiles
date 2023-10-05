FROM python:alpine

LABEL version = "01.01.01"

WORKDIR /test/testPath

COPY txt.py /test/testPath

CMD ["python", "txt.py"]