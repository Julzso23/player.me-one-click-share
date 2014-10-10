$(document).ready(function()
{
	$("#content").hide();
	$("#auth").hide();
	$("#authErr").hide();
	$("#loading").show();

	$.ajax({
		type: "GET",
		url: "https://player.me/api/v1/users/default/activities",
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
	$("#loading").fadeIn(500);
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		$.ajax({
			type: "POST",
			url: "https://player.me/api/v1/feed",
			data: {"post": ($("input#comment").val()!="") ? $("input#comment").val()+" [&nbsp;]("+tabs[0].url+")" : tabs[0].url},
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
					url: "https://player.me/api/v1/users/default/activities",
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
			url: "https://player.me/api/v1/auth/login",
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

				$("#content").fadeIn(500);
			}
		});
	}
});