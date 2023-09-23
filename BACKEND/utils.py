def fix_new_line(data):
    print(data)
    if isinstance(data, list):
        out = []
        for i in data:
            out.append(fix_new_line(i))
        return out
    elif isinstance(data, str):
        return data.replace("\\n", '\n')
    else:
        return data


def get_table_color_class_by_score(score):
    if score is None:
        return ""
    elif score == 100:
        return "table-success"

    elif score == 0:
        return "table-danger"

    return "table-warning"


def get_table_color_class_by_test_message(msg):
    if msg == "OK" or msg == "SUCCESS":
        return "table-success"
    elif msg == "WRONG_ANSWER":
        return "table-danger"

    return "table-info"
