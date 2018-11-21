FactoryGirl.define do

  factory :message do
    content  Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/no_image.jpg")
    group
    user
    created_at {Faker::Time.between(2.days.ago,Time.now, :all)}
  end

end
