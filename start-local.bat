@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "Naruto Enot Garem" http://localhost:8000
  py -m http.server 8000
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  start "Naruto Enot Garem" http://localhost:8000
  python -m http.server 8000
  goto :eof
)
echo Python не найден. Открой index.html двойным щелчком или установи Python для локального сервера.
pause
