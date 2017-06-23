class CreateStories < ActiveRecord::Migration[5.1]
  def change
    create_table :stories do |t|
      t.integer :project_id, null: false
      t.integer :author_id, null: false
      t.integer :owner_id, null: false
      t.string :title, null: false
      t.text :description
      t.integer :state, null: false, default: 0
      t.integer :points, null: false, default: 0
      t.integer :priority, default: 0
      t.timestamps
    end

    add_index :stories, :project_id
    add_index :stories, :author_id
    add_index :stories, :priority
  end
end
