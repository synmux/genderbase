json.subject @resource

json.aliases [
  "https://genderbase.com",
  "https://basilisk.gallery/@syn",
  "https://basilisk.gallery/users/syn"
]

json.properties do
  json.set! "http://schema.org/name", "syn"
  json.set! "http://schema.org/url", "https://syn.horse"
end

json.links do
  json.array! [
    {
      rel: "http://webfinger.net/rel/avatar",
      type: "image/jpeg",
      href: "https://cdn.basilisk.gallery/accounts/avatars/109/728/719/988/995/619/original/81a50b1d22a5e2ce.jpg"
    },
    {
      rel: "self",
      type: "application/activity+json",
      href: "https://basilisk.gallery/users/syn"
    },
    {
      rel: "http://ostatus.org/schema/1.0/subscribe",
      template: "https://basilisk.gallery/authorize_interaction?uri={uri}"
    },
    {
      rel: "http://webfinger.net/rel/profile-page",
      type: "text/html",
      href: "https://basilisk.gallery/@syn"
    }
  ]
end
