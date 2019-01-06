class Contact < ApplicationRecord
  has_many :reservations
  belongs_to :contact_type

  validates_presence_of :contact_type, :name, :phone, :birthdate

  paginates_per 8
end
