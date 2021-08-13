#!/bin/bash

set -e

COMMIT_NAME="$(git log -1 --pretty=%B)"
PATCH_NAME=$(git format-patch -1 "$(git rev-parse HEAD)")
RIVERADMIN_PATH="../../../riveradmin"

echo "Created patch: $PATCH_NAME"

if [ -d $RIVERADMIN_PATH ]
then
  echo "Directory riveradmin exists"
else
  echo "Directory riveradmin does not exist. Please pull riveradmin from GitLab to your projects folder"
fi

mv "$PATCH_NAME" $RIVERADMIN_PATH && echo "Moved patch to riveradmin"

cd $RIVERADMIN_PATH && git apply "$PATCH_NAME" && echo "The patch have been applied"

rm "$PATCH_NAME" && git add . && git commit -m "$COMMIT_NAME" && echo "Commit"

git push && echo "Push"

cd - && git fetch origin && git reset --hard origin/master

cd ../.. && git add . && git commit -m "Up-to-date admin" && echo "The current project is up-to-date with admin and ready to push"
