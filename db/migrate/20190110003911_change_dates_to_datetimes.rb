class ChangeDatesToDatetimes < ActiveRecord::Migration[5.2]
  def change
    change_column :reservations, :date, :datetime
    change_column :contacts, :birthdate, :datetime
  end
end
