class Knowledge < ApplicationRecord
  belongs_to :question
  belongs_to :responder
  validates :title, presence: true
  validates :body, presence: true
  validates :slug, uniqueness: true
  validates :category, presence: true

  # enum category: { general: 0, pronouns: 1, identity: 2, other: 3 }

  private

  def generate_slug
    return if slug.present?
    self.slug = title.parameterize if title.present?
  end
end
