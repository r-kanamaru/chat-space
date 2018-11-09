class MessagesController < ApplicationController
before_action :set_group_date

def index
  @message=Message.new
  @messages=@group.messages.includes(:user)
end

def create
  @message=@group.messages.new(message_params)
  if @message.save
    redirect_to group_messages_path(@group), notice: "メッセージを送信しました"
  else
    flash.now[:alert]="メッセージを入力してください"
    @messages = @group.messages.includes(:user)
    render :index
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
