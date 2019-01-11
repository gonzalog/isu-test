FactoryBot.define do
  factory :contact_type do
    description { Faker::Team.name }
  end

  factory :contact do
    name { Faker::Name.name }
    phone  { Faker::PhoneNumber.phone_number }
    birthdate { Faker::Date.birthday(21, 65) }
    contact_type { create(:contact_type)  }
  end

  factory :reservation do
    description { "<p>#{Faker::Lorem.paragraph}</p>" }
    date { Faker::Date.between(Date.tomorrow, Date.tomorrow.end_of_year) }
    ranking { Faker::Number.between(1, 5) }
    favorite { Faker::Boolean.boolean }
    contact { create(:contact) }
  end
end