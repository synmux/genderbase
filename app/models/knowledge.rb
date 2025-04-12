class Knowledge < ApplicationRecord
  belongs_to :question
  belongs_to :responder
  validates :title, presence: true
  validates :body, presence: true
  validates :slug, uniqueness: true
  validates :category, presence: true

  private

  def generate_slug
    return if slug.present?
    self.slug = title.parameterize if title.present?
  end
end
