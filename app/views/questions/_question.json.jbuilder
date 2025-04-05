json.extract! question, :id, :title, :content, :status, :anonymous, :created_at, :updated_at
json.url question_url(question, format: :json)
