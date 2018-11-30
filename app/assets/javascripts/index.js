$(document).on('turbolinks:load', function() {
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
            ${ message.content }
          </div>
          ${addImgTag}
        </div>
        `
        return html;
    }
    $(function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        var set_Interval = setInterval(update,10000);
      } else {
        clearInterval(set_Interval);
      };
    });
    function update(){
      var message_id = ''
      if($('.contents__right--main__message_wrapper')[0]){
        var message_id = $('.contents__right--main__message_wrapper:last').attr('data-message-id');
      }else{
        var message_id = 0
      }
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { message: { id: message_id } },
        dataType: 'json'
      })
      .done(function(data){
        $.each(data,function(i,data) {
          var html = buildHTML(data);
          $('.contents__right--main__message').append(html);
        });
        $('#scroll').animate({scrollTop:$('#scroll')[0].scrollHeight});
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    };
  });
});
