json.extract! knowledge, :id, :title, :body, :description, :category, :slug, :question_id, :responder_id, :created_at, :updated_at
json.url knowledge_url(knowledge, format: :json)
