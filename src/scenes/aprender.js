import Phaser from "phaser";
import loading from "../assets/loading.png";
import exit from "../assets/exit.png";
import repeat from "../assets/repeat.png";
import repeat1 from "../assets/repeat1.png";
import regularJson from "../json/regular.json";
import { saveStorage } from "./exam1";

console.log(regularJson.length)
let verificationCounterExamSix = 0;

export const examData = {
  exam1: 0,
  exam2: 0,
  countGeneral:0,
  countFinalyExam:0,
  sixWord:[] ,
  tuelvenWords:[],
  exam3:0,
  exam4:0,
  overalPorcentaje:0,
  wordRepeat:[],
  activateRepeat:false,
  score:0
  
};





(function() {  

  let datos = JSON.parse(localStorage.getItem('gameState'));

  if (datos) {
   examData.exam1=datos.exam1
   examData.countGeneral=datos.countGeneral
   examData.sixWord=datos.sixWord
   examData.countFinalyExam=datos.countFinalyExam
   examData.tuelvenWords=datos.tuelvenWords
   examData.exam3=datos.exam3
   examData.exam2=datos.exam2
   examData.exam4=datos.exam4
   examData.overalPorcentaje=datos.overalPorcentaje
   examData.activateRepeat=datos.activateRepeat
   examData.score=datos.score
  }


})();



export const textConfigEnglish = {
  fontSize: "3rem",
  fontFamily: "Arial",
  fill: "#ED3237",
  align: "center",
  // stroke: "rgba(255, 255, 255, 0.9)", // Borde blanco con 50% de opacidad
  strokeThickness: 0,
};
export const textConfigSpanish = {
  fontSize: "2em",
  fontFamily: "Arial",
  fill: "#ffffff",
  align: "center",
  // stroke: "rgba(255, 255, 255, 0.9)", // Borde blanco con 50% de opacidad
  strokeThickness: 0,
};
export const textConfigNext = {
  fontSize: "1.7em",
  fontFamily: "Arial",
  fill: "#ffffff",
  align: "center",
  strokeThickness: 0,
};

export default class Aprender extends Phaser.Scene {
  constructor() {
    super("Aprender"); 
  }

  preload() {
    this.load.image("repeatImage", repeat);
    this.load.image("repeatImage1", repeat1);
    this.load.image("loader", loading);
    this.load.image("exit", exit);
  }

  create() {
    console.log(regularJson.length)
    console.log(regularJson.length - 12)
    this.loader = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "loader"
      )
      .setScale(0.7);
      this.time.delayedCall(500, () => {
        this.loader.destroy();
        this.createExit();
        this.crear();
      });

       if(examData.exam1>0)this.scene.start("Examen1");
       if(examData.exam2>0)this.scene.start("Examen2");
       if(examData.exam3>0)this.scene.start("Examen3");
       if(examData.exam4>0)this.scene.start("Examen4");
        

  }

  crear() {
    let textEglish;
    let textSpanish;
    let repeatImage;

    const updateText = () => {
      if (textEglish) textEglish.destroy();
      if (textSpanish) textSpanish.destroy();
      if (repeatImage) repeatImage.destroy();

      textEglish = this.add
        .text(0, 0, regularJson[examData.countGeneral].english, textConfigEnglish)
        .setOrigin(0.5, 0);
      textEglish.setPosition(this.cameras.main.width / 2, 200);

      textSpanish = this.add
        .text(0, 0, regularJson[examData.countGeneral].spanish, textConfigSpanish)
        .setOrigin(0.5, 0);
      textSpanish.setPosition(this.cameras.main.width / 2, 300);
      examData.tuelvenWords.push(regularJson[examData.countGeneral]);
      examData.sixWord.push(regularJson[examData.countGeneral]);
    };

  

    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height - 150;
    const width = 250;
    const height = 50;

    const nextBoton = this.add.graphics();
    nextBoton.lineStyle(1, 0xffffff);
    nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);

    const textNext = this.add.text(
      x,
      y + height / 2,
      `N e x t`,
      textConfigNext
    );
    textNext.setOrigin(0.5, 0.5);
    
    const repeatWindow = () => {
      if (textEglish) textEglish.destroy();
      if (textSpanish) textSpanish.destroy();
    


      repeatImage = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 4,
          "repeatImage"
        )
        .setScale(0.2);
      repeatImage.setOrigin(0.5, 0);
      repeatImage.setInteractive({ cursor: "pointer" });
      
      repeatImage.on("pointerdown", () => {
        repeatImage.destroy(0);
        repeatImage=this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 4,
          "repeatImage1"
        )
        .setScale(0.2);
        repeatImage.setOrigin(0.5, 0);
        examData.sixWord=[]
        examData.countGeneral -= 6;
        verificationCounterExamSix = 0;
        this.time.delayedCall(200, () => {
          let datos = JSON.parse(localStorage.getItem('gameState'));
          if(datos){
            examData.countFinalyExam=datos.countFinalyExam??0
        examData.tuelvenWords=datos.tuelvenWords

          }else{
            examData.countFinalyExam=0
        examData.tuelvenWords=[]

          } 
          textNext.setText('N e x t')
          saveStorage()
          updateText();
        });
      });
    };

    const hitAreaNext = this.add.zone(x, y, width, height);
    hitAreaNext.setOrigin(0.5, 0);
    hitAreaNext.setInteractive({ cursor: "pointer" });

    if (verificationCounterExamSix === 6) {
      repeatWindow();
      hitAreaNext.setInteractive();

    } else if (verificationCounterExamSix === 7) {
      this.scene.start("Examen");
    } else {
      updateText(); // Mostrar el primer texto
    }
    hitAreaNext.on("pointerdown", () => {
      hitAreaNext.disableInteractive();
      nextBoton.fillStyle(0x00afef);
      nextBoton.fillRoundedRect(x - width / 2, y, width, height, 20);
      examData.countGeneral++;
      verificationCounterExamSix++;
      examData.countFinalyExam++;
      if (regularJson.length % 12 == 0) {
        this.time.delayedCall(350, () => {
          nextBoton.clear();
          nextBoton.lineStyle(1, 0xffffff);
          nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20); 

          if (verificationCounterExamSix === 6) {
            repeatWindow();
            hitAreaNext.setInteractive();
            textNext.setText('E x a m')
          } else if (verificationCounterExamSix === 7) {
            verificationCounterExamSix=0
            examData.countGeneral-=1
            this.scene.start("Examen1");
          } else {
            updateText();
            hitAreaNext.setInteractive();
          }
        });
      }
    });
  }
  createExit() {
    const exit = this.add
    .image(this.cameras.main.width - 50, 50, "exit")
    .setScale(0.4);
    exit.setInteractive({ cursor: "pointer" });

    exit.on("pointerdown", () => {
     verificationCounterExamSix=0 
    examData.sixWord=[]
    let datos = JSON.parse(localStorage.getItem('gameState'));

      if(datos){

        examData.countGeneral=datos.countGeneral;
        examData.countFinalyExam=datos.countFinalyExam;
        examData.tuelvenWords=datos.tuelvenWords
      }else{
        examData.countGeneral=0
        examData.countFinalyExam=0   
        examData.tuelvenWords=[]
      }  

      this.scene.start("Scene1");
    });
  }
}

