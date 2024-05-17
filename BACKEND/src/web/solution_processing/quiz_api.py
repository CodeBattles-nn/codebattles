import datetime
import json

from flask import request
from psycopg2.extras import RealDictCursor

from app import app
from database import get_connection
from decorators import login_required, get_user_id


@app.route("/api/send/quiz", methods=['POST'])
@login_required
@get_user_id
def send_quiz_solution(user_id, uid):
    connection = get_connection()
    cur = connection.cursor()
    cur_dict = connection.cursor(cursor_factory=RealDictCursor)

    answers: dict
    problem, answers = request.json['problem'], request.json['answers']

    cur.execute(f"SELECT {problem.lower()} FROM champs WHERE id = %s",
                (str(user_id),))

    fetch = cur.fetchone()  # Can be None
    problem_id = fetch[0]
    print(problem_id)

    cur_dict.execute(f"SELECT tests, name FROM problems WHERE id = %s",
                     (problem_id,))
    fetch = cur_dict.fetchone()
    tests = fetch['tests']
    problem_name = fetch['name']

    tests_dict = json.loads(tests)
    questionById = {}
    qustionsCount = 0
    for question in tests_dict['questions']:
        questionById[question['id']] = question
        qustionsCount += 1
    print(questionById)

    points = 0
    for answer_id, answer in answers.items():
        current_answer = answer[0]
        print(questionById)
        correct_answer = questionById[int(answer_id)]['correct_answers'][0]
        print(correct_answer)
        if current_answer == correct_answer:
            points += 1

    totalPoints = int(points / qustionsCount * 100)

    cur.execute(
        f'''
        INSERT INTO champSends_{user_id}
        (problem_name, problem_id, user_id, send_time, state, program, problem_letter, score)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s);
        ''',
        (
            problem_name,
            problem_id,
            uid,
            datetime.datetime.now(),
            "Подсчитано",
            json.dumps(answers),
            problem,
            totalPoints

        )
    )

    cur.execute(
        f"""
        UPDATE champUsers_{user_id} SET {problem.lower()} = {totalPoints}
        WHERE id= {user_id}""")

    connection.commit()

    return {"ok": "ok"}
