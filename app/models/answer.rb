class Answer < ApplicationRecord
  belongs_to :question
  has_one :responder, through: :question

  validates :content, presence: true
  validates :question_id, presence: true

  def to_html
    Kramdown::Document.new(content || "").to_html.html_safe
  end
end
