# == Schema Information
#
# Table name: tasks
#
#  id         :integer          not null, primary key
#  story_id   :integer          not null
#  author_id  :integer          not null
#  title      :string           not null
#  done       :boolean          default("false"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Task < ApplicationRecord
  validates :story, :author, :title, presence: true
  validates :done, inclusion: { in: [true, false] }

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id

  belongs_to :story

  has_one :project,
    through: :story
end
