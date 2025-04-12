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
end
