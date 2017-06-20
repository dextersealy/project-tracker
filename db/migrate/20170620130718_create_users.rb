class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :password_digest, null: false
      t.string :session_token
      t.string :name, null: false
      t.string :email, null: false
      t.string :initials, null: false
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
