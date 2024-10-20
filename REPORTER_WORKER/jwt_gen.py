import jwt

import time

# Python3 code to illustrate the addition
# of time onto the datetime object

# Importing datetime
import datetime

# Initializing a date and time
date_and_time = datetime.datetime.now()
# Calling the timedelta() function
time_change = datetime.timedelta(minutes=1)
new_time = date_and_time + time_change

encoded = jwt.encode({"reportID": "1", "filename": "background.jpg", "valid": new_time.timestamp()}, "secret", algorithm="HS256")
print(encoded)
