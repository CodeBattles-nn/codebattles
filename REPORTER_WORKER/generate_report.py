import os
import shutil


path = "localstorage/2"

os.mkdir(path)
shutil.copyfile("pipelines/gen_report.py", f"{path}/gen_report.py")
shutil.copyfile("filename.csv", f"{path}/filename.csv")

os.chdir("localstorage/2")

with open("gen_report.py", encoding="utf-8") as hello:
    exec(hello.read())

