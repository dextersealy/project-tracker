# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

guest1 = User.find_or_create_by(email: 'guest1@dsealy.com') do |user|
  user.name =  "Guest One"
  user.initials = 'GU1'
  user.password = 'password'
end

guest2 = User.find_or_create_by(email: 'guest2@dsealy.com') do |user|
  user.name =  "Guest Two"
  user.initials = 'GU2'
  user.password = 'password'
end

demo_project_title = "Demo Project (Start Here)"
project = Project.find_or_create_by!(title: demo_project_title)
project.stories.destroy_all

Membership.find_or_create_by!({user: guest1, project: project, role: 'member' })
Membership.find_or_create_by!({user: guest2, project: project, role: 'owner' })

stories = [
  { state: :started,
    title: "Current iteration/backlog shows all work in progress" },
  { state: :started,
    title: "** Double-click to expand a story",
    description: "Stories can have long, detailed descriptions, and sub-tasks",
    tasks: [
      {title: "A completed task", done: true},
      {title: "An incomplete task", done: false}
    ],
  },
  { state: :started, assignee: guest1,
    title: '"My Work" shows your assigned stories' },
  { state: :started, assignee: guest1,
    title: "** Click Finish to move a story to the next step in the workflow" },
  { state: :finished, assignee: guest1,
    title: "** Click Deliver to submit a finished story for approval" },
  { state: :delivered, owner: guest1,
    title: "When a story is Delivered, the owner (you in this case) Accepts or Rejects it" },
  { state: :rejected, kind: :chore,
    title: "Rejected stories are flagged for Restart" },

  { state: :unstarted, kind: :release,
    title: "The Icebox holds unscheduled stories" },
  { state: :unstarted,
    title: "There are four kinds: Feature, Bug, Chore and Release" },
  { state: :unstarted,
    title: "**Click Start to claim a story", },
  { state: :unstarted,
    title: "**Click + or 'Add Story' to create a new, unscheduled story" },
  { state: :unstarted,
    title: "**Drag and drop stories up/down in the Icebox or Current/backlog to prioritize them" },
  { state: :unstarted,
    title: "**Click 'Done' on the far left to show/hide completed tasks"},

  { state: :accepted,
    title: "Accepted stories move to Done",
    tasks: [
      {title: "Design sign up page", done: true},
      {title: "Build user model", done: false},
      {title: "Build session model", done: false},
    ],
  },
  { state: :accepted,
    title: "**To reopen one, expand it and change the state" },
]

Story.transaction do
  priority = Story.maximum(:priority)
  stories.each do |story|
    priority += 1
    assignee = story[:assignee] || guest2
    owner = story[:owner] || guest2
    description = story[:description] || ''
    storyObj = Story.find_or_create_by({ project: project, title: story[:title] })
    storyObj.update!({
      author: owner, owner: owner, assignee_id: assignee.id,
      state: story[:state], kind: story[:kind] || :feature, priority: priority,
      description: description.gsub(/\s+/, " ").strip,
    })

    if story[:tasks]
      story[:tasks].each do |task|
        taskObj = Task.find_or_create_by({
          story: storyObj, author: storyObj.author, title: task[:title]
          })
        taskObj.update!(done: true) if task[:done]
      end
    end
  end
end
