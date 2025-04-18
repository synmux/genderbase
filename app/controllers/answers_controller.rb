class AnswersController < ApplicationController
  before_action :set_answer, only: %i[ show edit update destroy ]
  before_action :authenticate_responder!, except: %i[ create ]

  # GET /answers or /answers.json
  def index
    @closed_questions = Question.closed.includes(:answers, :responder).where(knowledge: nil)
    @answers = Answer.includes(:question).where(responder: current_responder).order(created_at: :desc)
  end

  # GET /answers/1 or /answers/1.json
  def show
  end

  # GET /answers/new
  def new
    @answer = Answer.new
    @question = Question.find(params[:question_id]) if params[:question_id]
  end

  # GET /answers/1/edit
  def edit
  end

  # POST /answers or /answers.json
  def create
    @answer = Answer.new(answer_params)

    # Set responder if user is logged in
    @answer.responder = current_responder if responder_signed_in?

    # Check for token in params for user answers
    if params[:token].present? && !responder_signed_in?
      @question = Question.find_by_token(params[:token])
      if @question.nil?
        redirect_to root_path, alert: "Question not found"
        return
      end
      @answer.question = @question
    end

    question = @answer.question

    respond_to do |format|
      if @answer.save
        # Set question to in_progress if this is a responder answer to an open question
        if responder_signed_in? && question.open?
          question.update(status: :in_progress)
        end

        # Redirect based on user type
        if responder_signed_in?
          format.html { redirect_to question, notice: "Answer was successfully created." }
        else
          format.html { redirect_to question_token_path(token: question.token), notice: "Your response was successfully submitted." }
        end

        format.json { render :show, status: :created, location: @answer }
      else
        format.html do
          @question = question
          @answers = @question.answers.order(created_at: :asc)
          @new_answer = @answer
          render "questions/show", status: :unprocessable_entity
        end
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /answers/1 or /answers/1.json
  def update
    respond_to do |format|
      if @answer.update(answer_params)
        format.html { redirect_to @answer.question, notice: "Answer was successfully updated." }
        format.json { render :show, status: :ok, location: @answer }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /answers/1 or /answers/1.json
  def destroy
    question = @answer.question
    @answer.destroy!

    respond_to do |format|
      format.html { redirect_to question, status: :see_other, notice: "Answer was successfully deleted." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def answer_params
      permitted = params.require(:answer).permit(:body, :question_id)
      if responder_signed_in?
        permitted[:responder_id] = current_responder.id
      end
      permitted
    end
end
