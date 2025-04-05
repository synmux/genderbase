json.extract! article, :id, :title, :description, :content, :category, :author, :slug, :created_at, :updated_at
json.url article_url(article, format: :json)
