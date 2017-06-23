@stories.each do |story|
  json.set! story.id do
    json.partial! 'stories/story', story: story
  end
end
