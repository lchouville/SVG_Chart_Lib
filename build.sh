# Install dependencies
npm install
# Push the code in develop
git add *
git commit -m "Build Push"
git push
#  Build libraries
npm run build
# Push Lib in release   
git add lib/*
git add README.md
git add release-notes.txt
git add .gitignore
git commit -m "Release version"
git push origin release