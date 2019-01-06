class AddContactToReservations < ActiveRecord::Migration[5.2]
  def change
    add_reference :reservations, :contact, foreign_key: true
  end
end
