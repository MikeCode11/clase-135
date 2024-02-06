video = "";
objects = [];
status = "";

function preload(){
  video = createVideo("video.mp4");
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video.hide();
}

function start()
{
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Estado: detectando objetos";
}

function modelLoaded() {
  console.log("¡Modelo cargado!")
  status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function gotResult(error, results) {
    if (error) {
      console.error("el error es:" + error);
    }
      console.log("los resultado son:" + results);
      objects = results;
    }


function draw() {
  image(video, 0, 0, 480, 350);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.lenght; i++) {
          document.getElementById("status").innerHTML = "Estado: objeto detectado";
          document.getElementById("number_of_objects").innerHTML = "Número de objetos detectados: " + objects.lenght();
 
          fill("#FF0000");
          percent =  flor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
          nofill();
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
