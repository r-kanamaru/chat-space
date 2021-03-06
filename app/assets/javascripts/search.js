$(document).on('turbolinks:load', function() {
  var search_list = $('.user-search-result');
  function appendUser(user){
    var html = `
      <div class="chat-group-user clearfix add_user">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>`
    search_list.append(html);
  }
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix add_user">該当するユーザーがいません</div>`
    search_list.append(html);
  }
  $("#user-search-field").on("keyup",function(){
    var input = $(this).val();
    var group_id = $('.chat_group_id').val();
    if($("#user-search-field").val()==""){
      $(".add_user").remove();
    }else{
      $.ajax({
        type: 'GET',
        url: '/groups/search',
        data: {keyword: input,group_id: group_id},
        dataType: 'json'
      })
      .done(function(users){
        $(".user-search-result").empty();
        if(users.length !== 0 ){
          users.forEach(function(user){
            appendUser(user);
          });
        }else{
          appendNoUser('一致するユーザーはありません');
        }
      })
      .fail(function() {
        alert('検索失敗！');
      });
    }
  });
  $(document).on('click',".chat-group-user__btn--add",function(e){
    var user_name = $(this).prev('p').text();
    var user_id = $(this).attr("data-user-id");
    $(this).parent().remove();
    var added_member = $('#chat-group-users');
    var html = `
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-child'>
        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
        <p class='chat-group-user__name'>${user_name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
    added_member.append(html);
    return false;
  });
  $(document).on('click',".js-remove-btn",function(){
    $(this).parent().remove();
  });
});
