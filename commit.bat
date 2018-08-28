@echo off

git add -A
set /p msg=enter comments:
git commit -m "%msg%"
git push