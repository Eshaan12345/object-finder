video = "";
objects = [];

function preload() {
	video = createCapture(VIDEO);
	video.hide();
}

function setup() {
	canvas = createCanvas(480, 380);
	canvas.center();
}

function draw() {
	image(video, 0, 0, 480, 380);
	if (status != "") 
	{
		objectDetector.detect(video, gotResult);

		for (let i = 0; i < objects.length ; i++) {

			if(objects[i].label == document.getElementById("c").value)
			{

				document.getElementById("status").innerHTML = "Status : Objects Detected";
				label101  = document.getElementById("number_of_objects").innerHTML = document.getElementById("c").value + " found";
				label102 = "";
			

			fill("#FF0000");
			percent = floor(objects[i].confidence * 100);
			text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
			noFill();
			stroke("#FF0000");
			rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
			}
			else
			{

			 document.getElementById("status").innerHTML = "Objects detected"
			 label102  = document.getElementById("number_of_objects").innerHTML = document.getElementById("c").value + " not found";
				label101 = "";
			fill("#FF0000");
			percent = floor(objects[i].confidence * 100);
			text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
			noFill();
			stroke("#FF0000");
			rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
			}


			
			
			
		}
	}
}

function start() {
	objectDetector = ml5.objectDetector('cocossd', modelLoaded);
	document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
	console.log("Model Loaded!");
	status = true;
	video.loop();
	video.speed(1);
	video.volume(0);
}

function gotResult(error, results) {
	if(error)
	{
		console.error(error);
		document.getElementById("status").innerHTML = "Something went wrong...";
	}
	objects = results;


}

