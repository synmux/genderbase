module ApplicationHelper
  def canonical_url
    path = url_for(only_path: false, trailing_slash: false)
    if path.include?("/index")
      path.gsub("/index", "/")
    else
      path
    end
  end
end
