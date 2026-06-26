@echo off
title Character Creation Flow

cd /d "%~dp0"

set NODE_ENV=development

echo Starting dev server...
echo Open http://localhost:5173 in your browser
echo Press Ctrl+C to stop
echo.

start "" http://localhost:5173
npx vite --host
