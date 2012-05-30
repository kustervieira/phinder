class FindersController < ApplicationController
  # GET /finders
  # GET /finders.json
  def index
    @finders = Finder.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @finders }
    end
  end

  # GET /finders/1
  # GET /finders/1.json
  def show
    @finder = Finder.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @finder }
    end
  end

  # GET /finders/new
  # GET /finders/new.json
  def new
    @finder = Finder.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @finder }
    end
  end

  # GET /finders/1/edit
  def edit
    @finder = Finder.find(params[:id])
  end

  # POST /finders
  # POST /finders.json
  def create
    @finder = Finder.new(params[:finder])

    respond_to do |format|
      if @finder.save
        format.html { redirect_to @finder, notice: 'Finder was successfully created.' }
        format.json { render json: @finder, status: :created, location: @finder }
      else
        format.html { render action: "new" }
        format.json { render json: @finder.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /finders/1
  # PUT /finders/1.json
  def update
    @finder = Finder.find(params[:id])

    respond_to do |format|
      if @finder.update_attributes(params[:finder])
        format.html { redirect_to @finder, notice: 'Finder was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @finder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /finders/1
  # DELETE /finders/1.json
  def destroy
    @finder = Finder.find(params[:id])
    @finder.destroy

    respond_to do |format|
      format.html { redirect_to finders_url }
      format.json { head :no_content }
    end
  end
end
