class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :responder, optional: true
  validates :body, presence: true
  validates :question_id, presence: true

  before_create :check_permissions

  def to_html
    return "" if body.blank?

    options = {
      auto_ids: true,
      syntax_highlighter: nil,
      input: "GFM",
      hard_wrap: true
    }

    html = Kramdown::Document.new(body, options).to_html
    html.html_safe
  end

  def user_created?
    responder_id.nil?
  end

  private

  def check_permissions
    # Ensure that at least one answer is allowed
    return true if responder_id.present?

    # For user answers, check if question is expecting a response
    # Count existing user answers
    user_answers_count = question.answers.where(responder_id: nil).count

    # Check if there's a recent responder answer that permits a new user response
    last_answer = question.answers.order(created_at: :desc).first

    # Allow answer if:
    # 1. No user answers exist yet
    # 2. Last answer was from a responder (continuing the conversation)
    # 3. Question is not closed
    if user_answers_count == 0 ||
       (last_answer && last_answer.responder_id.present? && !question.closed?)
      return true
    end

    errors.add(:base, "You cannot add a new answer at this time")
    throw(:abort)
  end
end
