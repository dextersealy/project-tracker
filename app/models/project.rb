# == Schema Information
#
# Table name: projects
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Project < ApplicationRecord
  validates :title, presence: true

  has_many :memberships, dependent: :destroy

  has_many :members,
    through: :memberships,
    source: :user

  has_many :ownerships, -> { owned }, class_name: 'Membership'
  has_many :owners, through: :ownerships, source: :user

  has_many :stories, dependent: :destroy

  def owner?(user)
    role(user) == "owner"
  end

  def member?(user)
    %w(owner member).include?(role(user))
  end

  def role(user)
    membership = memberships.find_by(user: user)
    membership ? membership.role : nil
  end
end
