class Terminology < ApplicationRecord
  belongs_to :responder
  validates :term, presence: true
  validates :definition, presence: true
  validates :info, presence: true
  validates :responder_id, presence: true
end
