$("#test").click(function(){
    $("div").each( function(){
        var msg = this.id,
            ip = $(this).attr("value"),
            avg = 0,
            cpt = 0,
            i=0;
        for(i=0; i<10;i++){
            var start = $.now();            
            $.ajax({ type: "HEAD",
                    url: "http://"+ip,
                    cache:false,
                    complete: function(output){ 
                        var ping = $.now() - start;
                        if (ping < 1000) { // useless?
                            cpt++;
                            avg+= ping/cpt - avg/cpt; //update average val
                            $("#"+msg).text(avg+" ms (on "+cpt+"tests)");
                            if(avg < 200) {
                                $("#"+msg).css({"color": "green"});
                            } else if (avg < 500) {
                                $("#"+msg).css({"color": "orange"});
                            } else {
                                $("#"+msg).css({"color": "red"});
                            }                                
                        }
                    }
              });
        }        
    });
});