json.user_name  @message.user.name
json.user_id  @message.user_id
json.message  @message.content
json.image @message.image
json.created_at @message.created_at.to_s(:published_on)
json.id @message.id

