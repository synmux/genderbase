class CreateTerminologies < ActiveRecord::Migration[8.0]
  def change
    create_table :terminologies do |t|
      t.string :term
      t.text :definition
      t.text :info
      t.references :responder, null: false, foreign_key: true

      t.timestamps
    end
  end
end
