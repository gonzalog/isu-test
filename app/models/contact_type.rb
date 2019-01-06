class ContactType < ApplicationRecord
  has_many :contacts
  validates_presence_of :description
end
