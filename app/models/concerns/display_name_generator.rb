module DisplayNameGenerator
  extend ActiveSupport::Concern

  ADJECTIVES = [
    "Admiring", "Adoring", "Affectionate", "Agile", "Amazing", "Ambitious", "Amused", "Artistic", "Astute", "Attentive",
    "Balanced", "Benevolent", "Bold", "Brave", "Bright", "Brilliant", "Calm", "Capable", "Careful", "Caring",
    "Charming", "Cheerful", "Clever", "Collaborative", "Colorful", "Compassionate", "Confident", "Conscientious", "Considerate", "Contemplative",
    "Cooperative", "Courageous", "Creative", "Curious", "Daring", "Dedicated", "Deliberate", "Delightful", "Determined", "Diligent",
    "Diplomatic", "Discerning", "Discreet", "Dynamic", "Eager", "Earnest", "Effective", "Efficient", "Eloquent", "Empathetic",
    "Encouraging", "Energetic", "Engaging", "Enthusiastic", "Ethical", "Excellent", "Excited", "Extraordinary", "Fair", "Faithful",
    "Fancy", "Fearless", "Focused", "Forgiving", "Friendly", "Fulfilled", "Gallant", "Generous", "Gentle", "Genuine",
    "Giving", "Graceful", "Gracious", "Grateful", "Harmonious", "Helpful", "Heroic", "Honest", "Honorable", "Hopeful",
    "Humble", "Humorous", "Imaginative", "Impressive", "Independent", "Inquisitive", "Insightful", "Inspiring", "Intelligent", "Intuitive",
    "Inventive", "Joyful", "Judicious", "Kind", "Knowledgeable", "Learned", "Likeable", "Logical", "Loving", "Loyal",
    "Magnanimous", "Majestic", "Masterful", "Meditative", "Merciful", "Methodical", "Mindful", "Modest", "Motivated", "Natural",
    "Neat", "Noble", "Nurturing", "Observant", "Open", "Optimistic", "Orderly", "Organized", "Original", "Passionate",
    "Patient", "Peaceful", "Perceptive", "Persevering", "Persistent", "Playful", "Pleasant", "Positive", "Practical", "Precious",
    "Precise", "Principled", "Profound", "Protective", "Proud", "Punctual", "Quiet", "Rational", "Reasonable", "Reflective",
    "Relaxed", "Reliable", "Resourceful", "Respectful", "Responsible", "Responsive", "Satisfied", "Scholarly", "Scientific", "Searching",
    "Selfless", "Sensible", "Sensitive", "Serene", "Sharing", "Sincere", "Smart", "Smiling", "Sociable", "Spiritual",
    "Splendid", "Stellar", "Stoic", "Strong", "Studious", "Successful", "Supportive", "Sweet", "Sympathetic", "Tactful",
    "Talented", "Tenacious", "Thankful", "Thorough", "Thoughtful", "Thrifty", "Tidy", "Tolerant", "Tranquil", "Trusting",
    "Trustworthy", "Understanding", "Unique", "Valuable", "Versatile", "Vibrant", "Vigilant", "Virtuous", "Visionary", "Vital",
    "Vivacious", "Warm", "Watchful", "Welcoming", "Wholesome", "Willing", "Wise", "Witty", "Wonderful", "Zestful"
  ]

  ANIMALS = [
    "Albatross", "Alligator", "Alpaca", "Antelope", "Armadillo", "Badger", "Bat", "Bear", "Beaver", "Bee",
    "Beetle", "Bison", "Bluebird", "Boar", "Buffalo", "Butterfly", "Camel", "Canary", "Cardinal", "Caribou",
    "Cat", "Cheetah", "Chicken", "Chimpanzee", "Chipmunk", "Cobra", "Coyote", "Crab", "Crane", "Crow",
    "Deer", "Dingo", "Dolphin", "Dove", "Dragon", "Duck", "Eagle", "Echidna", "Eel", "Elephant",
    "Elk", "Emu", "Falcon", "Ferret", "Finch", "Firefly", "Fish", "Flamingo", "Fox", "Frog",
    "Gazelle", "Gecko", "Gerbil", "Giraffe", "Goat", "Goldfish", "Goose", "Gorilla", "Grasshopper", "Groundhog",
    "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Hippo", "Horse", "Hummingbird", "Hyena", "Ibex",
    "Iguana", "Impala", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Kiwi", "Koala",
    "Kookaburra", "Lemur", "Leopard", "Lion", "Lizard", "Llama", "Lobster", "Lynx", "Macaw", "Magpie",
    "Manatee", "Mandrill", "Marten", "Meerkat", "Mink", "Mole", "Mongoose", "Monkey", "Moose", "Mouse",
    "Narwhal", "Newt", "Nightingale", "Numbat", "Octopus", "Opossum", "Orangutan", "Oryx", "Ostrich", "Otter",
    "Owl", "Oyster", "Panda", "Panther", "Parrot", "Peacock", "Pelican", "Penguin", "Pheasant", "Phoenix",
    "Pig", "Pigeon", "Platypus", "Porcupine", "Porpoise", "Quail", "Quokka", "Rabbit", "Raccoon", "Ram",
    "Raven", "Reindeer", "Rhinoceros", "Robin", "Salamander", "Salmon", "Scorpion", "Seagull", "Seahorse", "Seal",
    "Sheep", "Shrimp", "Skunk", "Sloth", "Snail", "Snake", "Sparrow", "Spider", "Squirrel", "Starfish",
    "Stork", "Swan", "Tapir", "Thrush", "Tiger", "Toad", "Tortoise", "Toucan", "Turkey", "Turtle",
    "Unicorn", "Viper", "Vulture", "Walrus", "Weasel", "Whale", "Wolf", "Wolverine", "Wombat", "Woodpecker",
    "Wren", "Yak", "Zebra", "Zebu", "Zonkey", "Zorse"
  ]

  def generate_display_name
    "#{ADJECTIVES.sample} #{ANIMALS.sample}"
  end
end
