class Responder < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :knowledges, dependent: :destroy
  has_many :terminologies, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable,
          :zxcvbnable, :argon2

  def weak_words
    [ "genderbase" ]
  end

  def name
    pseudonym.presence || email.split("@").first
  end

  def username
    name
  end
end
