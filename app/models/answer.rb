class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :responder
  validates :content, presence: true
  validates :question_id, presence: true
  validates :responder_id, presence: true
end
