class AddDeletionFlagToResponder < ActiveRecord::Migration[8.0]
  def change
    add_column :responders, :deleted, :boolean
  end
end
