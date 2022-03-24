function questions(data, id){
    $content = $('#content');
    $content.append("<div class='page'><div class='container'></div></div>");
    $content = $content.find(".container");
    $content.append("<a href='/' class='back'> <img src='../images/back-arrow.png'> Go back</a>");
    $content.append("<h2 class='titlepage'>"+data[ id ][ "title" ]+"</h2>");
    $content.append("<h3>"+data[ id ][ "description" ]+"</h3>");
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

$(window).on('load', function(){
    $.getJSON('../questions.json', function(jd){
	data = JSON.parse(jd);

	let searchParams = new URLSearchParams(window.location.search)
	searchParams.has('id')
	let id = searchParams.get('id')
	console.log(id);

	console.log( id || 0 );
	questions(data, id || 0);
    });
});
