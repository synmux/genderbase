class Question < ApplicationRecord
  belongs_to :responder
  has_many :answers, dependent: :destroy
  has_one :knowledge, dependent: :destroy
  validates :title, presence: true
  validates :body, presence: true
  validates :token, presence: true
  validates :status, presence: true
  validates :email, presence: true

  # enum status: { draft: 0, published: 1, archived: 2 }

  def anonymous?
    email.blank?
  end
end
