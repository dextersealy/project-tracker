## Sample state ##

```js
{
  currentUser: {
    id: 1,
    email: "johnsmith@email.com",
  },
  users: {
    1: {
      id: 1,
      name: "John Smith"
      initials: "JS",
    },
    2: {
      id: 2,
      name: "Mary Jones",
      initials: "MJ"
    }
  },
  projects: {
    1: {
      id: 1,
      title: "My First Project"
    }
  },
  stories: {
    1: {
      id: 1,
      project_id: 1,
      title: "User can sign up",
      description: "",
      type: "feature",
      state: "started",
      points: 2,
      priority: 1,
      author_id: 1,
      owner_id: 1
    },
    2: {
      id: 2,
      project_id: 1,
      title: "User can sign in",
      description: "",
      type: "feature",
      state: "unstarted",
      points: 2,
      priority: 2,
      author_id: 1,
      owner_id: 1
    }
  },
  tasks: {
    1: {
      id: 1,
      title: "Implement Auth pattern"
      done: true,
      story_id: 1,
      author_id: 1
    },
    2: {
      id: 1,
      title: "Create Sign Up form"
      done: false,
      story_id: 1,
      author_id: 1
    }
  },
  comments: {
    1: {
      id: 1
      body: "Don't store passwords in the database!!"
      story_id: 1,
      author_id: 2
    }
  }
}
```
