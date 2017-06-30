# == Schema Information
#
# Table name: sessions
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  session_token :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Session < ApplicationRecord
  validates :user, presence: true

  belongs_to :user

  def self.generate_token
    SecureRandom::urlsafe_base64(16)
  end
end
