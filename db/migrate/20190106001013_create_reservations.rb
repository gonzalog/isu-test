class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.text :description
      t.date :date
      t.integer :ranking
      t.boolean :favorite

      t.timestamps
    end
    add_index :reservations, :date
    add_index :reservations, :ranking
  end
end
