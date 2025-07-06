#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p public/images/testimonials

# Download placeholder images
curl -L "https://i.pravatar.cc/200?img=1" -o public/images/testimonials/placeholder-1.jpg
curl -L "https://i.pravatar.cc/200?img=2" -o public/images/testimonials/placeholder-2.jpg
curl -L "https://i.pravatar.cc/200?img=3" -o public/images/testimonials/placeholder-3.jpg 