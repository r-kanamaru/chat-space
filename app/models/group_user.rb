class GroupUser < ApplicationRecord
  belongs_to :group
  belongs_to :user

  def show_first_group_user
    first_group_user = group_user.first.created_at
  end

end
