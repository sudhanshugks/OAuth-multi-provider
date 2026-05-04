@echo off
echo ===================================================
echo Starting OAuth Multi-Provider Application
echo ===================================================
echo.

echo Starting the Spring Boot Backend in a new window...
start "Backend Server" cmd /c "cd backend && title Backend (Spring Boot) && mvn spring-boot:run"

echo Starting the React/Vite Frontend in a new window...
start "Frontend Server" cmd /c "cd frontend && title Frontend (Vite) && npm run dev"

echo.
echo Both servers are starting up! 
echo Two new terminal windows have been opened for you.
echo.
echo You can safely close this window.
pause
