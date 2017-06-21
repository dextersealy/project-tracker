# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  password_digest :string           not null
#  session_token   :string
#  name            :string           not null
#  email           :string           not null
#  initials        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :password_digest, :name, :email, :initials, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates_uniqueness_of :email

  has_many :memberships, dependent: :destroy

  has_many :projects, through: :memberships

  has_many :ownerships, -> { owned }, class_name: 'Membership'
  has_many :owned_projects, through: :ownerships, source: :project

  attr_accessor :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user && user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

end
