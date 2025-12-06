@echo off

REM --- 1. Check if node_modules exists ---
IF NOT EXIST "node_modules" (
    ECHO node_modules folder not found. Running npm install...
    npm install && (
        REM --- 2. If npm install succeeds, start the server ---
        ECHO npm install succeeded. Starting server with nodemon...
        nodemon server.js
    ) || (
        REM --- 3. If npm install fails ---
        ECHO ERROR: npm isntall failed. Server not started.
    )
) ELSE (
    ECHO node_modules folder found. Skipping npm install and starting server directly...
    nodemon server.js
)

pause