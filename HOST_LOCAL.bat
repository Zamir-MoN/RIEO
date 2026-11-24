@echo off
title RIEO - Local Host Server
cls
setlocal enabledelayedexpansion
set "IP=localhost"
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set "RAW_IP=%%a"
    set "IP=!RAW_IP: =!"
    goto :found_ip
)
:found_ip

echo ====================================================
echo             RIEO LOCAL HOST SERVER
echo ====================================================
echo.
echo Local PC Access:    http://localhost:3145
echo Mobile Phone / LAN: http://!IP!:3145
echo.
echo Note: Ensure your mobile phone is connected to the
echo same Wi-Fi network as this PC.
echo.
echo Starting server...
echo ====================================================
cd /d "%~dp0"
call npm run dev
pause
