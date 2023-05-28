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
