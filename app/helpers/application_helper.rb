require "kramdown"

module ApplicationHelper
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

  def render_markdown(text)
    return "" if text.blank?

    options = {
      auto_ids: true,
      syntax_highlighter: nil,
      input: "GFM",
      hard_wrap: true
    }

    html = Kramdown::Document.new(text, options).to_html
    html.html_safe
  end
end
