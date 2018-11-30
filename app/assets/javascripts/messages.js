$(function(){

  function buildHTML(message){
    var addImgTag = (message.image.url !== null)? `<img src="${ message.image.url }", class="contents__right--main__message_image">`:''

    var html =`
      <li class="contents__right--main__message_wrapper" data-message-id="${message.id}">
        <div class="contents__right--main__message_name">
          ${ message.user_name }
        </div>
        <div class="contents__right--main__message_day">
          ${ message.created_at }
        </div>
        <div class="contents__right--main__message_text">
          ${ message.message }
        </div>
        ${addImgTag}
      </div>
      `
    return html;
  }

  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents__right--main__message').append(html);
      $('.input').val('');
      $('.image_file_select').val('');
      $('#scroll').animate({scrollTop:$('#scroll')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました')
    });
  });
});
