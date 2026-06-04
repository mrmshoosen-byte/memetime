@echo off
REM Color codes aren't fully supported in Windows CMD, using simple approach

echo.
echo ========================================
echo.  Memecoin Clock - Quick Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed
    echo Download from: https://nodejs.org
    pause
    exit /b 1
)

echo Installing dependencies...
echo.
call npm install

REM Create env file if it doesn't exist
if not exist .env.local (
    echo Creating .env.local...
    copy .env.example .env.local
    echo.
    echo WARNING: Update .env.local with your API keys (optional)
    echo Get free key from: https://newsapi.org
)

echo.
echo ========================================
echo Setup complete!
echo ========================================
echo.
echo Available commands:
echo   npm run dev     - Start development server (localhost:3000)
echo   npm run build   - Build for production
echo   npm run start   - Start production server
echo   npm run lint    - Check code quality
echo.
echo Next steps:
echo   1. npm run dev
echo   2. Open http://localhost:3000
echo   3. Edit .env.local for your API keys
echo.
echo Happy coding!
echo.
pause
