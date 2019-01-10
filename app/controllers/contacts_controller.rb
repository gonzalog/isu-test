class ContactsController < ApplicationController
  def index
    results = search_results.page(index_params[:page])

    render json: {
      items: results.as_json,
      next_page: results.next_page,
      prev_page: results.prev_page
    }
  end

  def search_results
    if index_params[:query]
      Contact.where("contacts.name ~* :query", query: index_params[:query])
    else
      Contact.all
    end
  end

  private
  def index_params
    params.permit(:query, :page)
  end
end
