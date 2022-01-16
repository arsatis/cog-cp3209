function delay(t) {
  setTimeout('initFadeIn()', t);
}

function initFadeIn() {
  $("body").css("visibility", "visible");
  $("body").fadeIn(300);
}

function make_slides(f) {
  var slides = {};

  ////////// INSTRUCTIONS //////////

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions1 = slide({
    name : "instructions1",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.instructions2 = slide({
    name : "instructions2",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.instructionsH = slide({
    name : "instructionsH",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  ////////// CONDITIONS //////////

  slides.conditionA = slide({
    name : "conditionA",

    start: function() {
      document.getElementById('myVideo').addEventListener('ended',myHandler,false);
      function myHandler(e) { exp.go(); }
    },

    button : function() {
      document.getElementById('start-video').play();
      document.getElementById('myVideo').play(); //use exp.go() if and only if there is no "present" data.
      document.getElementById('buttonconda').style.display = 'none';
    }
  });

  slides.conditionB = slide({
    name : "conditionB",

    start: function() {
      document.getElementById('myVideo2').addEventListener('ended',myHandler,false);
      function myHandler(e) { exp.go(); }
    },

    button : function() {
      document.getElementById('start-video').play();
      document.getElementById('myVideo2').play(); //use exp.go() if and only if there is no "present" data.
      document.getElementById('buttoncondb').style.display = 'none';
    }
  });

  slides.conditionC = slide({
    name : "conditionC",

    start: function() {
      document.getElementById('myVideo3').addEventListener('ended',myHandler,false);
      function myHandler(e) { exp.go(); }
    },

    button : function() {
      document.getElementById('start-video').play();
      document.getElementById('myVideo3').play(); //use exp.go() if and only if there is no "present" data.
      document.getElementById('buttoncondc').style.display = 'none';
    }
  });

  /*
  var randomSort = function(arr){ 
    range = []
    output = []
  
    for(i = 0; i < arr.length; i++) {
      range = range.concat(i)
    }
  
    var getRandomFromBucket = function(bucket) {
      var randomIndex = Math.floor(Math.random()*bucket.length);
      return bucket.splice(randomIndex, 1)[0];
    }
  
    for (i = 0; i < arr.length; i++) { 
      randomIndex = getRandomFromBucket(range)
      output = output.concat(arr[randomIndex])
    }
    return output
  }
  */

  ////////// RELATION MATRIX //////////

  slides.matrixOne = slide({
    name : "matrixOne",
    start: function() {
      $(".err").hide();
      this.startTime = Date.now();
  
    },
    button : function() {

      if($('input[name=bulb1-bulb2]:checked').length == 0 | $('input[name=blue-bulb1]:checked').length == 0 | $('input[name=blue-bulb2]:checked').length == 0) {
        $(".err").show();
      } else {
  
        this.RT = (Date.now() - this.startTime) / 1000; // record time spent on trial
        this.log_responses();
  
        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        exp.go()
      }
  
    },
  
    log_responses : function() {
      append(exp.data,
        {
          "relationRT": this.RT,
          "relationOneTwo": $('input[name="bulb1-bulb2"]:checked').val(),
          "relationBlueOne": $('input[name="blue-bulb1"]:checked').val(),
          "relationBlueTwo": $('input[name="blue-bulb2"]:checked').val()
        })
    }
  });

  ////////// EXPECTATION MATRIX //////////

  slides.matrixTwo = slide({
    name : "matrixTwo",
    start: function() {
      $(".err").hide();
      this.startTime = Date.now();
  
    },
    button : function() {

      if($('input[name=exp-button]:checked').length == 0 | $('input[name=exp-bulb1]:checked').length == 0 | $('input[name=exp-bulb2]:checked').length == 0) {
        $(".err").show();
      } else {
  
        this.RT = (Date.now() - this.startTime) / 1000; // record time spent on trial
        this.log_responses();
  
        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        exp.go();
      }
    },
  
    log_responses : function() {
      append(exp.data,
        {
          "expRT": this.RT,
          "expButton": $('input[name="exp-button"]:checked').val(),
          "expOne": $('input[name="exp-bulb1"]:checked').val(),
          "expTwo": $('input[name="exp-bulb2"]:checked').val()
        })
    }
  });

  ////////// INTENTIONALITY //////////

  function mapIntention(sentence) {
    if (sentence == "Are Brock's actions likely to be intentional?") {
      return "intention1"
    } else if (sentence == "How likely is it that Brock wanted to achieve something?") {
      return "intention2"
    } else if (sentence == 'How likely is it that Brock wanted <img src="media/bulb-off-1.png" width=50px height=50px class="blue" /> to light up?') {
      return "intention3"
    } else if (sentence == 'How likely is it that Brock wanted <img src="media/bulb-off-2.png" width=50px height=50px class="blue" /> to light up?') {
      return "intention4"
    } else if (sentence == 'How likely is it that <img src="media/bulb-off-1.png" width=50px height=50px class="blue" /> is broken?') {
      return "intention5"
    } else if (sentence == 'How likely is it that <img src="media/bulb-off-2.png" width=50px height=50px class="blue" /> is broken?') {
      return "intention6"
    } else if (sentence == 'How likely is it that Brock has knowledge of the function of <img src="media/blue.png" width=50px height=50px class="blue" />?') {
      return "knowledge1"
    } else if (sentence == 'How likely is it that Brock knows what would be caused by pushing <img src="media/blue.png" width=50px height=50px class="blue" />?') {
      return "knowledge2"
    } else if (sentence == "How likely is it that Brock wanted to break a lightbulb?") {
      return "attentionCheck"
    }
  }

  slides.intentionH = slide({
    name: "intentionH",
    trial_num: 1, // counter to record trial number within block

    /* trial information for this block
    (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present: [
      {sentence: "Are Brock's actions likely to be intentional?"},
      {sentence: "How likely is it that Brock wanted to break a lightbulb?"},
      {sentence: "How likely is it that Brock wanted to achieve something?"},
      {sentence: 'How likely is it that Brock wanted <img src="media/bulb-off-1.png" width=50px height=50px class="blue" /> to light up?'},
      {sentence: 'How likely is it that Brock wanted <img src="media/bulb-off-2.png" width=50px height=50px class="blue" /> to light up?'},
      {sentence: 'How likely is it that <img src="media/bulb-off-1.png" width=50px height=50px class="blue" /> is broken?'},
      {sentence: 'How likely is it that <img src="media/bulb-off-2.png" width=50px height=50px class="blue" /> is broken?'},
      {sentence: 'How likely is it that Brock has knowledge of the function of <img src="media/blue.png" width=50px height=50px class="blue" />?'},
      {sentence: 'How likely is it that Brock knows what would be caused by pushing <img src="media/blue.png" width=50px height=50px class="blue" />?'}
    ],

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //I like to store this information in the slide so I can record it later.
      this.startTime = Date.now();

      $(".prompt").html(stim.sentence);
      //erase current value
      document.getElementById('opt1IH').checked = false;
      document.getElementById('opt2IH').checked = false;
      document.getElementById('opt3IH').checked = false;
      document.getElementById('opt4IH').checked = false;
      document.getElementById('opt5IH').checked = false;
      document.getElementById('opt6IH').checked = false;
      document.getElementById('opt7IH').checked = false;
      document.getElementById('opt8IH').checked = false;
      document.getElementById('opt9IH').checked = false;

    },

    button : function() {
      if($('input[name=assess]:checked').length == 0) {
        $(".err").show();
      } else {

        this.RT = (Date.now() - this.startTime) / 1000; // record time spent on trial
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    log_responses : function() {
      var sentence = mapIntention(this.stim.sentence);
      var sentenceRT = sentence + "RT";
      var sentenceOrder = sentence + "Order";

      exp.data[sentence] = $('input[name="assess"]:checked').val();
      exp.data[sentenceRT] = this.RT;
      exp.data[sentenceOrder] = this.trial_num;
      
      this.trial_num++;
    }
  });

  ////////// ATTENTION CHECKS //////////

  slides.attention1 = slide({ //check this!!!
    name : "attention1",

    //this gets run only at the beginning of the block
    start: function() {
      $(".err").hide();
      this.startTime = Date.now();
    },

    button : function(){
      if($('input[name=attention1]:checked').length == 0) {
        $(".err").show();

      } else {
        this.RT = (Date.now() - this.startTime) / 1000; // record time spent on trial
        this.log_responses();
        exp.go();
      }
    },

    log_responses : function() {
      append(exp.data,
        {
          "attention1RT": this.RT,
          "attention1": $('input[name="attention1"]:checked').val()
        })
    }
  });

  slides.attention2 = slide({ //check this!!!
    name : "attention2",

    //this gets run only at the beginning of the block
    start: function() {
      $(".err").hide();
      this.startTime = Date.now();
    },

    button : function(){
      if($('input[name=att-button]:checked').length == 0|$('input[name=att-bulb1]:checked').length == 0|$('input[name=att-bulb2]:checked').length == 0) {
        $(".err").show();

      } else {
        this.RT = (Date.now() - this.startTime) / 1000; // record time spent on trial
        this.log_responses();
        exp.go();
      }
    },

    log_responses : function() {
      append(exp.data,
        {
          "attention2RT": this.RT,
          "attentionButton": $('input[name="att-button"]:checked').val(),
          "attentionBulb1": $('input[name="att-bulb1"]:checked').val(),
          "attentionBulb2": $('input[name="att-bulb2"]:checked').val()
        })
    }
  });

  ////////// SUBJECT INFORMATION //////////

  slides.subj_info =  slide({
    name: "subj_info",

    start: function() {
      $(".err").hide();
    },

    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      append(exp.data, {
        url: window.location.href,
        id: getID(window.location.href),
        language: $("#language").val(),
        enjoyment: $("#enjoyment").val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        education: $("#education").val(),
        comments: $("#comments").val(),
        condition: exp.condition,
        totalRT: (Date.now() - exp.startT)/60000,
        browser: exp.system["Browser"],
        os: exp.system["OS"],
        screenH: exp.system["screenH"],
        screenUH: exp.system["screenUH"],
        screenW: exp.system["screenW"],
        screenUW: exp.system["screenUW"]
      })

      if (!Number.isNaN(parseInt($("#age").val())) || $("#age").val() == "") { // age should be a number
        exp.go(); // use exp.go() if and only if there is no "present" data.

      } else {
        $(".err").show();
      }
      
    }
  });

  ////////// FIN //////////

  slides.thanks = slide({
    name : "thanks",
    start : function() {

      setTimeout(
        function() {
          sendDataToServer(exp.data);
      }, 1000);
      
    }
  });

  // simple language comprehension check to include at beginning of experiment
  slides.botcaptcha = slide({
     name : "botcaptcha",
     bot_trials : 0,
     start: function() {
       $("#error").hide();
       $("#error_incorrect").hide();
       $("#error_2more").hide();
       $("#error_1more").hide();
       // list of speaker names to be sampled from
       speaker = _.sample(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"]);
       // list of listener names to be sampled from
       listener = _.sample(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"]);
       // create the utterance
       this.bot_utterance = speaker + " says to " + listener + ": It's a beautiful day, isn't it?"
       // creat ethe question
       this.bot_question = "Who is " + speaker + " talking to?"
       // append the utterance and the question to the view
       var bot_sentence = document.createElement("p");
       var bot_question = document.createElement("p");
       var content = document.createTextNode(this.bot_utterance);
       var q_content = document.createTextNode(this.bot_question);
       bot_sentence.name = "bot_sentence";
       bot_question.name = "bot_question";
       bot_sentence.appendChild(content);
       bot_question.appendChild(q_content);
       document.getElementById('bot_context').appendChild(bot_sentence);
       document.getElementById('bot_context').appendChild(document.createElement("br"));
       document.getElementById('bot_context').appendChild(bot_question);
       document.getElementById('bot_context').appendChild(document.createElement("br"));

     },
     button: function() {
       // get the participants' input
       bot_response = $("#botresponse").val();
       // append data if response correct
       if (bot_response.toLowerCase() == listener.toLowerCase()) {
         append(exp.data,
          {
            nFails: this.bot_trials,
            botSentence: this.bot_utterance,
            botQuestion: this.bot_question
          }
          )

         exp.go();
         // gives participant two more trials if the response was incorrect
       } else {
         this.bot_trials++;
         $("#error_incorrect").show();
         if (this.bot_trials == 1) {
             $("#error_2more").show();
         } else if (this.bot_trials == 2) {
             $("#error_2more").hide();
             $("#error_1more").show();
         } else {
           // if participant fails, they cannot proceed
             $("#error_incorrect").hide();
             $("#error_1more").hide();
             $("#bot_button").hide();
             $('#botresponse').prop("disabled", true);
             $("#error").show();
         };
       }
     }
  });


  return slides;
}

/// init ///
function init() {

  //; support for uniqueturker
  // https://uniqueturker.myleott.com
  /*
  repeatWorker = false;
  (function(){
      var ut_id = "[INSERT uniqueTurkerID]";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();
  */

  exp.data = {};
  exp.condition = _.sample(["condition 1", "condition 2", "condition 3"]); // can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  //blocks of the experiment:
  if (exp.condition == "condition 1") {
    exp.structure=[
      "i0", "botcaptcha", "instructions1",
      "conditionA", // different across conditions
      "instructionsH", "matrixOne", "matrixTwo", "intentionH", "attention1", "attention2", "subj_info", "thanks"
    ];

  } else if (exp.condition == "condition 2") {
    exp.structure=[
      "i0", "botcaptcha", "instructions1",
      "conditionB", // different across conditions
      "instructionsH", "matrixOne", "matrixTwo", "intentionH", "attention1", "attention2", "subj_info", "thanks"
    ];

  } else {
    exp.structure=[
      "i0", "botcaptcha", "instructions1",
      "conditionC", // different across conditions
      "instructionsH", "matrixOne", "matrixTwo", "intentionH", "attention1", "attention2", "subj_info", "thanks"
    ];

  } 
  

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  );


  // Extra check for US IP addresses
  // TO DO: add support for Canadian IP addresses
  /*
  function USOnly() {
    var accessKey = 'b487843addca6e9ec32e6ae28aeaa022';
     $.ajax({
       url: 'https://geo.ipify.org/api/v1?apiKey=at_nuIzsEIQJAft6sr1WH67UTfFDeMIO',
       dataType: 'jsonp',
       success: function(json) {
       if (json.location.country != 'US') {
         var slides = document.getElementsByClassName('slide');
         for (i=0; i<slides.length; i++) {
          slides[i].style.display = 'none';
         }
          document.getElementsByClassName('progress')[0].style.display = 'none';
          document.getElementById('unique').innerText = "This HIT is only available to workers in the United States. Please click 'Return' to avoid any impact on your approval rating.";
        }
      }
     });
  }
  */

  exp.go(); //show first slide
  //USOnly(); // check US IP address

}

// sends data to google sheets
function sendDataToServer(exp_data) {
	$.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxUi_Vzqy68gbxlzR2tV9cXlG6ax-a--oT1o0FR7HajpGYN1OpHZLw9sfZWjjmySQK7XQ/exec',
		type: 'POST',
    data: exp_data,
    complete: function() {
      window.location.replace("https://app.prolific.co/submissions/complete?cc=48E4F922") // redirect to prolific
    } 
	});
}

function append(dict1, dict2){
  var i
  var keys = Object.keys(dict2)
  for (i = 0; i < keys.length; i++){
    dict1[keys[i]] = dict2[keys[i]] 
  }
}

function getID(url){
  const start = "PROLIFIC_PID"
  var check = url.match(start)
  var reg = /PROLIFIC_PID=[a-z0-9]+&/
  if(check !== null){
    var extract = url.match(reg)
    return extract[0].slice(13,37)
  } else {
    return null
  }
  
}
