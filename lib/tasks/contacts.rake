namespace :contacts do
  desc "Create contact types"
  task create_initial_types: :environment do
    ["Contact Type 1", "Contact Type 2", "Contact Type 3"].each do |description|
      type = ContactType.find_or_create_by(description: description)
      puts type.as_json
    end
  end
end
