#!/bin/bash
node ./data-stream.js | tee data-stream.txt
echo ""
node ./stream-conversion.js | tee stream-conversion.txt
echo ""
node ./transform-stream.js | tee transform-stream.txt
