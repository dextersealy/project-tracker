## API Endpoints ##

### HTML API

#### Root
verb | URI | controller#action | details
-----|-----|-------------------|--------
`GET` | / | static_pages#root | load React web app

### JSON API

#### users

verb | URI | controller#action | details
-----|-----|-------------------|--------
`POST` | /api/users | users#create | create new account
`PATCH` | /api/users/:id | users#update | edit account

#### session

verb | URI | controller#action | details
-----|-----|-------------------|--------
`POST` | /api/session | session#create | sign in
`DELETE` | /api/session | session#destroy |  sign out

#### projects

verb | URI | controller#action | details
-----|-----|-------------------|--------
`GET` | /api/projects | projects#index | get logged in user's projects
`POST` | /api/projects | projects#create | create project
`PATCH` | /api/projects/:id | projects#update | edit project

#### memberships

verb | URI | controller#action | details
-----|-----|-------------------|--------
`GET` | /api/memberships | memberships#index| get project's members, requires project_id param
`POST` | /api/memberships | memberships#create | add project member, requires project_id param

#### stories

verb | URI | controller#action | details
-----|-----|-------------------|--------
`GET` | /api/projects/:project_id/stories | stories#index | get project's stories
`POST` | /api/projects/:project_id/stories | stories#create | create story
`PATCH` | /api/stories/:id | stories#update | edit story
`DELETE` | /api/stories/:id | stories#destroy | delete story

#### tasks

verb | URI | controller#action | details
-----|-----|-------------------|--------
`GET` | /api/stories/:story_id/tasks | tasks#index | get story's tasks
`POST` | /api/stories/:story_id/tasks | tasks#create | create task
`PATCH` | /api/tasks/:id | tasks#update | edit task
`DELETE` | /api/tasks/:id | tasks#destroy | delete task

#### comments

verb | URI | controller#action | details
-----|-----|-------------------|--------
`GET` | /api/stories/:story_id/comments | comments#index | get story's comments
`POST` | /api/stories/:story_id/comments | comments#create | create comment
`PATCH` | /api/comments/:id | comments#update | edit comment
`DELETE` | /api/comments/:id | comments#destroy | delete comment
