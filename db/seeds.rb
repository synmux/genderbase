# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create responders if they don't exist
puts "Creating responders..."
responder1 = Responder.find_or_create_by(email: "expert1@genderbase.com") do |r|
  r.password = "Password123!"
  r.name = "Dr. Jamie Taylor"
end

responder2 = Responder.find_or_create_by(email: "expert2@genderbase.com") do |r|
  r.password = "Password123!"
  r.name = "Dr. Sam Chen"
end

# Create questions
puts "Creating questions..."
question1 = Question.find_or_create_by(title: "How to respectfully ask about pronouns?") do |q|
  q.content = "It's becoming increasingly common to share pronouns in many settings, but I'm still unsure about the most respectful way to ask someone about their pronouns if they haven't already shared them. When is it appropriate to ask, and how should I phrase the question?"
  q.status = "answered"
  q.anonymous = false
  q.email = "user1@example.com"
  q.responder = responder1
end

question2 = Question.find_or_create_by(title: "Supporting a transgender friend through their transition") do |q|
  q.content = "My close friend has recently come out as transgender and is beginning their transition. I want to be as supportive as possible but I'm worried about saying the wrong thing. What are some practical ways I can support them during this time?"
  q.status = "pending"
  q.anonymous = false
  q.email = "user2@example.com"
end

question3 = Question.find_or_create_by(title: "Gender-neutral language for professional emails") do |q|
  q.content = "I'm updating our company's email templates and communication guidelines. What are best practices for ensuring our language is gender-inclusive, especially when addressing groups or individuals whose gender we don't know?"
  q.status = "in_progress"
  q.anonymous = false
  q.email = "user3@example.com"
  q.responder = responder2
end

question4 = Question.find_or_create_by(title: "What's the difference between gender identity and gender expression?") do |q|
  q.content = "I'm trying to educate myself more about gender topics, but I often see the terms 'gender identity' and 'gender expression' used, and I'm not entirely clear on the distinction between them. Could someone explain the difference?"
  q.status = "answered"
  q.anonymous = false
  q.email = "user4@example.com"
  q.responder = responder2
end

question5 = Question.find_or_create_by(title: "How can I make my classroom more gender-inclusive?") do |q|
  q.content = "I'm a high school teacher looking to create a more inclusive environment for students of all gender identities. What are some practical steps I can take in my classroom to ensure all students feel respected and supported?"
  q.status = "answered"
  q.anonymous = false
  q.email = "teacher@example.com"
  q.responder = responder1
end

# Create answers
puts "Creating answers..."
Answer.find_or_create_by(question: question1) do |a|
  a.content = <<~MARKDOWN
  Great question! The most straightforward approach is to offer your own pronouns first, which often encourages reciprocation without directly asking. For example, "Hi, I'm Alex and I use they/them pronouns." If you do need to ask directly, you can say, "May I ask what pronouns you use?" or "What pronouns should I use when referring to you?"

  It's best to ask in a private or one-on-one setting rather than in a group where someone might feel put on the spot. Remember that pronoun sharing should always be optional, not mandatory. If someone seems uncomfortable with the question, don't press the issue.

  Normalizing pronoun sharing in your everyday interactions (like in email signatures or introductions) helps create an environment where everyone feels more comfortable discussing pronouns openly.
  MARKDOWN
end

Answer.find_or_create_by(question: question4) do |a|
  a.content = <<~MARKDOWN
  Gender identity and gender expression are related but distinct aspects of gender:

  **Gender identity** refers to a person's internal, deeply felt sense of their own gender. This is something personal and internal that isn't visible to others. It's about who you know yourself to be, whether that's a man, woman, non-binary, or another gender identity.

  **Gender expression** refers to how a person presents their gender externally through clothing, hairstyle, mannerisms, name, pronouns, and other outward characteristics. This is what's visible to others and how we communicate our gender to the world.

  A key distinction is that gender expression may or may not align with a person's gender identity. For example, a person might identify as non-binary (their gender identity) but present in ways that others perceive as typically feminine or masculine (their gender expression).

  Both are important aspects of a person's experience of gender, but they function in different ways and shouldn't be conflated.
  MARKDOWN
end

Answer.find_or_create_by(question: question5) do |a|
  a.content = <<~MARKDOWN
  Creating a gender-inclusive classroom involves several practical approaches:

  1. **Start with yourself:** Model inclusive language by introducing yourself with your pronouns and avoiding gendered language like "ladies and gentlemen" in favor of "students," "scholars," or "everyone."

  2. **Respect names and pronouns:** Create opportunities for students to share their names and pronouns privately. Use a beginning-of-semester form or index card activity where students can indicate their name, pronouns, and whether it's OK to use those pronouns when speaking with parents/guardians.

  3. **Update classroom materials:** Review your curriculum and materials for gendered language and binary assumptions. Include diverse representations in your examples, reading materials, and discussions.

  4. **Address misgendering:** If a student is misgendered, briefly correct the pronoun and move on without making it a big moment. For example: "Sam shared his—sorry, their—idea about the project."

  5. **Create inclusive spaces:** Ensure access to gender-neutral restrooms if possible, and rethink gendered activities or groups.

  6. **Have visual cues:** Consider displaying a small pride flag or safe space sticker to signal that your classroom is inclusive.

  Remember that creating an inclusive environment is an ongoing process rather than a one-time change. Be open to feedback and willing to learn from your students.
  MARKDOWN
end

# Create articles
puts "Creating articles..."
Article.find_or_create_by(question: question1) do |a|
  a.title = "Best Practices for Asking About Pronouns"
  a.description = "A guide to respectfully inquiring about someone's pronouns in various contexts."
  a.content = <<~MARKDOWN
  # Best Practices for Asking About Pronouns

  Using someone's correct personal pronouns is a way to respect them and create an inclusive environment. Here's a comprehensive guide on how to approach this important topic.

  ## Why Pronouns Matter

  Pronouns are an important part of how we identify ourselves. Using the correct pronouns for someone shows respect and affirms their identity. Misgendering (using incorrect pronouns) can cause distress and make people feel invalidated or unwelcome.

  ## How to Ask About Pronouns

  ### 1. Lead by Example

  The simplest approach is to offer your own pronouns first:

  - In introductions: "Hi, I'm Alex and I use they/them pronouns."
  - In email signatures: "Jamie Smith (she/her)"
  - On name tags or virtual meeting names: "Pat Johnson (he/him)"

  This normalizes the practice and often prompts others to share their pronouns as well.

  ### 2. When Asking Directly

  If you need to ask someone about their pronouns:

  - Keep it casual and straightforward: "What pronouns do you use?"
  - Make it an opt-in question: "May I ask what pronouns you use?"
  - Frame it as about your behavior: "What pronouns should I use when referring to you?"

  ### 3. When and Where to Ask

  - Private settings are usually better than public ones
  - One-on-one conversations prevent putting someone on the spot
  - Intake forms or surveys can include an optional pronoun field
  - Group introductions can include pronouns if everyone is asked (not just visibly transgender people)

  ## What Not to Do

  - Don't ask "What are your preferred pronouns?" - pronouns aren't preferences; they're pronouns
  - Don't single out people who you think might be transgender
  - Don't make pronoun sharing mandatory in all contexts
  - Don't demand explanations about someone's pronouns

  ## When Someone Doesn't Want to Share

  Respect that not everyone is comfortable sharing their pronouns. Some people may:

  - Be questioning or exploring their gender identity
  - Not be out in all contexts
  - Feel uncomfortable with the focus on gender

  In these cases, you can use the person's name instead of pronouns.

  ## What to Do If You Make a Mistake

  If you accidentally misgender someone:

  1. Briefly apologize: "Sorry, I meant they."
  2. Correct yourself
  3. Move on without making it a big deal
  4. Make an effort to get it right next time

  ## Creating Pronoun-Inclusive Spaces

  Organizations can normalize pronoun sharing by:

  - Including optional pronoun fields on forms
  - Adding pronouns to email signatures
  - Using name tags with pronoun options
  - Training staff on pronoun etiquette

  Remember that creating inclusive environments is an ongoing practice that requires awareness and respect.
  MARKDOWN
  a.category = "Education"
  a.author = "Dr. Jamie Taylor"
end

Article.find_or_create_by(question: question4) do |a|
  a.title = "Understanding Gender Identity and Gender Expression"
  a.description = "An exploration of the key differences between how we internally experience gender versus how we express it externally."
  a.content = <<~MARKDOWN
  # Understanding Gender Identity and Gender Expression

  When discussing gender, two fundamental concepts often come up: gender identity and gender expression. While related, these concepts refer to different aspects of a person's experience of gender.

  ## Gender Identity

  Gender identity refers to a person's internal, deeply felt sense of their own gender. It's about who you know yourself to be.

  **Key characteristics of gender identity:**

  - Internal and personal
  - Not always visible to others
  - May or may not align with sex assigned at birth
  - Can include identities such as woman, man, non-binary, genderfluid, agender, and many others
  - Generally stable for many people, though some experience fluidity
  - Not a choice or preference, but a fundamental aspect of who someone is

  Gender identity is sometimes described as "the gender you know yourself to be" or "your internal sense of self."

  ## Gender Expression

  Gender expression refers to how a person presents their gender externally through clothing, hairstyle, voice, body characteristics, name, pronouns, and other outward characteristics.

  **Key characteristics of gender expression:**

  - External and visible to others
  - Can change depending on context, comfort, safety, and personal preference
  - Includes clothing, hairstyles, makeup, mannerisms, communication styles, etc.
  - May be perceived differently by different people and cultures
  - Influenced by cultural norms and expectations
  - Can be a deliberate expression of identity or simply personal preference

  Gender expression is about how we present ourselves to the world and how others perceive our gender.

  ## The Relationship Between Identity and Expression

  A common misconception is that gender identity and expression always align in predictable ways. In reality:

  - A person with any gender identity might adopt a wide range of gender expressions
  - Gender expression doesn't always "match" assumed expectations for a particular gender identity
  - Many people express their gender in ways that feel authentic regardless of stereotypes
  - Some people modify their expression for safety, comfort, or context while their identity remains the same

  For example:

  - A woman (identity) might present in ways traditionally coded as masculine (expression)
  - A non-binary person (identity) might present in ways that others perceive as feminine or masculine (expression)
  - A man (identity) might present androgynously (expression)

  ## Why the Distinction Matters

  Understanding the difference between gender identity and expression is important because:

  1. It helps us avoid assumptions about people based on appearance
  2. It recognizes that gender is more complex than outward presentation
  3. It validates that people can express themselves authentically without their identity being questioned
  4. It supports better communication about gender-related experiences

  ## Supporting People of All Gender Identities and Expressions

  To be supportive:

  - Use people's correct names and pronouns
  - Don't make assumptions about someone's gender identity based on their expression
  - Recognize that both identity and expression are deeply personal
  - Support people's right to express their gender authentically
  - Advocate for inclusive environments where diverse expressions are welcome

  By understanding these concepts, we can create more inclusive spaces where everyone feels respected regardless of how they identify or express themselves.
  MARKDOWN
  a.category = "Education"
  a.author = "Dr. Sam Chen"
end

Article.find_or_create_by(question: question5) do |a|
  a.title = "Creating Gender-Inclusive Classrooms: A Teacher's Guide"
  a.description = "Practical strategies for educators to create learning environments that support students of all gender identities."
  a.content = <<~MARKDOWN
  # Creating Gender-Inclusive Classrooms: A Teacher's Guide

  As educators, we have both the opportunity and responsibility to create learning environments where all students feel safe, respected, and valued. This guide offers practical strategies for making your classroom more gender-inclusive.

  ## Understanding the Impact

  Research consistently shows that students who feel their identities are respected show:

  - Improved academic performance
  - Better attendance rates
  - Higher self-esteem
  - Reduced rates of depression and anxiety
  - Stronger sense of belonging in school communities

  Conversely, students who face gender-based discrimination or don't see themselves represented in school contexts often experience negative outcomes. Creating gender-inclusive classrooms isn't just about political correctness—it's about student wellbeing and success.

  ## Practical Strategies

  ### 1. Examine Your Language

  **Daily Communication:**
  - Use gender-neutral terms for groups: "students," "everyone," "scholars," "folks" (instead of "boys and girls" or "ladies and gentlemen")
  - Avoid unnecessarily gendered phrases: "Please find a partner" rather than "Please find a buddy boy/girl"
  - Notice when you use gendered examples or stereotypes in lessons

  **Written Materials:**
  - Review handouts and teaching materials for gendered language
  - Use gender-neutral pronouns in hypothetical examples (they/them) or alternate between pronouns
  - Include diverse names in word problems and examples

  ### 2. Names and Pronouns

  **Best Practices:**
  - At the beginning of the year, have students share how they'd like to be addressed
  - Consider a private survey where students can indicate their name, pronouns, and whether these should be used in front of the class, when calling home, etc.
  - Keep this information confidential and respected
  - Practice using different pronouns if they're new to you
  - If you make a mistake with someone's name or pronoun, briefly correct yourself and move on

  ### 3. Class Organization and Activities

  **Rethinking Groupings:**
  - Avoid dividing students by gender for activities, competitions, or classroom management
  - Use birthday months, counting off, or student preferences for grouping
  - Don't use gender as a classroom management tool ("boys line up first")

  **Facilities Considerations:**
  - Advocate for gender-neutral restroom access
  - Be aware of students who might need private changing spaces for PE
  - Create passes that allow students to use the facilities they're comfortable with

  ### 4. Curriculum and Materials

  **Representation Matters:**
  - Include diverse examples of people in your teaching materials
  - Review your classroom library for gender diversity
  - Highlight contributions from people of diverse gender identities in your subject area
  - Consider where gender stereotypes appear in your curriculum and address them critically

  **Resources to Include:**
  - Books with diverse family structures and gender expressions
  - Materials that feature people who break gender stereotypes
  - Age-appropriate resources about gender identity and expression

  ### 5. Creating a Supportive Environment

  **Visual Cues:**
  - Small rainbow or transgender flag stickers on your door or desk
  - Posters that show diverse types of people
  - Books visible that reflect diverse gender identities and expressions

  **Handling Questions and Comments:**
  - Be prepared to address questions about gender in age-appropriate ways
  - Respond to gender-based teasing or bullying promptly and effectively
  - Model respectful language and attitudes

  **Policy Awareness:**
  - Know your school's policies on supporting transgender and non-binary students
  - Be familiar with relevant laws in your area
  - Advocate for inclusive policies if they don't exist

  ## Responding to Challenges

  **From Students:**
  - Address misconceptions with factual, age-appropriate information
  - Use questions as learning opportunities for the whole class when appropriate
  - Have private conversations when needed

  **From Adults:**
  - Focus on how inclusive practices benefit all students
  - Share research on the importance of supportive environments
  - Connect to educational values like respect and creating conditions for learning

  ## Getting Started: First Steps

  If this feels overwhelming, start with these manageable changes:

  1. Examine and adjust your language to be more inclusive
  2. Include diverse examples in your teaching
  3. Respond effectively to gender-based teasing or stereotyping
  4. Add one or two books or resources that include diverse gender expressions
  5. Create a system for learning students' names and pronouns

  Remember that creating an inclusive classroom is an ongoing journey. Start where you can, learn from your students, and continue to grow your practice.

  ## Resources for Further Learning

  - GLSEN (glsen.org) offers educator resources and research
  - Gender Spectrum (genderspectrum.org) provides training and materials for schools
  - Teaching Tolerance (tolerance.org) has lesson plans and professional development resources
  - Your school's counselors, social workers, or diversity coordinators can provide local support

  Creating a gender-inclusive classroom benefits not just students who are transgender or non-binary, but all students, by creating an environment where everyone can be their authentic selves.
  MARKDOWN
  a.category = "Education"
  a.author = "Dr. Jamie Taylor"
end

puts "Seed data created successfully!"
