class Answer < ApplicationRecord
  belongs_to :responder
  belongs_to :question
end
