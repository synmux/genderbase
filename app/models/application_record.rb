class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # Prevent mass assignment vulnerabilities
  # In modern Rails, mass assignment protection is handled through Strong Parameters in controllers
  # This just enables optimistic locking as an additional security measure
  self.lock_optimistically = true

  # We don't need to explicitly include ForbiddenAttributesProtection in Rails 8
  # as it's already included by default
end
