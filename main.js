song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
songStatus = "";

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.position(425, 230);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload()
{
    song_1 = loadSound("Happy.mp3");
    song_2 = loadSound("Pitbull.mp3");
}

function modelLoaded()
{}

function gotPoses()
{
    if(results.length > 0)
    {
        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        leftWristScore = leftWristX[0].pose.keypoints[9].score;
        rightWristScore = rightWristX[0].pose.keppoints[9].score;
    }
}

function draw()
{
    image(video, 425, 230, 400, 400);
    fill("#029FF0");
    stroke("#FF0000");
    song1_status = song_variable.isPlaying();
    song2_status = song_variable.isPlaying();
    songStatus = song1_status;
    songStatus2 = song2_status;
    
    if(rightWristScore > 0.2)
    {
        circle(rightWristX, rightWristY, 25);
        song_variable.stop(song_1);
    }

    if(leftWristScore > 0.2)
    {
        circle(leftWristX, leftWristY, 50);
        song_variable.stop(song_2);
    }

    if(song1_status == "false")
    {
        song.play(song_1);
        document.getElementById("song_name").innerHTMl + "Now Playing: Happy";
    }

    if(song2_status == "false")
    {
        song.play(song_2);
        document.getElementById("song_name").innerHTML + "Now Playing: Give Me Everything";
    }
}