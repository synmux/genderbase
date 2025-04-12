class Responder < ApplicationRecord
  has_many :questions, dependent: :destroy

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable,
          :zxcvbnable, :argon2

  def weak_words
    words = [ "genderbase" ]
    words << self.name if self.name.present?
    words
  end
end
