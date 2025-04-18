class Knowledge < ApplicationRecord
  belongs_to :question
  belongs_to :responder
  validates :title, presence: true
  validates :body, presence: true
  validates :slug, uniqueness: true, allow_nil: true
  validates :category, presence: true

  enum :category, { general: 0, pronouns: 1, identity: 2, terminology: 3, resources: 4, other: 5 }

  before_validation :generate_slug

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

  # Creates a knowledge base entry from a closed question
  def self.from_question(question, responder, params = {})
    return nil unless question.closed?

    # Create a default title from the question title
    default_title = question.title

    # Create a default body that includes the question and answers
    default_body = "## Original Question\n\n#{question.body}\n\n"

    # Add answers to the body
    question.answers.order(created_at: :asc).each_with_index do |answer, index|
      if answer.responder_id.nil?
        default_body += "\n\n### Follow-up Question #{index + 1}\n\n#{answer.body}"
      else
        default_body += "\n\n### Response #{index + 1}\n\n#{answer.body}"
      end
    end

    # Create the knowledge entry with defaults that can be overridden
    create({
      title: default_title,
      body: default_body,
      description: question.body.truncate(250),
      category: :general,
      question: question,
      responder: responder
    }.merge(params))
  end

  private

  def generate_slug
    return if slug.present?
    self.slug = title.parameterize if title.present?
  end
end
