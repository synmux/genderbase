class CreateArticles < ActiveRecord::Migration[8.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.references :question, null: false, foreign_key: true
      t.text :description
      t.text :content
      t.string :category
      t.string :author
      t.string :slug

      t.timestamps
    end
  end
end
