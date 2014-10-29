URL = 'https://player.me';
postHistory = [];

function displayHistory()
{
	$.each(postHistory, function(key, value)
	{
		$("section#history").append("<article class='post'>" +
				value.data.post +
				((value.data.metas.length == 1)&&(value.data.metas[0].url != "undefined")?
				"<div class='meta'>" +
					"<a href='"+value.data.metas[0].url+"' rel='nofollow' target='_blank'><img src='http:"+value.data.metas[0].thumbnail+"'></a>" +
					((value.data.metas[0].title != null)?"<div class='title'><a href='"+value.data.metas[0].url+"' rel='nofollow' target='_blank'>"+value.data.metas[0].title+"</a></div>":"") +
					"<div class='clearfix'></div>" +
				"</div>":"") +
			"</article>");
	});
}

$(document).ready(function()
{
	$("#content").hide();
	$("#history").hide();
	$("#auth").hide();
	$("#authErr").hide();
	$("#navigation").hide();
	$("#loading").show();

	$.ajax({
		type: "GET",
		url: URL + "/api/v1/users/default/activities",
		data: {type: "playerme"},
		dataType: "json"
	}).done(function(data)
	{
		$("#loading").hide();
		if(data.results.length == 0)
		{
			$("#auth").fadeIn(500);
		}
		else
		{
			postHistory = data.results;
			displayHistory();
			$("#navigation").fadeIn(500);
			$("#content").fadeIn(500);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
			{
				$.each(data.results, function(key, value)
				{
					if(value.data.post.indexOf(tabs[0].url) != -1)
					{
						$("#share").attr("disabled", "disabled");
						$("#share").html("<span class='glyphicon glyphicon-ok-circle'></span> You've shared this page!");
					}
				});
			});
		}
	});
});

$("button#share").click(function()
{
	$("#content").hide();
	$("#navigation").hide();
	$("#loading").fadeIn(500);
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		$.ajax({
			type: "POST",
			url: URL + "/api/v1/feed",
			data: {"post": ($("input#comment").val()!="") ? $("input#comment").val()+" [&nbsp;]("+tabs[0].url+")" : "["+tabs[0].title+"]("+tabs[0].url+")"},
			dataType: "json"
		}).done(function(data)
		{
			if(data.results == "Must be logged on to do this")
			{
				$("#loading").hide();
				$("#auth").fadeIn(500);
			}
			else
			{
				$.ajax({
					type: "GET",
					url: URL + "/api/v1/users/default/activities",
					data: {type: "playerme"},
					dataType: "json"
				}).done(function(data)
				{
					$("#loading").hide();
					if(data.results.length == 0)
					{
						$("#auth").fadeIn(500);
					}
					else
					{
						postHistory = data.results;
						$("section#history").html("");
						displayHistory();
						$("#navigation").fadeIn(500);
						$("#content").fadeIn(500);
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
						{
							$.each(data.results, function(key, value)
							{
								if(value.data.post.indexOf(tabs[0].url) != -1)
								{
									$("input#comment").val("");
									$("#share").attr("disabled", "disabled");
									$("#share").html("<span class='glyphicon glyphicon-ok-circle'></span> You've shared this page!");
								}
							});
						});
					}
				});
			}
		});
	});
});

$("button#login").click(function()
{
	if($("input#user").val()=="" || $("input#password").val()=="")
	{
		$("#authErr").fadeIn(500);
	}
	else
	{
		$("#authErr").hide();
		$("#auth").hide();
		$("#loading").fadeIn(500);
		$.ajax({
			type: "POST",
			url: URL + "/api/v1/auth/login",
			data: {"login": $("input#user").val(), "password": $("input#password").val(), "remember": true},
			dataType: "json"
		}).done(function(data)
		{
			$("#loading").hide();
			if(data.results[0] == "Wrong username/password")
			{
				$("#auth").fadeIn(500);
				$("#authErr").fadeIn(600);
			}
			else
			{
				$("#navigation").fadeIn(500);
				$("#content").fadeIn(500);
			}
		});
	}
});

$("button#showPost").click(function()
{
	$("#history").hide();
	$("#content").fadeIn(500);
	$("button#showHistory").removeClass("selected");
	$("button#showPost").addClass("selected");
});
$("button#showHistory").click(function()
{
	$("#content").hide();
	$("#history").fadeIn(500);
	$("button#showPost").removeClass("selected");
	$("button#showHistory").addClass("selected");
});