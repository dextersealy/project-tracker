# Minimum Viable Product

**Project Tracker** is a web application inspired by [Pivotal Tracker](https://www.pivotaltracker.com) designed to help teams collaborate on projects. Project Tracker is built using Ruby on Rails and React/Redux.

By the end of week 9, the application will meet the following criteria with smooth, bug-free, navigation, adequate seed data, and engaging styling:

- Hosting on Heroku
- New account creation, login, and guest/demo login
- Projects/project dashboard
- Stories
- Story workflow
- Drag and drop prioritization
- Production README

# Design documents

- [Wireframes](./wireframes/wireframes.md)
- [React Components](./component-hierarchy.md)
- [API Endpoints](./api-endpoints.md)
- [Database Schema](./schema.md)
- [Sample State](./sample-state.md)

# Implementation Timeline

### Phase 1: Back- and front-end setup (2 days)
- New user can sign up
- User can sign in
- User can sign out
- Returning user remains signed until she signs out

### Phase 2: Projects (1 day)
- User can create project
- User can rename project
- User can switch projects

### Phase 3: Stories (1 day)
- User can create story
- User can edit story
- User can delete story

### Phase 4: Story workflow (1 day)
- User can move stories through workflow
- Only story owner can Accept or Reject
- User can toggle hiding/showing accepted stories

### Phase 5: Tasks (1 day)
- User can create and edit tasks
- User can change task status

### Phase 6: Comments (1 day)
- User can comment on story
- User can edit own comments
- User who rejects story is prompted to enter a comment

### Phase 7: Drag & drop (1 day)
- User can prioritize stories via drag & drop

### Bonus Features (TBD)

- Iterations
- Velocity
