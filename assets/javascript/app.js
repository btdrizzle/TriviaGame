$(document).ready(function() {
   
    var trivia = [{question: "Which big name actor's character dies in the opening scene of the movie Scream?", answers: 
                ["Ashton Kutcher", "Drew Barrymore", "Sarah Michelle Gellar", "Tara Reid"], picture: "./assets/images/barrymore.jpeg",
                    correctAnswer: "Drew Barrymore"},
                {question: "Which horror movie was a big break for Jamie Lee Curtis?",answers:
                ["Black Christmas", "Gremlins", "Friday the 13th", "Halloween"], picture: "./assets/images/jamielee.jpg",
                    correctAnswer: "Halloween"},
                {question: "Which horror movie villain wore a distinctive sweater?",answers:
                    ["Freddy Krueger", "Chuckie", "Leatherface", "Jason"], picture: "./assets/images/freddy.jpg",
                    correctAnswer: "Freddy Krueger"},
                {question: "Which movie was the first with creepy calls coming from within the house?",answers:
                    ["When a Stranger Calls", "Disturbia", "Black Christmas", "Rear Window"], picture: "./assets/images/bxmas.jpg",
                    correctAnswer: "Black Christmas"},
                {question: "Who is the villain in the original Friday the 13th?", answers:
                    ["Leatherface", "Jason", "Freddy", "Jason's Mom"], picture: "./assets/images/jasonmom.jpg",
                    correctAnswer: "Jason's Mom"},
                {question: "In the movie I Know What You Did Last Summer, what is the killer's preferred murder weapon?", answers:
                    ["Knife", "Hook", "Scissors", "Axe"], picture: "./assets/images/hook.jpg",
                    correctAnswer: "Hook"},
                {question: "In the movie Psycho, where does the most famous murder occur?", answers:
                    ["the kitchen", "the house", "the shower", "the balcony"], picture: "./assets/images/shower.jpg",
                    correctAnswer: "the shower"},
                {question: "Where does the chainsaw massacre occur?", answers:
                    ["Ohio", "Virginia", "Louisiana", "Texas"], picture: "./assets/images/texas.jpg",
                    correctAnswer: "Texas"},
                {question: "Who appears when you say their name 5 times while looking at a mirror?", answers:
                    ["Bloody Mary", "Candyman", "Jason", "Freddy"], picture: "./assets/images/candyman.png", 
                    correctAnswer: "Candyman"},
                {question: 'In which movie were people terrorized "because you were home?"', answers:
                    ["The Strangers", "Last House on the Left", "Day of the Dead", "Cabin in the Woods"], picture: "./assets/images/strangers.jpg",
                    correctAnswer: "The Strangers"}
    ];
    var questionNumber = 1;
    var correct = 0;
    var incorrect = 0;
    var unAnswered = 0;
    var randomInts = [0,1,2,3,4,5,6,7,8,9];
    var iterator = 0;
    var IntervalId;
    var randomQuestion;

    //Music playlist
    var playlist = ["./assets/audio/halloween.mp3",
    "./assets/audio/nightmare.mp3",
    "./assets/audio/psycho.mp3",
    "./assets/audio/friday.mp3"];

    function bgAudio() {
        var playlist_index;
        playlist_index = 0;
        audio = new Audio();
        audio.src = playlist[0];
        audio.loop = false;
        audio.volume = 0.25;
        audio.play();
        audio.addEventListener('ended', function() {
            switchTrack();
        });
        function switchTrack() {
            if(playlist_index == (playlist.length -1)) {
                playlist_index = 0;
            }
            else {
                playlist_index++;
            }
            audio.src = playlist[playlist_index];
            audio.play();
        }
    }

    //Timer for each question
    var timer = {
        time: 10,
        reset: function() {
            timer.time = 10;
        },
        start: function() {
            intervalId = setInterval(timer.count, 1000);
        },
        stop: function() {
            clearInterval(intervalId);
        },
        count: function() {
            timer.time--;
            $('#timer').text(timer.time);
            if(timer.time === 0) {
                timer.stop();
                $('#timer').text("Time's up!");
                questionEnd();
            }
        
        },

    };

    //Durstenfeld shuffle to shuffle questions differently each time
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
    //This function starts the game
    function clickToStart() {
        var bigButton = $('<button>');
        bigButton.attr('id','bigButton')
                .addClass('text-center btn btn-dark')
                .attr('type','button')
                .text("Click to Start!");
        
        $('#next').html(bigButton);
        bigButton.on('click', function () {
            bgAudio();
            playGame();
        })
    };
    //This function starts the game over from square one
    function endGame() {
        var bigButton = $('<button>');
        bigButton.attr('id','bigButton')
                .addClass('text-center btn btn-dark')
                .attr('type','button')
                .text("Click to Play Again!");
        
        $('#next').empty();
        $('#questionNumber').empty();
        $('#question').empty();
        $('#questionEnd').empty();
        $('#timer').empty();
        $('#next').append('<h3>Game Over!  Answers: ' + correct + ' correct, ' + incorrect + " incorrect and " + unAnswered + ' unanswered.</h3>');
        $('#next').append(bigButton);
        bigButton.on('click', function () {
            correct = 0;
            incorrect = 0;
            unAnswered = 0;
            questionNumber = 1;
            iterator = 0;
            shuffleArray(randomInts);
            console.log(randomInts);
            for(i = 0; i < trivia.length; i++) {
                shuffleArray(trivia[i].answers);
            }
            playGame();
        })
    };
    function questionEnd() {
        if($("input[name='quiz']:checked").val() === trivia[randomQuestion].correctAnswer) {
            correct++;
            $('#choices').empty();
            $('#questionEnd').html('<h4>You got the question right!  The answer is ' + trivia[randomQuestion].correctAnswer + '.</h4>');
            $('#next').append('<img src=' + trivia[randomQuestion].picture + '></img>');
        }
        else if(!$("input[name='quiz']:checked").val()) {
            unAnswered++;
            $('#choices').empty();
            $('#questionEnd').html("<h4>You didn't answer!  The answer is " + trivia[randomQuestion].correctAnswer + '.</h4>');
            $('#next').append('<img src=' + trivia[randomQuestion].picture + '></img>');
        }
        else {
            incorrect++;
            $('#choices').empty();
            $('#questionEnd').html('<h4>You got the question wrong!  The answer is ' + trivia[randomQuestion].correctAnswer + '.</h4>');
            $('#next').append('<img src=' + trivia[randomQuestion].picture + '></img>');
        }
        //Either resets to next question or the game ends
        if(questionNumber < trivia.length) {
            questionNumber++;
            iterator++;
            setTimeout(function() {
                playGame();
            }, 3000);

        }
        else {
            setTimeout(function() {
                endGame();
            }, 3000);
        }
    }
    //This function is the meat of the game and starts over for each question
    function playGame() {
        timer.reset();
        $('#timer').empty();
        $('#questionNumber').empty();
        $('#question').empty();
        $('#choices').empty();
        $('#questionEnd').empty();
        $('#next').empty();
        $('#questionNumber').html('<h2>Question Number ' + questionNumber + '</h2>');
        randomQuestion = randomInts[iterator];
        $('#question').html('<h4>' + trivia[randomQuestion].question + '<h4>');
        trivia[randomQuestion].answers.forEach(function(answer) {
            var paragraph = $('<p>');
            var label = $('<label>');
            var input = $('<input>').attr({type: "radio", name: "quiz", value: answer});
            $('#choices').append(paragraph);
            paragraph.addClass('lead');
            paragraph.append(label);
            label.append(input);
            label.append(answer);
        });
        $('#timer').text(timer.time);
        timer.start();
    };

    clickToStart();

});
