$(function () {
    $('#register').submit(function (event) {   
        event.preventDefault();
        var form_data = $(this);
        create('create',form_data);
    });
    
    $('#contact').submit(function (event) {   
        event.preventDefault();
        var form_data = $(this);
        create('create_msg',form_data);
    });
    
    function create(str,form_data){
        
        var formData = form_data.serialize();
        var url = "https://idoogu.com/"+str+".php";
        $.ajax({
          url: url,
          method:'POST',
          data: formData,
          success: function(data){
//              $("#ajax_msg").css("display","block").delay(5000).slideUp(500).html(data);
              $("#ajax_msg").css("display","block").delay(5000).slideUp(500);
              document.getElementById('register').reset();
          },
          error : function() { 
//              $("#ajax_msg").css("display","block").delay(5000).slideUp(500).html(data);
              $("#ajax_msg").css("display","block").delay(5000).slideUp(500);
          }
        });
    }
});