class Article < ApplicationRecord
  belongs_to :question
  has_one :responder, through: :question
end
