@projects.each do |project|
  json.set! project.id do
    json.partial! 'projects/project', project: project
  end
end
