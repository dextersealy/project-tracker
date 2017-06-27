module StoriesHelper
  def find_story(story_id)
    story = Story.includes(:project).find(story_id)
    raise ActiveRecord::RecordNotFound unless current_user.projects.include?(story.project)
    story
  end
end
