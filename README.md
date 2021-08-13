# Features

- Mobx stores for displaying lists and editing forms
- List filters, HTTP query parameters serialize / deserialize
- List actions such as create / update / delete
- React components for login / logout
- Parse backend errors and map to form inputs
- Menu generation
- JWT
- Translations
- Network status display
- Impersonation

# Apply changes from submodule

1) Make sure you've committed your changes: `git add . && git commit -m "..."`
2) Apply the change to submodule & push `./push-last-commit.sh`

# Folder structure & component naming conventions

Here is an example of folder structure & naming conventions for a project that uses Riveradmin:

```bash
- src
  - admin
    - pages
      - user
        - admin-user-list.tsx
        - admin-user-form.tsx
    - stores
      - admin-user-list-store.ts
      - admin-user-form-store.ts
    - admin-routes.tsx # List of routes
  - index # Separate folder to support Webpack dynamic chunk loading
    - index-admin.tsx
    - index-app.tsx
  - app # phonedo / youshka / etc
    - pages
      - user
        - user-list.tsx
        - user-form.tsx
  - shared # Used in both admin & app
    - model
      - user.tsx

```
