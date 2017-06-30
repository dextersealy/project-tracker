# Project Tracker

Project Tracker is a full-stack web application, modeled on [Pivotal Tracker](http://www.pivotaltracker.com),
that help agile teams keep in sync. It has a Ruby on Rails (Postgresql) back end,
and React.js front end with a Redux framework.

## Features

### Project, Stories and Tasks

Project Tracker consists of three major objects: projects, stories and tasks. A ***story*** is any intermediate project deliverable. It can be a new feature, a bug fix, a maintenance chore, or a release milestone. A ***project*** is a collection of stories that are worked on together by the project's members. Stories can have ***tasks*** that represent intermediate steps to be checked-off as they are completed.

The main application interface is a real-time project dashboard, where you can create and edit stories and track their progress through the development pipeline. The dashboard has for sections:
- Stories start off in an ***Icebox*** that holds anticipated deliverables
- When work commences on a deliverable, it moves to ***Current***
- When a deliverable is finished and accepted, it moves to ***Done***
- ***My Work*** lists the logged in user's current deliverables

Project Tracker pushes changes to logged in users and updates the dashboard in real-time to reflect the current status of all items.

## Back end

### Schema

**```Users```** holds the user profile and ```password_digest```, and **```sessions```** tracks active sessions so users can log in simultaneously from multiple locations.

Stories, projects and tasks are stored in separate tables: **```stories```** contains a ```project_id``` column that associates stories with projects, and **``tasks``** contains a similar ```story_id``` column linking tasks to stories. The **```projects```** table contains no foreign keys. A separate **```memberships```** join table associates user's with projects and their level of access (e.g., *owner*, *member* or *viewer*).

### Models

Each table has an associated ActiveRecord model that validate data before it gets persisted, and that removes dependent rows when the primary relation is removed. The Membership model uses a scoped relation that identifies project "owners" and "owned projects".

### Controllers

These controllers implement the RESTful interface between front and back end components.

- ```Users``` has a single action for creating new accounts.
- ```Sessions``` has actions to create and destroy active sessions (i.e., log in/out).
- ```Projects``` has CRUD (**C**reate, **R**ead, **U**pdate, and **D**elete) actions for projects.
- ```Stories``` has CRUD actions for stories and, index and show actions that respectively return all the stories in a project, and all the data for one story (including its tasks). It also implements a custom ***prioritize*** action that the front end invokes when you use drag & drop to reorder deliverables.
- ```Tasks``` contains CRUD actions to associate task with stories.

These controllers are internal plumbing:
- ```StaticPages``` renders a root page that bootstraps the web application with the current user's identity
- ```Pusher``` implements the authentication endpoint for [Pusher](https://pusher.com/) real-time notifications.

## Front end

### React Components

The application's entry point renders the ***Root*** component, who's sole purpose is to wrap the main App component within the store provider and hash router.

The ***App*** component defines the routes for the application: ```/signin``` ```/login``` and ```/logout``` manage user sessions, ```/projects``` handles project maintenace, and ```/project``` implements the real-time project dashboard.
