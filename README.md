# Apply changes from submodule
- Go to submodule, commit your files
- `git format-patch -1 <NEW_COMMIT_SHA>`
- Move created patch file to your local riveradmin repository
- Go to your riveradmin repository, apply the patch using `git apply file.patch`
- Remove patch and push
- Return to the folder with submodule and run `git fetch origin && git reset --hard origin/master`
- Go to your project root and commit changes in submodule
