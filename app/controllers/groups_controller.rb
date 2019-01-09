class GroupsController < ApplicationController
  before_action :set_group, only: [:edit,:update]

def index
end

def new
  @group = Group.new
  @group.users << current_user
end

def create
  @group = Group.new(group_params)
  if @group.save
    redirect_to root_path, notice: "グループが作成されました"
  else
    render :new
  end
end

def update
  if @group.update(group_params)
    redirect_to group_messages_path(@group),notice: "グループを編集しました"
  else
    render :edit
  end
end

def search
  if params[:group_id].present?
    @group = Group.find(params[:group_id])
    @ids = @group.users.ids
    @users = User.where.not(id: @ids).where('name LIKE(?)', "#{params[:keyword]}%").limit(20)
  else
    @users = User.where.not(id:current_user.id).where('name LIKE(?)', "#{params[:keyword]}%").limit(20)
  end
  respond_to do|format|
    format.json
  end
end

private

def group_params
  params.require(:group).permit(:name, { :user_ids => [] })
end

def set_group
  @group=Group.find(params[:id])
end

end
