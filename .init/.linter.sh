#!/bin/bash
cd /home/kavia/workspace/code-generation/mood-tracker-and-journal-284061-284071/mood_log_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

