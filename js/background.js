chrome.contextMenus.create(
	{
		"type": "normal",
		"title": "Share on player.me",
		"onclick": function(info, tab)
		{
			$.ajax({
				type: "POST",
				url: "https://player.me/api/v1/feed",
				data: {"post": tab.url},
				dataType: "json"
			}).done(function(data)
			{
				if(data.results == "Must be logged on to do this")
				{
					chrome.notifications.create("", {"type": "basic", "iconUrl": "icon.png", "title": "ERROR", "message": "You must be logged into player.me to share."}, function(id){});
					chrome.tabs.create({"url": "https://player.me"});
				}
			});
		}
	}
);