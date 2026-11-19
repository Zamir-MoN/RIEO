@echo off
title RIEO - Local Host Server
cls
echo ====================================================
echo             RIEO LOCAL HOST SERVER
echo ====================================================
echo.
echo Local PC Access:    http://localhost:3145
echo Mobile Phone / LAN: http://192.168.31.238:3145
echo.
echo Note: Ensure your mobile phone is connected to the
echo same Wi-Fi network as this PC.
echo.
echo Starting server...
echo ====================================================
cd /d "%~dp0frontend"
call npm run dev
pause
