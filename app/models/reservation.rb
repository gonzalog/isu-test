class Reservation < ApplicationRecord
  belongs_to :contact
  paginates_per 8
end
