# Checkout the main branch
git checkout main

# Pull the latest changes from the main branch
git pull origin main

# Copy the latest README.md, and release-notes.txt from release
git checkout release -- README.md
git checkout release -- release-notes.txt
git checkout release -- lib/*

# Add the built libraries and specific files to the main branch
git add lib/*
git add README.md
git add release-notes.txt

# Commit the changes
git commit -m "Release version "