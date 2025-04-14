class Responder < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :knowledges, dependent: :destroy
  has_many :terminologies, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable,
          :zxcvbnable, :argon2, :trackable

  validates :pseudonym, uniqueness: true, allow_nil: true

  def weak_words
    [ "genderbase" ]
  end

  def name
    pseudonym.presence || email
  end

  def username
    name
  end

  def self.generate_pseudonym
    adjectives = %w[
      Brave Clever Quick Calm Gentle Bold Wise Happy Bright Shy Fierce Loyal Noble Proud Silly Quiet Jolly Kind Lucky Merry Neat Plucky Sassy Zesty Eager Faithful Gracious Honest Keen Lively Patient Sincere Witty
      Cheery Daring Diligent Energetic Friendly Generous Helpful Humble Inventive Joyful Modest Optimistic Playful Reliable Resourceful Spirited Steady Thoughtful Trusty Upbeat Valiant Zealous
      Adventurous Affectionate Alert Ambitious Amused Assertive Attentive Balanced Benevolent Blissful Bubbly Capable Careful Caring Charismatic Charming Cheerful Composed Confident Considerate Cooperative Courageous Courteous Creative Decisive Dependable Determined Devoted Dynamic Empathetic Enthusiastic Excitable Expressive Fair Flexible Focused Forgiving Fortunate Free Fun Gallant Gentlehearted Giving Good-natured Hardworking Harmonious Hopeful Imaginative Independent Industrious Innovative Inspiring Intelligent Intuitive Jovial Just Kindhearted Level-headed Lighthearted Loving Loyal Mindful Motivated Objective Open-minded Orderly Outgoing Passionate Patient Peaceful Perceptive Persistent Persuasive Pleasant Polite Positive Practical Proactive Protective Prudent Rational Realistic Reflective Relaxed Reliable Remarkable Respectful Responsible Romantic Satisfied Secure Selfless Sensible Sensitive Serene Skillful Sociable Steadfast Strategic Strong Supportive Sympathetic Systematic Tactful Thorough Thoughtful Tolerant Trustworthy Unbiased Understanding Unique Versatile Vibrant Vigorous Warmhearted Welcoming Willing Youthful Zealful
    ]
    animals = %w[
      Lion Fox Owl Bear Wolf Cat Dog Deer Tiger Rabbit Mouse Eagle Hawk Falcon Otter Badger Beaver Squirrel Horse Sheep Goat Cow Pig Duck Goose Swan Frog Toad Turtle Lizard Snake Bat Crow Dove Finch Robin Whale Dolphin Seal Crab Lobster Shrimp Ant Bee Beetle Butterfly Moth Spider
      Camel Donkey Elk Ferret Giraffe Hedgehog Kangaroo Lemur Leopard Lynx Mole Moose Opossum Panda Parrot Peacock Pelican Penguin Porcupine Quail Raccoon Rat Reindeer Rhinoceros Skunk Sloth Stork Turkey Vulture Weasel Yak Zebra
      Alligator Alpaca Armadillo Baboon Barracuda Bison Bluejay Buffalo Butterfly Caribou Carp Chameleon Cheetah Chimpanzee Chipmunk Cobra Coyote Cuckoo Dingo Dragonfly Duckling Flamingo Gazelle Gerbil Goldfish Goose Grasshopper Grouse Guppy Hamster Heron Hippopotamus Hummingbird Hyena Ibex Jackal Jaguar Jellyfish Kingfisher Koala Ladybug Lemur Leopard Llama Lobster Magpie Manatee Mandrill Mink Minnow Mole Narwhal Newt Nightingale Ocelot Octopus Okapi Orangutan Oryx Ostrich Otter Ox Partridge Peafowl Pelican Platypus Plover Puffin Puma Quokka Quoll Ram Raven Redstart Reindeer Rooster Salamander Sardine Seahorse Serval Shrew Shrike Skua Snail Sparrow Squirrel Starling Stilt Tapir Termite Thrush Tortoise Trout Vicuna Viper Wallaby Walrus Warbler Warthog Wasp Woodpecker Worm Wren Yak Zebu
    ]
    loop do
      pseudonym = "#{adjectives.sample} #{animals.sample}"
      break pseudonym unless Responder.exists?(pseudonym: pseudonym)
    end
  end
end
