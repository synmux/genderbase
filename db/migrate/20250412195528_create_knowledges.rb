class CreateKnowledges < ActiveRecord::Migration[8.0]
  def change
    create_table :knowledges do |t|
      t.string :title
      t.text :body
      t.text :description
      t.integer :category
      t.string :slug
      t.references :question, null: false, foreign_key: true
      t.references :responder, null: false, foreign_key: true

      t.timestamps
    end
  end
end
