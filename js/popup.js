URL = 'https://player.me';

function setPage(page)
{
	$("section.page").hide();
	$("#authErr").hide();
	if (page == "loading")
	{
		$("#loading").fadeIn(250);
	}
	else
	{
		$("#loading").hide();
		$("section#" + page).fadeIn(250);
	}
}

$(document).ready(function()
{
	$("section.page").hide();
	setPage("loading");

	$.ajax({
		type: "GET",
		url: URL + "/api/v1/users/default/activities",
		data: {sources: "playerme"},
		dataType: "json"
	}).done(function(data)
	{
		if(data.results.length == 0)
		{
			setPage("auth");
		}
		else
		{
			setPage("content");
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

$("#share").click(function()
{
	setPage("loading");
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
				setPage("auth");
			}
			else
			{
				$.ajax({
					type: "GET",
					url: URL + "/api/v1/users/default/activities",
					data: {sources: "playerme"},
					dataType: "json"
				}).done(function(data)
				{
					if(data.results.length == 0)
					{
						setPage("auth");
					}
					else
					{
						setPage("content");
						$.each(data.results, function(key, value)
						{
							if(value.data.post.indexOf(tabs[0].url) != -1)
							{
								$("input#comment").val("");
								$("#share").attr("disabled", "disabled");
								$("#share").html("<span class='glyphicon glyphicon-ok-circle'></span> You've shared this page!");
							}
						});
					}
				});
			}
		});
	});
});

$("#login").click(function()
{
	if($("input#user").val()=="" || $("input#password").val()=="")
	{
		$("#authErr").fadeIn(500);
	}
	else
	{
		setPage("loading");
		$.ajax({
			type: "POST",
			url: URL + "/api/v1/auth/login",
			data: {"login": $("input#user").val(), "password": $("input#password").val(), "remember": true},
			dataType: "json"
		}).done(function(data)
		{
			if(data.results[0] == "Wrong username/password")
			{
				setPage("auth");
				$("#authErr").fadeIn(600);
			}
			else
			{
				setPage("content");
			}
		});
	}
});