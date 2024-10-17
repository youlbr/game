import Phaser from "phaser";
import loading from "../assets/loading.png";
import exit from "../assets/exit.png";
import { textConfigOptions } from "./main.scene.js";
import sound from "../assets/win.wav";
import { examData } from "./aprender.js";

export function saveStorage() {
  const detailsGame = {
    exam2:examData.exam2,
    countGeneral: examData.countGeneral,
    exam1: examData.exam1,
    sixWord: examData.sixWord,
    countFinalyExam: examData.countFinalyExam,
    tuelvenWords:examData.tuelvenWords,
    exam3:examData.exam3,
    exam4:examData.exam4,
    overalPorcentaj:examData.overalPorcentaje,
    wordRepeat:examData.wordRepeat,
    activateRepeat:examData.activateRepeat,
    score:examData.score
  };
  localStorage.setItem("gameState", JSON.stringify(detailsGame));
}

export default class Examen1 extends Phaser.Scene {
  constructor() {
    super("Examen1");
  }

  preload() {
   
    this.load.image("loader", loading);
    this.load.image("exit", exit);
    this.load.audio("soundWin", sound);
  }

  create() {
    examData.exam1 = 1;    
    saveStorage();
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
      this.exam();
    });
    this.soundWin = this.sound.add("soundWin");

    
  }

  createExit() {
    const exit = this.add
    .image(this.cameras.main.width - 50, 50, "exit")
    .setScale(0.4);
    exit.setInteractive({ cursor: "pointer" });

    exit.on("pointerdown", () => {

    let datos = JSON.parse(localStorage.getItem('gameState'));

      if(datos){

        examData.countGeneral=datos.countGeneral??0;
        examData.countFinalyExam=datos.countFinalyExam??0;
        examData.sixWord=datos.sixWord
      }else{
        examData.countGeneral=0
        examData.countFinalyExam=0  
        examData.sixWord=[] 
      }
      this.scene.start("Scene1");
    });
  }

  exam() {
    const numberOfRectangles = 6;
    const height = 50;
    const spacing = 10;
    const width = 150;
    let countExamen = 0;
    let endExamSix = 0;

    let allWordsOptions = examData.sixWord.flatMap((word) => [
      word.english,
      word.spanish,
    ]);
    allWordsOptions = allWordsOptions.sort(() => Math.random() - 0.5);

 

    let comprovate = [];
    let selectedRectsOptions = [];
    let hitAreas = []; 

    const totalHeight =
      numberOfRectangles * height + (numberOfRectangles - 1) * spacing;
    const startY = (this.cameras.main.height - totalHeight) / 2; 

    const totalWidth = 2 * (width + spacing) - spacing;
    const startX = (this.cameras.main.width - totalWidth) / 2;

    for (let i = 0; i < allWordsOptions.length; i++) {
      const column = i < numberOfRectangles ? 0 : 1;
      const x = startX + column * (width + spacing); 
      const y = startY + (i % numberOfRectangles) * (height + spacing); 

      const rectOptions = this.add.graphics();
      rectOptions.lineStyle(1, 0xffffff);
      rectOptions.strokeRoundedRect(x, y, width, height, 20);

      const textOptions = this.add.text(
        x + width / 2,
        y + height / 2,
        allWordsOptions[i],
        textConfigOptions
      );
      textOptions.setOrigin(0.5, 0.5);

      const interactiveArea = this.add
        .zone(x, y, width, height)
        .setOrigin(0, 0);
      interactiveArea.setInteractive({ cursor: "pointer" });
      hitAreas.push(interactiveArea);



      interactiveArea.on("pointerdown", () => {
        countExamen++;
        console.log(countExamen);
        interactiveArea.disableInteractive();
        textOptions.setStyle({ fill: "#000000" });
        rectOptions.fillStyle(0xffffff, 0.7);
        rectOptions.fillRoundedRect(x, y, width, height, 20);

        comprovate.push(allWordsOptions[i]);
        selectedRectsOptions.push({
          rectOptions,
          textOptions,
          x,
          y,
          width,
          height,
        });

        if (countExamen === 2) {
          console.log(comprovate);
          console.log(selectedRectsOptions);
          hitAreas.forEach((area) => area.disableInteractive());

          const [word1, word2] = comprovate;
          let resul1 = examData.sixWord.findIndex(
            (ele) => ele.english == word1 || ele.spanish == word1
          );
          let resul2 = examData.sixWord.findIndex(
            (ele) => ele.english == word2 || ele.spanish == word2
          );

          if (resul1 === resul2) {
            endExamSix++;
            this.soundWin.play();

            hitAreas = hitAreas.filter((hitArea) => {
              return !selectedRectsOptions.some(
                (rect) =>
                  rect.x === hitArea.x &&
                  rect.y === hitArea.y &&
                  rect.width === hitArea.width && // Modificación aquí
                  rect.height === hitArea.height  // Modificación aquí
              );
            });

            console.log(hitAreas);

            this.time.delayedCall(300, () => {
              for (const {
                rectOptions,
                textOptions,
                x,
                y,
                width,
                height,
              } of selectedRectsOptions) {
                rectOptions.clear();
                rectOptions.lineStyle(1, 0x00afef);
                rectOptions.strokeRoundedRect(x, y, width, height, 20); 
                textOptions.setStyle({ fill: "#00afef" });
              }
              selectedRectsOptions = [];
              if (hitAreas.length !== 0) {

                hitAreas.forEach((area) => area.setInteractive());
              } else {
                if (examData.countFinalyExam >= 14) {
                  examData.countFinalyExam = 0;
                  examData.exam1=0
                  examData.sixWord.splice(0, examData.sixWord.length);
                  console.log(examData.sixWord);

                  saveStorage();
                  this.scene.start("Examen2");
                } else {
                  examData.sixWord.splice(0, examData.sixWord.length);
                  this.time.delayedCall(300, () => {
                    examData.exam1 = 0;
                    saveStorage();
                     this.scene.start("Aprender");
                  });
                }
              }
            });

            countExamen = 0;
          } else {
            this.time.delayedCall(500, () => {
              if (navigator.vibrate) {
                navigator.vibrate(200);
              }

              for (const {
                rectOptions,
                textOptions,
                x,
                y,
                width,
                height,
              } of selectedRectsOptions) {
                rectOptions.clear();
                rectOptions.lineStyle(1, 0xffffff);
                rectOptions.strokeRoundedRect(x, y, width, height, 20); 
                textOptions.setStyle({ fill: "#ffffff" });
              }
              selectedRectsOptions = [];
              hitAreas.forEach((area) => area.setInteractive());
            });
            countExamen = 0;
          }
          comprovate = [];
        }
      });
    }
  }






}
