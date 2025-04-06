json.subject @resource

json.aliases [ "https://genderbase.com", "https://dave.io" ]

json.properties do
  json.set! "http://schema.org/name", "Dave Williams"
  json.set! "http://schema.org/url", "https://dave.io"
end

json.links do
  json.array! [
    {
      rel: "http://webfinger.net/rel/avatar",
      type: "image/jpeg",
      href: "https://dave.io/assets/self-2-DqTiiwBm.jpg"
    },
    {
      rel: "http://webfinger.net/rel/profile-page",
      type: "text/html",
      href: "https://basilisk.gallery/@dave"
    }
  ]
end
