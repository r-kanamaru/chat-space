class MessagesController < ApplicationController
before_action :set_group_date

def index
  @message=Message.new
  @messages=@group.messages.includes(:user)
  respond_to do |format|
    format.html
    format.json{ @new_message = Message.where('id > ?', params[:message][:id]) }
  end
end

def create
  @message=@group.messages.create(message_params)
    respond_to do |format|
      format.html { redirect_to group_messages_path(@group), notice: "html!" }
      format.json
    end
end

private

def message_params
  params.require(:message).permit(:content, :image).merge(user_id:current_user.id)
end

def set_group_date
  @group=Group.find(params[:group_id])
end

end
