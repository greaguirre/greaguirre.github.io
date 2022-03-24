function index(data){
    $content = $('#content');
    $content.append("<div class='container'></div>");
    $content = $content.find(".container")
    category = "";
    for( var i = 0; i < data.length ; i++ ){
	if( category != data[ i ][ "category" ] ){
	    category = data[ i ][ "category" ];
	    $content.append( "<h2> <img src='images/quest.png'>" + category + "</h2>" );
	}
	$content.append( "<a class='question' href='questionary/?id="+i+"'><img src='images/right-arrow.png'> " + data[ i ]["title"] + "</a>" );
    }
}

$(window).on('load', function(){
    $.getJSON('questions.json', function(jd){
	data = JSON.parse(jd);
	index(data);
    });
});
