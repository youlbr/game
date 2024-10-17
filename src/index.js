import Phaser from "phaser";
import Scene1 from "./scenes/main.scene.js";
import Scene2 from "./scenes/scene2.js";
import Aprender from "./scenes/aprender.js";
import Examen1 from "./scenes/exam1.js";
import Examen2 from "./scenes/exam2.js";
import Examen3 from "./scenes/exam3.js";
import Examen4 from "./scenes/exam4.js";
import FinalExam from "./scenes/finalExam.js";
import Repeat from "./scenes/repeat.js";
import  Working from "./scenes/trabajando.js";
import Desafio from "./scenes/desafio.js";
import EndDesafio from "./scenes/endDesafio.js";
let colorWhite="#ffffff"
let colorRed="#ED3237"
let colorSky="#00AFEF"


let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor:'#4B4B4D',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y:0 },
        debug: false,
      },
    },
         scene: [Scene1,Scene2,Aprender,Examen1,Examen2,Examen3,Examen4,FinalExam,Repeat,Working,Desafio,EndDesafio],
    input: {
      activePointers: 4, 
    },
  };
  
  let game = new Phaser.Game(config);
  