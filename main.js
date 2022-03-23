function clear(){
    $content = $('#content');
    $content.html("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function questions(data, id){
    clear();
    $content = $('#content');
    $content.append("<div class='page'><div class='container'></div></div>");
    $content = $content.find(".container");
    $content.append("<p class='back'> <img src='images/back-arrow.png'> Go back</p>");
    $content.append("<h2 class='titlepage'>"+data[ id ][ "title" ]+"</h2>")
    $content.append("<h3>"+data[ id ][ "description" ]+"</h3>")
    $(".back").click(function(){index(data);})
    problems = data[ id ][ "questions" ];
    for( var i = 0; i < problems.length ; i++ ){
	$content.append(function(){
	    sentence = "<p class='problem'><b>" + (i+1) + ")</b> ";
	    parts = problems[ i ][ "parts" ];

	    for( var j = 0; j < parts.length ; j++ ){
		if( parts[ j ][ "type" ] == "text" )
		    sentence += parts[ j ][ "value" ] + " ";
		else
		    sentence += '<input data-ans="' + parts[ j ][ "answer" ]+'"> ';
	    }

	    sentence += "<span class='botoncase'>";
	    sentence += "<span class='check boton'>Check</span>";
	    sentence += "<span class='show boton'>Show</span>";
	    sentence += "</span>";
	    sentence += "<br>";
	    sentence += "<span class='ans'><br></span>";
	    sentence += "<br>";

	    sentence += "</p>";
	    return sentence;
	});
    }

    $(".check").click(function(){
	$(this).parent().parent().find('input').each(function(indx){
	    if( $(this).val() == $(this).data('ans') ){
		$(this).removeClass('wrong');
		$(this).addClass('right');
	    } else {
		$(this).removeClass('right');
		$(this).addClass('wrong');
	    }
	});
    });
    $(".show").click(function(){
	$ans = $(this).parent().parent().find('.ans');
	$ans.html("<span>| </span>");
	$(this).parent().parent().find('input').each(function(indx){
	    $ans.append($(this).data('ans')+"<span> | </span>");
	})
    });
}

function index(data){
    clear();
    $content = $('#content');
    $content.append("<div class='container'></div>");
    $content = $content.find(".container")
    category = "";
    for( var i = 0; i < data.length ; i++ ){
	if( category != data[ i ][ "category" ] ){
	    category = data[ i ][ "category" ];
	    $content.append( "<h2> <img src='images/quest.png'>" + category + "</h2>" );
	}
	$content.append( "<p class='question' data-id="+i+"><img src='images/right-arrow.png'> " + data[ i ]["title"] + "</p>" );
    }
    $(".question").click(function(){
	id = questions(data, $(this).data("id"));
    });

}

$(window).on('load', function(){
    $.getJSON('questions.json', function(jd){
	data = JSON.parse(jd);
	index(data);
    });
});
