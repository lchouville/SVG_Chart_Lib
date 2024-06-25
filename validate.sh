# Fetch the latest branches from the remote
git fetch origin

# Checkout the main branch and pull the latest changes
git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

# Checkout the release branch and pull the latest changes
git checkout $RELEASE_BRANCH
git pull origin $RELEASE_BRANCH

# Copy the necessary files and directories from release to main
git checkout $MAIN_BRANCH
git checkout $RELEASE_BRANCH -- lib README.md release-notes.txt

# Add the copied files to the staging area
git add lib/* README.md release-notes.txt

# Commit the changes
git commit -m "Update lib directory and documentation from release branch"