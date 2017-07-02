# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  password_digest :string           not null
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

  has_many :sessions, dependent: :destroy

  has_many :memberships, dependent: :destroy
  has_many :projects, through: :memberships

  has_many :ownerships, -> { owned }, class_name: 'Membership'
  has_many :owned_projects, through: :ownerships, source: :project

  has_many :assignments,
    class_name: 'Story',
    foreign_key: :assignee_id

  attr_accessor :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user && user.is_password?(password) ? user : nil
  end

  def self.find_by_session_token(session_token)
    session = Session.includes(:user).find_by(session_token: session_token)
    session ? session.user : nil
  end

  def reset_session!
    @session = Session.create(user: self, session_token: Session.generate_token)
    @session.session_token
  end

  def end_session!(session_token)
    session = Session.find_by(session_token: session_token)
    session.destroy if session
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

end
