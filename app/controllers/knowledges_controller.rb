class KnowledgesController < ApplicationController
  before_action :set_knowledge, only: %i[ show edit update destroy ]
  before_action :authenticate_responder!, except: %i[ index show ]

  # GET /knowledges or /knowledges.json
  def index
    base_query = Knowledge.all.includes(:question, :responder).order(created_at: :desc)

    if params[:category].present? && Knowledge.categories.key?(params[:category])
      base_query = base_query.where(category: params[:category])
    end

    if params[:search].present?
      search_term = "%#{params[:search]}%"
      base_query = base_query.where("title LIKE ? OR description LIKE ? OR body LIKE ?",
                                   search_term, search_term, search_term)
    end

    @knowledges = base_query
  end

  # GET /knowledges/1 or /knowledges/1.json
  def show
    # Find related knowledge entries in the same category
    @related_knowledges = Knowledge.where(category: @knowledge.category)
                                  .where.not(id: @knowledge.id)
                                  .order(created_at: :desc)
                                  .limit(3)
                                  .includes(:responder)
  end

  # GET /knowledges/new
  def new
    @knowledge = Knowledge.new

    # Pre-populate with question data if coming from a question
    if params[:question_id]
      @question = Question.find(params[:question_id])

      # Ensure the question is closed
      unless @question.closed?
        redirect_to @question, alert: "Only closed questions can be converted to knowledge base entries"
        return
      end

      @knowledge.question = @question
      @knowledge.title = @question.title
      @knowledge.description = @question.body.truncate(250)

      # Pre-populate with question and answers
      body = "## Original Question\n\n#{@question.body}\n\n"

      @question.answers.order(created_at: :asc).each_with_index do |answer, index|
        if answer.responder_id.nil?
          body += "\n\n### Follow-up Question #{index + 1}\n\n#{answer.body}"
        else
          body += "\n\n### Response #{index + 1}\n\n#{answer.body}"
        end
      end

      @knowledge.body = body
    end
  end

  # GET /knowledges/1/edit
  def edit
  end

  # POST /knowledges or /knowledges.json
  def create
    @knowledge = Knowledge.new(knowledge_params)
    @knowledge.responder = current_responder

    respond_to do |format|
      if @knowledge.save
        format.html { redirect_to @knowledge, notice: "Knowledge base entry was successfully created." }
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
        format.html { redirect_to @knowledge, notice: "Knowledge base entry was successfully updated." }
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
      format.html { redirect_to knowledges_path, status: :see_other, notice: "Knowledge base entry was successfully deleted." }
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
      params.require(:knowledge).permit(:title, :body, :description, :category, :slug, :question_id)
    end
end
