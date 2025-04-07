class Answer < ApplicationRecord
  belongs_to :question
  has_one :responder, through: :question
end
