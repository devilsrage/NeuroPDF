# Dockerfile for NeuroPDF application
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --trusted-host pypi.python.org -r requirements.txt

COPY . .

EXPOSE 5000

ENV NAME NeuroPDF

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]