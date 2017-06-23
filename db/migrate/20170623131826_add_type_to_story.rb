class AddTypeToStory < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :type, :integer, null: false, default: 0
  end
end
