FROM tiangolo/uvicorn-gunicorn:python3.11

COPY ./requirements.txt /app/requirements.txt

COPY ./app/model/rentAnalyser.pkl /app/model/rentAnalyser.pkl

COPY ./app/model/columns.json /app/model/columns.json

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./app /app 

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]