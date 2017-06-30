# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170630111940) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "memberships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "project_id", null: false
    t.string "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "project_id"], name: "index_memberships_on_user_id_and_project_id", unique: true
  end

  create_table "projects", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sessions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "session_token"], name: "index_sessions_on_user_id_and_session_token", unique: true
  end

  create_table "stories", force: :cascade do |t|
    t.integer "project_id", null: false
    t.integer "author_id", null: false
    t.integer "owner_id", null: false
    t.string "title", null: false
    t.text "description"
    t.integer "state", default: 0, null: false
    t.integer "points", default: 0, null: false
    t.integer "priority", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "kind", default: 0, null: false
    t.integer "assignee_id"
    t.index ["assignee_id"], name: "index_stories_on_assignee_id"
    t.index ["author_id"], name: "index_stories_on_author_id"
    t.index ["priority"], name: "index_stories_on_priority"
    t.index ["project_id"], name: "index_stories_on_project_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "story_id", null: false
    t.integer "author_id", null: false
    t.string "title", null: false
    t.boolean "done", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "password_digest", null: false
    t.string "name", null: false
    t.string "email", null: false
    t.string "initials", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
