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

project = Project.find_by(title: "Demo Project")
if !project
  project = Project.create!({ title: "Demo Project" });
  Membership.create!({
    user: user,
    project: project,
    role: 'owner'
  })
end

stories = [
  { title: "New user can sign up",
    description: <<~HEREDOC },
    Sign Up button is on home page. Sign Up page enforces password guidelines
    and prevents duplicate username or email.
    HEREDOC
  { title: "User can sign in",
    description: <<~HEREDOC },
    Sign in button is on the home page. Sign Up page validates account
    information.
    HEREDOC
  { title: "User remains signed in",
    description: <<~HEREDOC },
    The user remains signed in when the page is refreshed.
    HEREDOC
]

stories.each do |story|
  next if Story.find_by({ project: project, title: story[:title] })
  Story.create!({
    project: project, author: user, owner: user, title: story[:title],
    description: story[:description].gsub(/\s+/, " ")
  })
end
