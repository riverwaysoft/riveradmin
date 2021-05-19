# Apply changes from submodule
- Go to submodule, create a patch from uncommited changes. Move this patch to your local riveradmin repo: `git diff > ../../../riveradmin/file.patch`
- Go to your riveradmin repository, apply the patch using `git apply file.patch`
- Remove patch and push
- Return to the folder with submodule and run `git fetch origin && git reset --hard origin/master`
- Go to your project root and commit changes in submodule
