#!/bin/bash
echo "Stream"
node ./data-stream.js | tee data-streams.txt
echo "Generator"
node ./data-generator.js | tee data-generator.txt
