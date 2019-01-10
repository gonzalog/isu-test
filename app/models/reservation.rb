class Reservation < ApplicationRecord
  belongs_to :contact
  paginates_per 8

  def self.sortings
    [
      {
        description: "By Date Ascending",
        id: 'order_by_date_asc',
        method: :order_by_date_asc
      },
      {
        description: "By Date Descending",
        id: 'order_by_date_desc',
        method: 'order_by_date_desc'
      },
      {
        description: "By Alphabetic Ascending",
        id: 'order_by_name_asc',
        method: 'order_by_name_asc'
      },
      {
        description: "By Alphabetic Descending",
        id: 'order_by_name_desc',
        method: 'order_by_name_desc'
      },
      {
        description: "By Ranking",
        id: 'order_by_ranking',
        method: 'order_by_ranking'
      }
    ]
  end

  def self.sorting_descriptions
    sortings.map do |sorting|
      {
        description: sorting[:description],
        id: sorting[:id]
      }
    end
  end

  def self.order_by(sorting_id)
    if sorting_id
      current_sorting = sortings.find { |sorting| sorting[:id] == sorting_id }
      self.send(current_sorting[:method])
    else
      order(created_at: :desc)
    end
  end

  def self.order_by_date_asc
    order(:date)
  end

  def self.order_by_date_desc
    order(date: :desc)
  end

  def self.order_by_name_asc
    joins(:contact).order("contacts.name")
  end

  def self.order_by_name_desc
    joins(:contact).order("contacts.name desc")
  end

  def self.order_by_ranking
    order(ranking: :desc)
  end
end
