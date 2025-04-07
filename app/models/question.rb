class Question < ApplicationRecord
  has_many :answers, dependent: :destroy
  has_one :article, dependent: :destroy
  belongs_to :responder, optional: true
end
