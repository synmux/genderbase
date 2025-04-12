module ApplicationHelper
  def markdown_to_html(text)
    return "" if text.blank?
    Kramdown::Document.new(text).to_html.html_safe
  end

  def canonical_url
    request.original_url
  end

  def hotwire_livereload_value
    if Rails.env.production?
      "reload"
    else
      ""
    end
  end
end
