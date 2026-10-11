@echo off
title Aldrin Abir Portfolio - Local Server
echo ===================================================
echo   Aldrin Abir Creative Portfolio - Local Preview
echo ===================================================
echo.
echo [*] Launching local server at http://localhost:8000 ...
echo [*] Press Ctrl+C to stop the server anytime.
echo.

start "" http://localhost:8000

py -m http.server 8000 2>nul || python -m http.server 8000 2>nul || npx serve . -l 8000
pause
