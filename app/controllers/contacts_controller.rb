class ContactsController < ApplicationController
  def index
    results = ordered_results.page(index_params[:page])

    render json: {
      items: results.as_json(include: :contact_type),
      next_page: results.next_page,
      prev_page: results.prev_page,
      total_pages: results.total_pages,
      current_page: results.current_page
    }
  end

  def update
    current_contact.update!(contact_params)
    render json: current_contact.as_json(include: :contact_type)
  rescue => e
    render json: { error: e.message }, status: 400
  end

  def show
    render json: current_contact.as_json(include: :contact_type)
  end

  def destroy
    current_contact.destroy!
    render body: nil, status: :no_content
  rescue => e
    render json: { error: e.message }, status: 400
  end

  def create
    contact = Contact.create!(contact_params)
    render json: contact.as_json(include: :contact_type)
  rescue => e
    render json: { error: e.message }, status: 400
  end

  private
  def ordered_results
    way = index_params[:desc] == 'true' ? :desc : :asc
    if index_params[:order_by]
      search_results.order(index_params[:order_by] => way)
    else
      search_results
    end
  end

  def search_results
    if index_params[:query]
      Contact.where("contacts.name ~* :query", query: index_params[:query])
    else
      Contact.all
    end
  end

  def index_params
    params.permit(:query, :page, :order_by, :desc)
  end

  def current_contact
    @current_contact ||= Contact.find(params[:id])
  end

  def contact_params
    params.permit(:name, :phone, :contact_type_id, :birthdate)
  end
end
