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

if !Project.find_by(title: "My Project")
  project = Project.create!({ title: "My Project" });
  Membership.create!({
    user: user,
    project: project,
    role: 'owner'
  })
end
