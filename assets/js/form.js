// Suboptimal code, but it does the trick
$(function() {
  const bucket = '//wiredcraft-com.s3.ap-northeast-2.amazonaws.com/';
  const download = 'https://s3-ap-northeast-2.amazonaws.com/wiredcraft-com/';
  var formSubmit = true;

  // UUID generation functions to prevent file collision
  function guid() { return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4(); }
  function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }

  // Uploads attachments to S3
  $('input[type=file]').change(function(e){
    var field = $(this);
    if (field.val()) {
      var form = $(this).parents('form:first');

      var file = field[0].files[0];
      var filename = $(this).val();
      var uuid = guid();
      var fd = new FormData();

      field.attr('disabled', true);
      field.parent().next('.message').remove();
      form.children('input[type=submit]').attr('disabled', true);
      field.parent().addClass('processing');
      formSubmit = false;

      fd.append('key', uuid + '-' + file.name);
      fd.append('acl', 'bucket-owner-full-control');
      fd.append('Content-Type', file.type);
      fd.append('file', file);

      $.ajax({
        type : 'POST',
        url : bucket,
        data : fd,
        processData: false,
        contentType: false,
        success: function(json) {
          formSubmit = true;
          form.children('input[type=submit]').attr('disabled', false);
          field.attr('disabled', false);
          field.parent().removeClass('processing');

          console.log('Success');

          var url = download + uuid + '-' + file.name;
          var link = '<div class="uploaded"><a href="'+ url +'" target="_blank">'+ file.name +'</a></div>';

          field.next('input[type=hidden]').val(url);
          field.parent().prev('.uploaded').remove();
          field.parent().before(link);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          formSubmit = true;
          form.children('input[type=submit]').attr('disabled', false);
          field.attr('disabled', false);
          field.parent().removeClass('processing');

          var message = '<p class="message error">File upload failed.</p>';
          field.parent().after(message);

          console.log('Upload error: ' + XMLHttpRequest.responseText);
        }
      });
    }
  });

  // Post form data to zapier on submit
  $('form.ajax').submit(function(e){
    e.preventDefault();

    if (!formSubmit) { return false; }

    $(this).addClass('loading');

    var form = $(this);
    var formId = $(this).attr('id');
    var url = $(this).attr('action');
    var type = $(this).attr('method');
    $.ajax({
        url: url,
        type: type,
        data: $(this).serialize(),
        success: function() {
          form.removeClass('loading').addClass('submitted');
          trackJopApply();
        }
    });
  });
});
