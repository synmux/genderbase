class WellKnownController < ApplicationController
  def index
    txt = <<~END
      # No listings for you, sweetie.
    END
    render plain: txt, content_type: "text/plain", layout: false
  end

  def webfinger
    # Check for required resource parameter
    unless params[:resource].present?
      render  json: { error: "Resource parameter is required" },
              status: :bad_request,
              content_type: "application/jrd+json",
              layout: false
      return
    end

    # Parse the resource parameter (acct:user@domain or other URI)
    resource = params[:resource]

    # Handle only acct: URIs for now
    unless resource.start_with?("acct:")
      render  json: { error: "Only acct: URIs are supported" },
              status: :not_found,
              content_type: "application/jrd+json",
              layout: false
      return
    end

    # Parse username and domain from acct URI
    _, identifier = resource.split(":", 2)
    username, domain = identifier.split("@", 2)

    # Verify domain matches our domain
    unless domain == request.host
      render  json: { error: "Domain does not match" },
              status: :not_found,
              content_type: "application/jrd+json",
              layout: false
      return
    end

    # Find the user (implement your user lookup logic here)
    # For now, we'll just handle a demo user
    unless username == "dave"
      render  json: { error: "User not found" },
              status: :not_found,
              content_type: "application/jrd+json",
              layout: false
      return
    end

    # Construct WebFinger response
    response = {
      subject: resource,
      aliases: [
        "https://#{request.host}",
        "https://dave.io"
      ],
      properties: {
        "http://schema.org/name": "Dave Williams",
        "http://schema.org/url": "https://dave.io"
      },
      links: [
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
    }

    render  json: response,
            content_type: "application/jrd+json; charset=utf-8",
            layout: false
  end

  def ai
    txt = <<~END
      # Allow all crawlers
      User-Agent: *
      Allow: *
      Allow: /
    END
    render plain: txt, content_type: "text/plain", layout: false
  end

  def ads
    txt = <<~END
      # No ads are used on this site.
    END
    render plain: txt, content_type: "text/plain", layout: false
  end

  def security
    txt = <<~END
      # Security information
      Acknowledgments: https://genderbase.com/security
      Canonical: https://genderbase.com/security.txt
      Contact: mailto:dave+genderbase-security@dave.io
      Encryption: https://keys.openpgp.org/vks/v1/by-fingerprint/D8DC6603D9C3515382A1C63C385FD3CEF5E5C6EC
      Expires: 2035-01-01T00:00:00.000Z
      Policy: https://genderbase.com/security
      Preferred-Languages: en
    END
    render plain: txt, content_type: "text/plain", layout: false
  end

  def humans
    txt = <<~END
      /* TEAM */
      Maintainer: Dave Williams
      Site: https://dave.io
      Twitter (deprecated): @syn
      Mastodon: @dave@basilisk.gallery
      Bluesky: @dave.io
      Threads: @daveio
      Nostr: npub1nfywvmkx4qfs2re3jyw4jh266akm2y45tvhda347uuaflw754jnsjj8fzu
      Location: London, UK

      /* THANKS */
      Just me, for now. Volunteers will be listed here if they choose to.

      /* SITE */
      Last update: 2025-03-05
      Standards: HTML5, CSS3, JavaScript ES6+
      Components: Stimulus, Tailwind
      Software: Ruby on Rails, PostgreSQL, Docker, Kubernetes, Cursor
    END
    render plain: txt, content_type: "text/plain", layout: false
  end

  def robots
    txt = <<~END
      User-agent: *
      Allow: /
      Disallow: /admin/
      Disallow: /api/
      Disallow: /assets/
      Disallow: /images/
      Disallow: /javascripts/
      Disallow: /stylesheets/
      Disallow: /vendor/
    END
    render plain: txt, content_type: "text/plain", layout: false
  end
end
