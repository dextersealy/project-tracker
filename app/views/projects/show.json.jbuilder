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
