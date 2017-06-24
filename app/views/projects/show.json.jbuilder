json.set! :project do
  json.partial! 'projects/project', project: @project
end

json.set! :stories do
  @project.stories.each do |story|
    json.set! story.id do
      json.partial! 'stories/story', story: story
    end
  end
end

json.set! :members do
  @project.members.each do |user|
    json.set! user.id do
      json.partial! 'users/user', user: user
    end
  end
end
