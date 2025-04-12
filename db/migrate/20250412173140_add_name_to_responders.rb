class AddNameToResponders < ActiveRecord::Migration[8.0]
  def change
    add_column :responders, :name, :string
  end
end
