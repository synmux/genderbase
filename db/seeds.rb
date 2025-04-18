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

responder1 = Responder.find_or_create_by(email: "responder1@genderbase.com") do |r|
  r.password = "OoNeob7sho5shaph"
  r.pseudonym = "Expert Responder"
end

responder2 = Responder.find_or_create_by(email: "responder2@genderbase.com") do |r|
  r.password = "ieKuj0eish1jaiLa"
  r.pseudonym = "Support Specialist"
end

_ = Responder.find_or_create_by(email: "demo@genderbase.com") do |r|
  r.password = "jie1OSh0ek6aith3"
  r.pseudonym = "Demo Responder"
end

# Create questions in various states
puts "Creating questions and conversations..."

# Open question
_ = Question.find_or_create_by(title: "How to respectfully ask about pronouns?") do |q|
  q.body = "I'm trying to be more inclusive, but I'm unsure about the most respectful way to ask someone about their pronouns if they haven't already shared them. When is it appropriate to ask, and how should I phrase the question?"
  q.status = :open
  q.email = "user1@example.com"
  q.pseudonym = "Curious Learner"
  q.responder = responder1
  q.token = SecureRandom.hex(16)
end

# In progress question with conversation (multiple answers)
question2 = Question.find_or_create_by(title: "Supporting a transgender friend through their transition") do |q|
  q.body = "My close friend has recently come out as transgender and is beginning their transition. I want to be as supportive as possible but I'm worried about saying the wrong thing. What are some practical ways I can support them during this time?"
  q.status = :in_progress
  q.email = "user2@example.com"
  q.pseudonym = "Supportive Friend"
  q.responder = responder2
  q.token = SecureRandom.hex(16)
end

# Closed question with a knowledge base entry
question3 = Question.find_or_create_by(title: "Gender-neutral language for professional emails") do |q|
  q.body = "I'm updating our company's email templates and communication guidelines. What are best practices for ensuring our language is gender-inclusive, especially when addressing groups or individuals whose gender we don't know?"
  q.status = :closed
  q.email = "user3@example.com"
  q.pseudonym = "HR Professional"
  q.responder = responder1
  q.token = SecureRandom.hex(16)
end

# Anonymous question
_ = Question.find_or_create_by(title: "Coming out as non-binary at school") do |q|
  q.body = "I'm a high school student who identifies as non-binary, but I haven't told many people yet. I'd like to start using they/them pronouns at school but I'm nervous about how to approach this with teachers and classmates. Any advice on how to do this?"
  q.status = :open
  q.email = nil
  q.pseudonym = "Anonymous Student"
  q.responder = responder1
  q.token = SecureRandom.hex(16)
end

# Recently closed question ready for KB conversion
question5 = Question.find_or_create_by(title: "Explaining gender diversity to children") do |q|
  q.body = "I have a 7-year-old who has been asking questions about gender after meeting a friend's parent who is transgender. I want to explain things in an age-appropriate way that promotes acceptance. What's the best approach?"
  q.status = :closed
  q.email = "parent@example.com"
  q.pseudonym = "Thoughtful Parent"
  q.responder = responder2
  q.token = SecureRandom.hex(16)
end

puts "Creating conversation threads..."

# Answer for question2 from responder (starting the conversation)
_ = Answer.find_or_create_by(question: question2, responder: responder2) do |a|
  a.body = "Thank you for reaching out about supporting your transgender friend. It's wonderful that you want to be there for them during this important time in their life.\n\n**Here are some practical ways to support your friend:**\n\n1. **Ask how they want to be supported**: Everyone's needs are different, so ask your friend directly what would be helpful for them.\n\n2. **Use their correct name and pronouns**: This is one of the most important ways to show respect and support. It's okay to make mistakes, but apologize briefly and correct yourself.\n\n3. **Educate yourself**: Look for resources about transgender experiences rather than expecting your friend to educate you on everything.\n\n4. **Be an advocate**: Stand up for your friend when others misgender them or make insensitive comments.\n\n5. **Respect privacy**: Don't share information about your friend's transition with others without their permission.\n\nDo you have any specific situations or concerns you'd like guidance on?"
end

# User reply to responder answer
_ = Answer.find_or_create_by(question: question2) do |a|
  a.body = "Thank you for these suggestions. I'm especially concerned about family gatherings where some relatives might not be as understanding. Do you have advice for navigating these situations without creating conflict but still supporting my friend?"
  a.responder_id = nil
end

# Responder follow-up
_ = Answer.find_or_create_by(question: question2, responder: responder2) do |a|
  a.body = "That's a thoughtful consideration. Family gatherings can indeed be challenging.\n\n**Here are some suggestions for navigating family events:**\n\n1. **Check in with your friend beforehand**: Ask if they have preferences about how to handle potential situations. Some people may want active intervention, while others might prefer to handle things themselves.\n\n2. **Have simple corrections ready**: If someone misgenders your friend, a simple \"Actually, [name] uses [pronouns]\" and then continuing the conversation can be effective without making it a big moment.\n\n3. **Private conversations**: If a family member is consistently disrespectful, consider having a private, calm conversation with them away from your friend.\n\n4. **Create safe space**: Make sure your friend knows they can step away with you if things become uncomfortable.\n\n5. **Pre-event allies**: Inform supportive family members ahead of time so there are multiple people who can model respectful behavior.\n\n6. **Safety plan**: Have a signal or plan with your friend in case they need to leave early.\n\nRemember that your consistent support matters greatly, even if you can't control how everyone responds."
end

# Answers for question3 (closed)
_ = Answer.find_or_create_by(question: question3, responder: responder1) do |a|
  a.body = "Creating gender-inclusive language for professional communications is an excellent goal! Here are some best practices:\n\n**For Email Greetings:**\n\n* Instead of \"Dear Sirs\" or \"Dear Sir/Madam\" use:\n  * \"Dear [Company Name] Team\"\n  * \"Dear Customer Service Team\"\n  * \"Hello everyone\"\n  * \"Greetings\"\n  * \"Good morning/afternoon\"\n\n**For General Communication:**\n\n* Replace gendered terms with neutral alternatives:\n  * \"staffed\" instead of \"manned\"\n  * \"workforce\" instead of \"manpower\"\n  * \"chair\" or \"chairperson\" instead of \"chairman\"\n  * \"police officer\" instead of \"policeman\"\n\n**For Unknown Individuals:**\n\n* Use \"they/them\" pronouns when referring to a person whose gender you don't know\n* Refer to roles rather than gendered terms: \"the customer\" instead of \"sir/madam\"\n\n**For Group References:**\n\n* Use \"team members,\" \"colleagues,\" \"staff,\" or \"everyone\" instead of \"ladies and gentlemen\"\n* \"People\" or \"folks\" instead of \"guys\" (even when addressing mixed groups)\n\n**For Forms and Surveys:**\n\n* Include inclusive gender options beyond binary choices\n* Make gender questions optional when possible\n\nAre there specific templates or communications you'd like more targeted advice on?"
end

# User reply
_ = Answer.find_or_create_by(question: question3) do |a|
  a.body = "This is incredibly helpful, thank you! We particularly struggle with customer service responses and job postings. Any additional tips for those specific areas?"
  a.responder_id = nil
end

# Final responder answer before closing
_ = Answer.find_or_create_by(question: question3, responder: responder1) do |a|
  a.body = "I'm glad you found it helpful! Here are specific suggestions for customer service and job postings:\n\n**For Customer Service Templates:**\n\n1. **Avoid assumptions about gender based on names**\n   * Use full names rather than Mr./Ms.: \"Thank you, Alex Garcia, for your inquiry\"\n   * If you must use a title, confirm it first or use gender-neutral \"Mx.\" as an option\n\n2. **Standard responses**\n   * \"Thank you for contacting us\" instead of \"Sir/Madam\"\n   * \"We appreciate your business\" rather than \"We value you as a gentleman/lady\"\n   * Use direct address: \"Your order will arrive...\" instead of \"His/her order\"\n\n**For Job Postings:**\n\n1. **Job titles**\n   * Use gender-neutral titles: \"Server\" not \"Waitress/Waiter\"\n   * \"Firefighter\" not \"Fireman\"\n   * \"Police Officer\" not \"Policeman\"\n\n2. **Pronouns in descriptions**\n   * Use \"you\" when addressing candidates: \"You will be responsible for...\"\n   * Alternatively, use \"the successful candidate\" or \"the [job title]\"\n   * If using pronouns, use \"they/them\": \"They will manage a team of five\"\n\n3. **Gendered language audit**\n   * Check for subtly coded terms that may discourage diverse applicants\n   * Balance terms stereotypically seen as masculine (\"competitive,\" \"dominant\") with inclusive language\n   * Tools like Textio or Gender Decoder can help identify unknowingly gendered language\n\n4. **Explicit inclusion statement**\n   * \"We welcome applications from candidates of all genders\"\n   * Include your company's commitment to creating an inclusive environment\n\nImplementing these practices consistently will help build a more inclusive communication culture. Would you like me to review any specific templates you currently use?"
end

# Conversation for question5 (recently closed, ready for KB)
_ = Answer.find_or_create_by(question: question5, responder: responder2) do |a|
  a.body = "Thank you for this thoughtful question about discussing gender diversity with your child. It's wonderful that you're approaching this with care and openness.\n\n**Here are some age-appropriate approaches for a 7-year-old:**\n\n1. **Keep it simple and concrete**: Children this age understand concepts best when explained simply. You might say, \"Some people feel like boys on the inside, some feel like girls, and some might feel like both or neither.\"\n\n2. **Use children's books**: There are excellent age-appropriate books about gender diversity like \"Julian is a Mermaid,\" \"I Am Jazz,\" or \"It Feels Good to Be Yourself.\"\n\n3. **Focus on respect and kindness**: Emphasize that everyone deserves respect and kindness, regardless of how they look or feel inside.\n\n4. **Answer questions directly**: If your child asks specific questions, answer them honestly but simply. It's okay to say \"I'm not sure\" if you don't know the answer.\n\n5. **Use everyday examples**: Point out diversity in your daily life, including different family structures, clothing choices, or interests that challenge gender stereotypes.\n\n6. **Avoid making it a 'big deal'**: Children often accept differences more readily than adults. Presenting information matter-of-factly helps normalize diversity.\n\nDo you have any specific questions your child has asked that you'd like help addressing?"
end

_ = Answer.find_or_create_by(question: question5) do |a|
  a.body = "Yes, actually. They asked why the person 'changed from a man to a woman' and if people can 'just decide' to be different. I want to explain that it's not really a choice but more about who someone truly is, but I'm not sure how to word it for a 7-year-old."
  a.responder_id = nil
end

_ = Answer.find_or_create_by(question: question5, responder: responder2) do |a|
  a.body = "That's a great question to work through together. Here's how you might explain it:\n\n**For explaining transgender identity:**\n\n\"Some people look like boys when they're born, and doctors and parents think they are boys. But as they grow up, they realize deep inside that they're actually girls. It's not about changing who they are - it's about helping their outside match who they already are inside. It's like if everyone thought you were someone else and called you by the wrong name all the time - you wouldn't be changing who you are by telling them your real name, you'd just be helping them see the real you.\"\n\n**For explaining that it's not a choice:**\n\n\"People don't choose who they are inside, just like you didn't choose to be who you are. Some people just know they're a boy or a girl or something else, even if that's different from what others thought when they were born. What they can choose is whether to tell others and how they want to dress or look to feel more like themselves.\"\n\n**You might add a comparison to something familiar:**\n\n\"It's a bit like how you know whether you're right-handed or left-handed. You didn't choose that - it's just how you are. And it would feel very uncomfortable if someone tried to make you use your non-dominant hand all the time.\"\n\nThese explanations focus on authenticity rather than 'changing,' which helps children understand it's about being true to oneself rather than making a casual decision to be different. Does that help with the specific questions your child asked?"
end

_ = Answer.find_or_create_by(question: question5) do |a|
  a.body = "That's perfect, especially the analogy about calling someone by the wrong name. I think they'll really understand that. Thank you so much for your help!"
  a.responder_id = nil
end

_ = Answer.find_or_create_by(question: question5, responder: responder2) do |a|
  a.body = "You're very welcome! I'm glad those explanations feel helpful. The name analogy often resonates well with children.\n\n**A few additional thoughts that might help:**\n\n1. **Keep the conversation ongoing**: Let your child know they can always come to you with more questions. Gender understanding evolves as children grow.\n\n2. **Watch for your child's cues**: Sometimes children are satisfied with simple answers; other times they want to know more. Follow their lead on how deep to go into explanations.\n\n3. **Correct misconceptions gently**: If your child picks up incorrect ideas from elsewhere, address them matter-of-factly rather than making them feel bad for misunderstanding.\n\n4. **Model respectful language**: Using the correct pronouns and name for your friend's parent is one of the most powerful ways to teach your child about respect.\n\nYou're doing a wonderful job by approaching this thoughtfully. Children who learn about diversity in a positive, straightforward way are developing important skills for navigating our diverse world with compassion and understanding. Please feel free to reach out again if other questions come up!"
end

puts "Creating knowledge base entries..."
_ = Knowledge.find_or_create_by(question: question3) do |k|
  k.title = "Gender-Inclusive Language Guide for Professional Communications"
  k.description = "Best practices for using gender-inclusive language in business emails, customer service, and job postings."
  k.body = "# Gender-Inclusive Language Guide for Professional Communications\n\n## Introduction\n\nGender-inclusive language acknowledges and respects the diversity of gender identities and expressions. This guide provides practical suggestions for making your professional communications more inclusive.\n\n## General Principles\n\n* **Don't assume gender** based on names or appearances\n* **Use gender-neutral terms** when referring to groups or individuals whose gender is unknown\n* **Respect individual preferences** for names, pronouns, and titles\n* **Be consistent** in applying gender-inclusive language across all communications\n\n## Email Greetings and Salutations\n\n### Instead of gendered greetings like \"Dear Sir/Madam\" or \"Gentlemen,\" use:\n\n* \"Dear [Company Name] Team\"\n* \"Dear Customer Service Team\"\n* \"Hello everyone\"\n* \"Greetings\"\n* \"Good morning/afternoon\"\n* \"To whom it may concern\" (formal)\n* \"Dear [Full Name]\" (when addressing a specific person)\n\n## Gender-Neutral Terms for Everyday Business Language\n\n| Gendered Term | Gender-Neutral Alternative |\n|---------------|----------------------------|\n| Businessman | Business professional, business person |\n| Chairman | Chair, chairperson |\n| Mailman | Mail carrier, postal worker |\n| Manpower | Workforce, personnel, staff |\n| Mankind | Humanity, people |\n| Manned | Staffed, operated |\n| Workmanship | Quality of work, craftsmanship |\n\n## Customer Service Communication\n\n### Best Practices for Customer Service Templates:\n\n1. **Avoid assumptions about gender based on names**\n   * Use full names rather than Mr./Ms.: \"Thank you, Alex Garcia, for your inquiry\"\n   * If you must use a title, confirm it first or offer gender-neutral \"Mx.\" as an option\n\n2. **Standard responses**\n   * \"Thank you for contacting us\" instead of \"Sir/Madam\"\n   * \"We appreciate your business\" rather than gendered expressions\n   * Use direct address: \"Your order will arrive...\" instead of \"His/her order\"\n\n## Job Postings and Recruitment\n\n1. **Job titles**\n   * Use gender-neutral titles: \"Server\" not \"Waitress/Waiter\"\n   * \"Firefighter\" not \"Fireman\"\n   * \"Police Officer\" not \"Policeman\"\n\n2. **Pronouns in descriptions**\n   * Use \"you\" when addressing candidates: \"You will be responsible for...\"\n   * Alternatively, use \"the successful candidate\" or \"the [job title]\"\n   * If using pronouns, use \"they/them\": \"They will manage a team of five\"\n\n3. **Gendered language audit**\n   * Check for subtly coded terms that may discourage diverse applicants\n   * Balance terms stereotypically seen as masculine (\"competitive,\" \"dominant\") \n   * Tools like Textio or Gender Decoder can help identify unknowingly gendered language\n\n4. **Explicit inclusion statement**\n   * \"We welcome applications from candidates of all genders\"\n   * Include your company's commitment to creating an inclusive environment\n\n## Implementing Change\n\n* Review existing templates and communications for gendered language\n* Create style guidelines for consistent application\n* Provide training for staff on inclusive communication\n* Establish a feedback process for continuous improvement\n\n## Original Question\n\n\"I'm updating our company's email templates and communication guidelines. What are best practices for ensuring our language is gender-inclusive, especially when addressing groups or individuals whose gender we don't know?\"\n\n## Response\n\nThe comprehensive answer includes best practices for email greetings, general communication, addressing unknown individuals, group references, and forms/surveys. The focus is on practical alternatives that maintain professionalism while being inclusive of all gender identities."
  k.category = :general
  k.responder = responder1
  k.slug = "gender-inclusive-language-guide"
end

puts "Creating terminology entries..."
_ = Terminology.find_or_create_by(term: "Gender Identity") do |t|
  t.definition = "An individual's internal, deeply-felt sense of being male, female, both, neither, or somewhere along the gender spectrum."
  t.info = "Gender identity is not necessarily visible to others and may or may not align with the sex assigned at birth. It's a core aspect of who someone is, not a preference or choice."
  t.responder = responder1
end

_ = Terminology.find_or_create_by(term: "Transgender") do |t|
  t.definition = "An umbrella term for people whose gender identity differs from the sex they were assigned at birth."
  t.info = "Being transgender is not dependent on medical procedures or physical appearance. The term 'trans' is often used as shorthand. The opposite term is 'cisgender' (or 'cis'), referring to people whose gender identity aligns with their birth sex."
  t.responder = responder1
end

_ = Terminology.find_or_create_by(term: "Non-binary") do |t|
  t.definition = "An umbrella term for gender identities that are not exclusively male or female."
  t.info = "Non-binary people may identify as having two or more genders, having no gender, moving between genders, or having a gender that is not in the male/female binary. Some non-binary people may use they/them pronouns, while others may use other pronouns or a combination."
  t.responder = responder2
end

_ = Terminology.find_or_create_by(term: "Pronouns") do |t|
  t.definition = "Words used to refer to a person instead of their name, often indicating gender in many languages."
  t.info = "Common pronouns include she/her, he/him, and they/them (singular), though some people use neopronouns like xe/xem or ze/zir. Using someone's correct pronouns is a way to show respect for their identity. It's becoming common practice to share one's own pronouns when introducing oneself."
  t.responder = responder1
end

_ = Terminology.find_or_create_by(term: "Cisgender") do |t|
  t.definition = "Describing a person whose gender identity aligns with the sex they were assigned at birth."
  t.info = "For example, someone assigned female at birth who identifies as a woman is cisgender. The prefix 'cis-' is Latin for 'on this side of,' whereas 'trans-' means 'across' or 'on the other side of.'"
  t.responder = responder2
end

_ = Terminology.find_or_create_by(term: "Gender Expression") do |t|
  t.definition = "How a person presents their gender through behavior, clothing, hair, voice, or other external characteristics."
  t.info = "Gender expression may or may not conform to societal expectations of gender and does not necessarily indicate one's gender identity. For example, a man can have a feminine gender expression while still identifying as a man."
  t.responder = responder1
end

_ = Terminology.find_or_create_by(term: "Mx.") do |t|
  t.definition = "A gender-neutral honorific (pronounced 'mix' or 'mux') used in place of gendered titles like Mr., Mrs., Miss, or Ms."
  t.info = "Mx. is increasingly recognized officially in many countries and can be used by anyone regardless of gender, though it's particularly important for non-binary people who may not feel comfortable with gendered titles."
  t.responder = responder2
end

puts "Seed data created successfully!"
