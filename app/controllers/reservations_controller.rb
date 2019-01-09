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
    render json: current_reservation.as_json(include: :contact)
  end

  def create
    raise "Missing reservation description" unless reservation_params[:description]
    raise "Missing reservation date" unless reservation_params[:date]
    raise "Missing contact" unless reservation_params[:contact]

    if reservation_params[:contact][:id]
      contact = Contact.find(reservation_params[:contact][:id])
    else
      contact = Contact.new
    end

    contact.assign_attributes(reservation_params[:contact].slice(:name, :phone, :birthdate, :type_id))
    contact.save!

    reservation = Reservation.create!({
      description: reservation_params[:description],
      date: reservation_params[:date],
      contact: contact
    })

    render json: reservation.as_json(include: :contact)
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
    params.require(:reservation).permit(:description, :date, :contact)
  end
end
