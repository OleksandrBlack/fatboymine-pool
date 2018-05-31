$('.test-ping').click(function(){
    var ping = new Date;
    $.ajax({ 
        url: "/",
        cache:false,
        success: function(output){ 
            ping = new Date - ping;
            $('.ping').text("Ping " + ping + "ms");
        }
    });
});