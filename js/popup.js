$(".share").click(function()
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.cookies.get({url: "https://player.me/", name: "playerme_session"}, function(cookie)
		{
			$.ajax({
				type: "POST",
				url: "https://player.me/api/v1/feed",
				data: {"post": ($(".comment").val()!="")?$(".comment").val()+"<br><br>"+tabs[0].url:tabs[0].url},
				dataType: "json"
			});
		});
	});
});