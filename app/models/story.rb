# == Schema Information
#
# Table name: stories
#
#  id          :integer          not null, primary key
#  project_id  :integer          not null
#  author_id   :integer          not null
#  owner_id    :integer          not null
#  title       :string           not null
#  description :text
#  state       :integer          default("0"), not null
#  points      :integer          default("0"), not null
#  priority    :integer          default("0")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  kind        :integer          default("0"), not null
#  assignee_id :integer
#

class Story < ApplicationRecord
  enum kind: [:feature, :bug, :chore, :release]
  enum state: [:unstarted, :started, :finished, :delivered, :accepted, :rejected]

  validates :project, :author, :owner, :title, presence: true
  validates :state, presence: true, inclusion: { in: states.keys }
  validates :points, presence: true, inclusion: { in: [0, 1, 2, 3] }
  validates :kind, presence: true, inclusion: { in: kinds.keys }

  belongs_to :project

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id

  belongs_to :owner,
    class_name: 'User',
    foreign_key: :owner_id

  # belongs_to :assignee,
  #   class_name: 'User',
  #   foreign_key: :assignee_id

  has_many :tasks
end
