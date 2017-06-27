class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.integer :story_id, null: false
      t.integer :author_id, null: false
      t.string :title, null: false
      t.boolean :done, null: false, default: false
      t.timestamps
    end
  end
end
