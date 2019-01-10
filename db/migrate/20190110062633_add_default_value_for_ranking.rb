class AddDefaultValueForRanking < ActiveRecord::Migration[5.2]
  def change
    change_column :reservations, :ranking, :integer, default: 1
    change_column :reservations, :favorite, :boolean, default: false
  end
end
