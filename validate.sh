#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define branch names
RELEASE_BRANCH="release"
MAIN_BRANCH="main"

# Set up git user for the merge operation (useful for CI environments)
git config --global user.name "github-actions[bot]"
git config --global user.email "github-actions[bot]@users.noreply.github.com"

# Fetch the latest branches from the remote
git fetch origin

# Checkout the main branch and pull the latest changes
git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

# Checkout the release branch and pull the latest changes
git checkout $RELEASE_BRANCH
git pull origin $RELEASE_BRANCH

# Merge release into main
git checkout $MAIN_BRANCH
git merge $RELEASE_BRANCH --no-ff -m "Merge branch 'release' into '$MAIN_BRANCH'"

# Copy the necessary files and directories
cp -R lib/* .
cp README.md .
cp release-notes.txt .
cp .gitignore .

# Add the copied files to the staging area
git add lib/* README.md release-notes.txt .gitignore

# Commit the changes
git commit -m "Update lib directory and documentation from release branch"

# Push the changes to the main branch
git push origin $MAIN_BRANCH

echo "Merge from $RELEASE_BRANCH to $MAIN_BRANCH completed successfully."
