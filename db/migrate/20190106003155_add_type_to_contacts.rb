class AddTypeToContacts < ActiveRecord::Migration[5.2]
  def change
    add_reference :contacts, :contact_type, foreign_key: true
  end
end
