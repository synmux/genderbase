class CreateQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :questions do |t|
      t.string :title
      t.text :content
      t.string :status
      t.boolean :anonymous

      t.timestamps
    end
  end
end
