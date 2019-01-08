class ReservationsController < ApplicationController
  def index
    results = Reservation.all.page(index_params[:page])

    render json: {
      items: results.as_json,
      next_page: results.next_page,
      prev_page: results.prev_page
    }
  end

  def show
    render json: current_reservation.as_json
  end

  def create
    raise "Missing reservation description" unless reservation_params[:description]
    raise "Missing reservation date" unless reservation_params[:date]
    if reservation_params[:contact_id]
      reservation = Reservation.create!(reservation_params)
    elsif contact_params
      contact = Contact.create!(contact_params)
      params = reservation_params
      params[:contact_id] = contact.id
      reservation = Reservation.create!(params)
    else
      raise "Missing reservation contact"
    end

    render json: reservation.as_json
  rescue e
    render json: { error: e.message }, status: 400
  end

  def sortings
    render json: [
      {
        description: "By Date Ascending"
      },
      {
        description: "By Date Descending"
      },
      {
        description: "By Alphabetic Ascending"
      },
      {
        description: "By Alphabetic Descending"
      },
      {
        description: "By Ranking"
      }
    ]
  end

  private
  def current_reservation
    @current_reservation ||= Reservation.find(params[:id])
  end

  def index_params
    params.permit(:search, :page)
  end

  def reservation_params
    params.require(:reservation).permit(:description, :date, :contact_id)
  end

  def contact_params
    params.require(:contact).permit(:name, :contact_type_id, :phone, :birthdate)
  end
end
