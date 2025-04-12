class Article < ApplicationRecord
  belongs_to :question
  has_one :responder, through: :question

  validates :title, presence: true
  validates :content, presence: true
  validates :slug, uniqueness: true, allow_blank: true

  before_save :generate_slug

  def to_html
    Kramdown::Document.new(content || "").to_html.html_safe
  end

  def description_html
    return nil if description.blank?
    Kramdown::Document.new(description || "").to_html.html_safe
  end

  private

  def generate_slug
    return if slug.present?
    self.slug = title.parameterize if title.present?
  end
end
