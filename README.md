# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|e_mail|string|null: false|
|password|text|null: false|

### Association
- has_many :groups,through: :messages
- has_many :messages


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users,through: :mesages
- has_many:messages
- accepts_nested_attributes_for :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false,index: true,foreign_key: true|
|group_id|integer|null: false,index: true,foreign_key: true|
|body|text|null: false|
|image|string|null: false|

### Association
- belongs_to :group
- belongs_to :user

* ...
