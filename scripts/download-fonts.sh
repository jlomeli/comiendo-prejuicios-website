#!/bin/bash

# Create fonts directory if it doesn't exist
mkdir -p public/fonts

# Download Raleway font
curl -L "https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyC0ITw.woff2" -o "public/fonts/raleway-v28-latin-600.woff2"

# Download Open Sans font
curl -L "https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.woff2" -o "public/fonts/open-sans-v34-latin-regular.woff2"

echo "Font files have been downloaded successfully!" 