import json

from utils import fix_new_line

st = '[["12\\\\n13", "25"], ["3\\\\n2", "5"]]'

o = json.loads(st)

print(fix_new_line(o))

