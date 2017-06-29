class AddAssigneeToStory < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :assignee_id, :integer
    add_index :stories, :assignee_id
  end
end
