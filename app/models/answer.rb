class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :responder
  validates :body, presence: true
  validates :question_id, presence: true
  validates :responder_id, presence: true

  def to_html
    body
  end
end
