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

  def owners
    self.members
  end

end
