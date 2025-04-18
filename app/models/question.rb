class Question < ApplicationRecord
  include DisplayNameGenerator

  belongs_to :responder
  has_many :answers, dependent: :destroy
  has_one :knowledge, dependent: :destroy
  validates :title, presence: true
  validates :body, presence: true
  validates :token, presence: true
  validates :status, presence: true
  validates :email, presence: true, unless: :anonymous_submission

  enum :status, { open: 0, active: 1, closed: 2 }

  attr_accessor :anonymous_submission

  before_validation :generate_token, on: :create
  before_validation :clear_email_if_anonymous
  before_validation :set_display_name, on: :create

  def anonymous?
    email.blank?
  end

  def closed?
    status == "closed"
  end

  def self.find_by_token(token)
    find_by(token: token)
  end

  private

  def generate_token
    self.token = SecureRandom.hex(16) if token.blank?
  end

  def clear_email_if_anonymous
    self.email = nil if anonymous_submission == "1" || anonymous_submission == true
  end

  def set_display_name
    self.pseudonym = generate_display_name if pseudonym.blank?
  end
end
