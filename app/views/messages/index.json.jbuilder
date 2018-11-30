if @new_message.present?
  json.array! @new_message do |message|
    json.user_name  message.user.name
    json.user_id  message.user_id
    json.content  message.content
    json.image message.image
    json.created_at message.created_at
    json.id @message.id
  end
end

