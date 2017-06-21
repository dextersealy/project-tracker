class CreateMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :memberships do |t|
      t.integer :user_id, null: false
      t.integer :project_id, null: false
      t.string :role, null: false
      t.timestamps
    end

    add_index :memberships, [:user_id, :project_id], unique: true
  end
end
