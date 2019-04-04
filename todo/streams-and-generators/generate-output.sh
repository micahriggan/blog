#!/bin/bash
node ./data-stream.js | tee data-streams.txt
echo ""
node ./stream-conversion.js | tee stream-conversion.txt
