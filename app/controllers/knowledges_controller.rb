class KnowledgesController < ApplicationController
  before_action :set_knowledge, only: %i[ show edit update destroy ]
  before_action :authenticate_responder!, except: %i[ index show ]

  # GET /knowledges or /knowledges.json
  def index
    @knowledges = Knowledge.all.includes(:question, :responder)
  end

  # GET /knowledges/1 or /knowledges/1.json
  def show
  end

  # GET /knowledges/new
  def new
    @knowledge = Knowledge.new
  end

  # GET /knowledges/1/edit
  def edit
  end

  # POST /knowledges or /knowledges.json
  def create
    @knowledge = Knowledge.new(knowledge_params)

    respond_to do |format|
      if @knowledge.save
        format.html { redirect_to @knowledge, notice: "Knowledge was successfully created." }
        format.json { render :show, status: :created, location: @knowledge }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @knowledge.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /knowledges/1 or /knowledges/1.json
  def update
    respond_to do |format|
      if @knowledge.update(knowledge_params)
        format.html { redirect_to @knowledge, notice: "Knowledge was successfully updated." }
        format.json { render :show, status: :ok, location: @knowledge }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @knowledge.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /knowledges/1 or /knowledges/1.json
  def destroy
    @knowledge.destroy!

    respond_to do |format|
      format.html { redirect_to knowledges_path, status: :see_other, notice: "Knowledge was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_knowledge
      @knowledge = Knowledge.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def knowledge_params
      params.require(:knowledge).permit(:title, :body, :description, :category, :slug, :question_id, :responder_id)
    end
end
