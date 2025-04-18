class QuestionsController < ApplicationController
  before_action :set_question, only: %i[ show edit update destroy ]
  before_action :authenticate_responder!, except: %i[ new create show_by_token ]

  # GET /questions or /questions.json
  def index
    @questions = Question.all.includes(:responder, :answers)
  end

  # GET /questions/1 or /questions/1.json
  def show
    @answers = @question.answers.order(created_at: :asc)
    @knowledge = @question.knowledge
    @new_answer = Answer.new(question: @question)
  end

  # GET /questions/token/:token
  def show_by_token
    @question = Question.find_by_token(params[:token])

    if @question.nil?
      redirect_to root_path, alert: "Question not found"
      return
    end

    @answers = @question.answers.order(created_at: :asc)
    @knowledge = @question.knowledge
    @new_answer = Answer.new(question: @question)

    render :show
  end

  # GET /questions/new
  def new
    @question = Question.new
  end

  # GET /questions/1/edit
  def edit
  end

  # POST /questions or /questions.json
  def create
    # Create question with open status and assign to available responder
    @question = Question.new(question_params)
    @question.status = :open
    @question.responder = Responder.first if @question.responder_id.blank? # Simple assignment for now

    respond_to do |format|
      if @question.save
        # Generate URL for user to access their question
        question_url = question_token_url(token: @question.token)

        format.html { redirect_to question_url, notice: "Question was successfully created. Please bookmark this page to return to your question." }
        format.json { render :show, status: :created, location: @question }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /questions/1 or /questions/1.json
  def update
    respond_to do |format|
      if @question.update(question_params)
        format.html { redirect_to @question, notice: "Question was successfully updated." }
        format.json { render :show, status: :ok, location: @question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /questions/1/close
  def close
    @question = Question.find(params[:id])

    if !responder_signed_in?
      respond_to do |format|
        format.html { redirect_to @question, alert: "Only responders can close questions." }
        format.json { render json: { error: "Unauthorized" }, status: :unauthorized }
      end
      return
    end

    @question.status = :closed

    respond_to do |format|
      if @question.save
        format.html { redirect_to @question, notice: "Question was successfully closed." }
        format.json { render :show, status: :ok, location: @question }
      else
        format.html { redirect_to @question, alert: "Failed to close question." }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # GET /questions/:id/convert_to_knowledge
  def convert_to_knowledge
    @question = Question.find(params[:id])

    unless @question.closed?
      redirect_to @question, alert: "Only closed questions can be converted to knowledge base entries"
      return
    end

    @knowledge = Knowledge.new(
      question: @question,
      responder: current_responder,
      title: @question.title,
      body: "",
      description: @question.body.truncate(250),
      category: :general
    )

    # Pre-populate the body with question and answers
    body = "## Original Question\n\n#{@question.body}\n\n"

    @question.answers.order(created_at: :asc).each_with_index do |answer, index|
      if answer.responder_id.nil?
        body += "\n\n### Follow-up Question #{index + 1}\n\n#{answer.body}"
      else
        body += "\n\n### Response #{index + 1}\n\n#{answer.body}"
      end
    end

    @knowledge.body = body

    # Render our dedicated conversion template
    render :convert_to_knowledge
  end

  # DELETE /questions/1 or /questions/1.json
  def destroy
    @question.destroy!

    respond_to do |format|
      format.html { redirect_to questions_path, status: :see_other, notice: "Question was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def question_params
      params.require(:question).permit(:title, :body, :email, :pseudonym, :responder_id, :status, :anonymous_submission)
    end
end
