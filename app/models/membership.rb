# == Schema Information
#
# Table name: memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  project_id :integer          not null
#  role       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Membership < ApplicationRecord
  validates :user, :project, presence: true
  validates :role, inclusion: { in: %w(owner member viewer),
    message: "%{value} is not a valid role"
  }

  belongs_to :user
  belongs_to :project

  scope :owned, -> { where(role: 'owner') }
end
