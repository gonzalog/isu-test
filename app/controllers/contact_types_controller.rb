class ContactTypesController < ApplicationController
  def index
    render json: ContactType.all.as_json
  end
end
