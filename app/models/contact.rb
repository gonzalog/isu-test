class Contact < ApplicationRecord
  has_many :reservations, dependent: :destroy
  belongs_to :contact_type

  validates_presence_of :contact_type, :name, :phone, :birthdate

  paginates_per 8
end
