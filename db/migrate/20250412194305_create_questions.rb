class CreateQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :questions do |t|
      t.string :title
      t.text :body
      t.string :token
      t.integer :status
      t.string :email
      t.string :pseudonym
      t.references :responder, null: false, foreign_key: true

      t.timestamps
    end
  end
end
