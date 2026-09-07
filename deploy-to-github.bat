@echo off
echo ===================================================
echo   Aldrin Abir Portfolio - 1-Click GitHub Deploy
echo ===================================================
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/username/aldrin-portfolio.git): "
if "%REPO_URL%"=="" (
    echo [ERROR] No URL provided. Exiting.
    pause
    exit /b
)

echo.
echo [*] Adding Git remote origin...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [*] Pushing branch 'main' to GitHub...
git push -u origin main

echo.
echo ===================================================
echo   [SUCCESS] Code pushed to GitHub!
echo   Connect this repo to Cloudflare Pages or Vercel.
echo ===================================================
pause
