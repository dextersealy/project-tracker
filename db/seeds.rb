# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.find_or_create_by(email: 'dsealy@alum.mit.edu') do |user|
  user.name =  "Guest User"
  user.initials = 'GU',
  user.password = 'password'
end

user2 = User.find_or_create_by(email: 'dextersealy@gmail.com') do |user|
  user.name =  "Dexter Sealy"
  user.initials = 'DS',
  user.password = 'password'
end

project = Project.find_or_create_by(title: "Demo Project")
Membership.find_or_create_by({user: user, project: project, role: 'owner' })
Membership.find_or_create_by({user: user2, project: project, role: 'member' })

stories = [
  { state: :accepted,
    title: "Phase 1: New user can sign up",
    description: <<~HEREDOC },
    Sign Up button is on home page. Sign Up page enforces password guidelines
    and prevents duplicate username or email.
    HEREDOC
  { state: :accepted,
    title: "Phase 1: User can sign in",
    description: <<~HEREDOC },
    Sign in button is on the home page. Sign Up page validates account
    information.
    HEREDOC
  { state: :accepted,
    title: "Phase 1: User remains signed in",
    description: <<~HEREDOC },
    The user remains signed in when the page is refreshed.
    HEREDOC

  { state: :accepted,
    title: "Phase 2: User can create/rename projects",
    tasks: [
      {title: "Style the project dashboard", done: true},
      {title: "After create, open new project immediately", done: true}
    ],
    description: <<~HEREDOC },
    HEREDOC
  { state: :delivered,
    title: "Phase 3: User can create stories",
    description: <<~HEREDOC },
    HEREDOC
  { state: :delivered,
    title: "Phase 3: User can edit stories",
    description: <<~HEREDOC },
    HEREDOC
  { state: :rejected,
    title: "Phase 3: User can delete stories",
    tasks: [{title: "Only owner can delete story"}],
    description: <<~HEREDOC },
    HEREDOC
  { state: :started, kind: :release,
    title: "Demo day!",
    description: <<~HEREDOC },
    HEREDOC
  { state: :finished,
    title: "Phase 4: User can move stories through workflow",
    description: <<~HEREDOC },
    HEREDOC
  { state: :started,
    title: "Phase 4: Only story owner can Accept or Reject",
    description: <<~HEREDOC },
    HEREDOC
  { state: :unstarted,
    title: "Phase 4: User can toggle hiding/showing accepted stories",
    description: <<~HEREDOC },
    HEREDOC
  { state: :accepted,
    title: "Phase 5: User can create and edit tasks",
    description: <<~HEREDOC },
    HEREDOC
  { state: :accepted,
    title: "Phase 5: User can change task status",
    description: <<~HEREDOC },
    HEREDOC
  { state: :unstarted, kind: :bug,
    title: "Editing a task discards pending edits to other story attributes",
    description: <<~HEREDOC },
    HEREDOC
  { state: :unstarted,
    title: "Phase 6: User can comment on story",
    description: <<~HEREDOC },
    HEREDOC
  { state: :unstarted,
    title: "Phase 6: User can edit own comments",
    description: <<~HEREDOC },
    HEREDOC
  { state: :unstarted,
    title: "Phase 6: User who rejects story is prompted to enter a comment",
    description: <<~HEREDOC },
    HEREDOC
  { state: :delivered,
    title: "Phase 7: User can prioritize stories via drag & drop",
    description: <<~HEREDOC },
    HEREDOC
  { state: :started, kind: :chore,
    title: "Use callbacks to pass state changes up the component hierarchy.",
    description: <<~HEREDOC },
    HEREDOC

]

Story.transaction do
  priority = Story.maximum(:priority)
  stories.each do |story|
    priority += 1
    assignee = story[:assignee] || user
    storyObj = Story.find_or_create_by({ project: project, title: story[:title] })
    storyObj.update!({
      author: user, owner: user, assignee_id: assignee.id,
      state: story[:state], kind: story[:kind] || :feature, priority: priority,
      description: story[:description].gsub(/\s+/, " ").strip,
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
