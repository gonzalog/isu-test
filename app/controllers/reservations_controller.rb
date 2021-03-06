class ReservationsController < ApplicationController
  def index
    results = Reservation.order_by(index_params[:sorting_id]).page(index_params[:page])

    render json: {
      items: results.as_json(include: :contact, except: :description),
      next_page: results.next_page,
      prev_page: results.prev_page,
      total_pages: results.total_pages,
      current_page: results.current_page
    }
  end

  def show
    render json: current_reservation.as_json(include: :contact)
  end

  def create
    raise "Missing reservation description" unless reservation_params[:description]
    raise "Missing reservation date" unless reservation_params[:date]
    raise "Missing contact" if contact_params.empty?

    if contact_params[:id]
      contact = Contact.find(contact_params[:id])
      if contact
        contact.update_attributes!(contact_params.except(:id))
      else
        raise "Contact not found with id: #{contact_params[:id]}"
      end
    else
      contact = Contact.create!(contact_params)
    end

    reservation = Reservation.create!({
      description: reservation_params[:description],
      date: reservation_params[:date],
      contact: contact
    })

    render json: reservation.as_json(include: :contact)
  rescue => e
    render json: { error: e.message }, status: 400
  end

  def update
    if params[:contact]
      if contact_params[:id]
        contact = Contact.find(contact_params[:id])
        if contact
          contact.update_attributes!(contact_params.except(:id))
        else
          raise "Contact not found with id: #{contact_params[:id]}"
        end
      else
        contact = Contact.create!(contact_params)
      end
      current_reservation.update_attributes!(reservation_params.merge(contact: contact))
    else
      current_reservation.update_attributes!(reservation_params)
    end

    render json: current_reservation.as_json(include: :contact)
  rescue => e
    render json: { error: e.message }, status: 400
  end

  def sortings
    render json: Reservation.sorting_descriptions
  end

  private
  def current_reservation
    @current_reservation ||= Reservation.find(params[:id])
  end

  def index_params
    params.permit(:search, :page, :sorting_id)
  end

  def contact_params
    params.require(:contact).permit(:id, :name, :birthdate, :contact_type_id, :phone)
  end

  def reservation_params
    params.permit(:description, :date, :ranking, :favorite)
  end
end
