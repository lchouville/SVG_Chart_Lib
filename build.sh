# Install dependencies
npm install

# Push the code in develop
git add -A
git commit -m "Build Push"
git push origin develop

# Build libraries
npm run build

# Checkout the release branch
git checkout release

# Pull the latest changes from the release branch
git pull origin release

# Copy the latest README.md, .gitignore, and release-notes.txt from develop
git checkout develop -- README.md
git checkout develop -- .gitignore
git checkout develop -- release-note.txt

# Add the built libraries and specific files to the release branch
git add lib/*
git add README.md
git add release-note.txt
git add .gitignore

# Commit the changes
git commit -m "Release version"

# Push the changes to the release branch
git push origin release
