var newUser = {};
var bestFriend = {
	diff: 100,
	name: "",
	image: ""
};

$('#submit').on('click', () => {
	var userName = $('#name').val().trim();
	var imag = $('#image').val().trim();
	var ans1 = $('#quest1').val().trim();
	var ans2 = $('#quest2').val().trim();
	var ans3 = $('#quest3').val().trim();
	var ans4 = $('#quest4').val().trim();
	var ans5 = $('#quest5').val().trim();

	if (userName === "" || imag === "" || ans1 === "" || ans2 === "" || ans3 === "" || ans4 === "" || ans5 === "") {
		alert("Please fill in all fields");	
	} else {
		newUser = {
			name: userName,
			photo: imag,
			scores: [ans1, ans2, ans3, ans4, ans5]
		};

		findFriend(newUser.scores);

		setTimeout(postData, 1500);

		function postData() {
			$.post({url: '/api/friends', contentType: 'application/json'}, JSON.stringify(newUser));
		}

		$('#name').val("");
		$('#image').val("");
		$('#quest1').val("");
		$('#quest2').val("");
		$('#quest3').val("");
		$('#quest4').val("");
		$('#quest5').val("");
	}
});

function findFriend(scores) {

	$.get('/api/friends', (friends) => {

		var count = 0;
		var arrayLength = friends.length;

		for (var i = 0; i < arrayLength; i++) {
			calcScoreDiff(scores, friends[i]);
			count++;		
		}		

		if (count === arrayLength) {
			$('#friendName').text(bestFriend.name);
			$('#friendImg').attr('src', bestFriend.image);
			$('#myModal').modal('toggle');
		}

		console.log(bestFriend)
	});	
}

function calcScoreDiff(user, friend) {

	var diff = 0;
	var count = 0;

	for (var i = 0; i < 5; i++) {
		diff += Math.abs(user[i] - friend.scores[i]);
		count++;
	}

	if (count === 5) {
		if (diff < bestFriend.diff) {
			bestFriend.diff = diff;
			bestFriend.name = friend.name;
			bestFriend.image = friend.photo;
		} else {
			return;
		}
		console.log(bestFriend)
	}  	
}