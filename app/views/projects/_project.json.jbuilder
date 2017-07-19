json.extract! project, :id, :title
json.role project.memberships.where(user: current_user).pluck(:role).first
