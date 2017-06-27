@tasks.each do |task|
  json.set! task.id do
    json.partial! 'tasks/task', task: task
  end
end
