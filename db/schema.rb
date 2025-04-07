# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_06_212817) do
  create_table "answers", force: :cascade do |t|
    t.text "content"
    t.integer "question_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index [ "question_id" ], name: "index_answers_on_question_id"
  end

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.integer "question_id", null: false
    t.text "description"
    t.text "content"
    t.string "category"
    t.string "author"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index [ "question_id" ], name: "index_articles_on_question_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "status"
    t.boolean "anonymous"
    t.integer "responder_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index [ "responder_id" ], name: "index_questions_on_responder_id"
  end

  create_table "responders", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "questions_id"
    t.index [ "email" ], name: "index_responders_on_email", unique: true
    t.index [ "questions_id" ], name: "index_responders_on_questions_id"
    t.index [ "reset_password_token" ], name: "index_responders_on_reset_password_token", unique: true
  end

  add_foreign_key "answers", "questions"
  add_foreign_key "articles", "questions"
  add_foreign_key "questions", "responders"
  add_foreign_key "responders", "questions", column: "questions_id"
end
