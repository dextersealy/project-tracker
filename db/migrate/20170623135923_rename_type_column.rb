class RenameTypeColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :stories, :type, :kind
  end
end
