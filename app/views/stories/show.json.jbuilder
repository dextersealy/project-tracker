json.partial! 'stories/story', story: @story
json.set! :tasks do
  @story.tasks.each do |task|
    json.set! task.id do
      json.partial! 'tasks/task', task: task
    end
  end
end
