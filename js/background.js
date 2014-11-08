chrome.contextMenus.create(
	{
		"type": "normal",
		"title": "Share on player.me",
		"onclick": function(info, tab)
		{
			$.ajax({
				type: "POST",
				url: "https://player.me/api/v1/feed",
				data: {"post": "["+tab.title+"]("+tab.url+")"},
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

var notifications = 0;

var socket = eio("wss://player.me/engineio?EIO=2&transport=websocket");
socket.on("open", function()
{
	socket.on("message", function(data){
		data = $.parseJSON(data)
		if(data.command == "notify")
		{
			notifications = 0;
			$.each(data.data.notifications, function(key, value)
			{
				if(value.unread)
				{
					notifications = notifications + 1;
				}
			});
			chrome.browserAction.setBadgeText({text: notifications.toString()});
		}
	});
	socket.on("close", function(){});
});