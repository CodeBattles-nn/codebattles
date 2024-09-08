import datetime
import json
import re

from flask import request
from psycopg2.extras import RealDictCursor

from app import app
from database import get_connection
from decorators import login_required, get_user_id, redis_conn


@app.route("/api/send/quiz", methods=['POST'])
@login_required
@get_user_id
@redis_conn
def send_quiz_solution(user_id, uid, r):
    connection = get_connection()
    cur = connection.cursor()
    cur_dict = connection.cursor(cursor_factory=RealDictCursor)

    answers: dict
    problem, answers = request.json['problem'], request.json['answers']

    if not re.fullmatch("[a-zA-Z]", problem):
        return "", 409

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
    report = ""
    for answer_id, answer in answers.items():
        current_answer = answer[0]
        print(questionById)
        correct_answer = questionById[int(answer_id)]['correct_answers'][0]
        print(correct_answer)
        report += "=" * 30 + "\n"
        report += "Expected: " + "\n"
        report += str(correct_answer) + "\n"
        report += "Answered: " + "\n"
        report += str(current_answer) + "\n"


        if current_answer == correct_answer:
            points += 1
            report += f"Got 1 point" + "\n"
        else:
            report += f"Got 0 point" + "\n"

        report += "=" * 30 + "\n"

    totalPoints = int(points / qustionsCount * 100)

    report += "\n"
    report += f"Final points: {points}/{qustionsCount} => {totalPoints}"
    report += "\n"



    cur.execute(f"""SELECT id FROM champSends_{user_id} where user_id={uid} and problem_id={problem_id}""")
    equals_sends = cur.fetchall()
    print("!!!!!!", equals_sends)

    if len(equals_sends) == 0:

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
                report,
                problem,
                totalPoints

            )
        )

        cur.execute(
            f"""
            UPDATE champUsers_{user_id} SET {problem.lower()} = {totalPoints}
            WHERE id= {uid}""")

        connection.commit()

    r.delete(f"r-champ-{user_id}-stats",
             f"r-champ-{user_id}-sends-user-{uid}")

    return {"ok": "ok"}
