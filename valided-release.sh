# Checkout the release branch
git checkout main

# Pull the latest changes from the release branch
git pull origin main

# Copy the latest README.md, and release-notes.txt from develop
git checkout release -- README.md
git checkout release -- lib/*
git checkout release -- release-notes.txt

# Add the built libraries and specific files to the release branch
git add lib/*
git add README.md
git add release-notes.txt