import Phaser from "phaser";
import loading from "../assets/loading.png";
import exit from "../assets/exit.png";
import imgScore from "../assets/imgScore.png";
import hear from "../assets/eart.png";
import regularJson from "../json/regular.json";
import { textConfigOptions } from "./main.scene.js";
import sound from "../assets/win.wav";
import { examData, textConfigEnglish } from "./aprender.js";
import { textConfigOptions } from "./main.scene.js";
import { saveStorage } from "./exam1.js";
//localStorage.clear('gameState')
  export  let currentScore = 0
export default class Desafio extends Phaser.Scene {
  constructor() {
    super("Desafio");
  }

  preload() {
    this.load.image("loader", loading);
    this.load.image("exit", exit);
    this.load.audio("soundWin", sound);
    this.load.image("hear", hear);
    this.load.image("imgScore",imgScore );
  }

  create() {
    this.loader();
    this.soundWin = this.sound.add("soundWin");
  }

  crear() {
    const y = this.cameras.main.height - 100;
    const height = 50;
    let hitAreas = [];
    let wordAlternative;
    let currentText;
    let count =0;
    let score = 0;
    let scorePuntaje = 0;
    console.log(regularJson.length);
    const numberOfRectangles = 6;
    const spacing = 10;
    const widthA = 150;

    let rectangles = [];
    let texts = [];

    // Crea un grupo para las imágenes de 'hear'
    this.hearGroup = this.add.group();
    regularJson.sort(() => Math.random() - 0.5);

console.log(regularJson)
    // Añadir imágenes de 'hear' al grupo (puedes añadir más si es necesario)
    for (let i = 0; i < 3; i++) {
      let hearImage = this.add.image(50 + i * 50, 50, "hear").setScale(0.3);
      this.hearGroup.add(hearImage); // Añadir al grupo
    }

    const updateText = () => {
      if (currentText) currentText.destroy();
      if (score) score.destroy();
      rectangles.forEach((rect) => rect.destroy());
      texts.forEach((text) => text.destroy());

      rectangles = [];
      texts = [];

      currentText = this.add
        .text(
          this.cameras.main.width / 2,
          y - 400,
          regularJson[count].english,
          textConfigEnglish
        )
        .setOrigin(0.5, 0.5);

      score = this.add
        .text(this.cameras.main.width - 50, 50, scorePuntaje, textConfigEnglish)
        .setOrigin(0.5, 0.5);
      score.setColor("#ffffff");
      score.setFontSize(23);

      let alternatives = regularJson
        .slice(count, count + 6)
        .flatMap((ele) =>
          ele.spanish !== regularJson[count].spanish ? [ele.spanish] : []
        );
      alternatives.push(regularJson[count].spanish);
      alternatives = alternatives.sort(() => Math.random() - 0.5);
      console.log(alternatives);

      const totalHeight =
        numberOfRectangles * height + (numberOfRectangles - 1) * spacing;
      const startY = (this.cameras.main.height - totalHeight) / 2 + 100;
      const startX = this.cameras.main.width / 2 - 150;

      for (let i = 0; i < alternatives.length; i++) {
        const xA = i % 2 === 0 ? startX : startX + widthA + spacing;
        const yA = startY + Math.floor(i / 2) * (height + spacing);

        const rectOptions = this.add.graphics();
        rectOptions.lineStyle(1, 0xffffff);
        rectOptions.strokeRoundedRect(xA, yA, widthA, height, 20);
        rectangles.push(rectOptions);

        const textOptions = this.add
          .text(
            xA + widthA / 2,
            yA + height / 2,
            alternatives[i],
            textConfigOptions
          )
          .setOrigin(0.5, 0.5);
        texts.push(textOptions);

        const hitArea = this.add
          .zone(xA, yA, widthA, height)
          .setOrigin(0, 0)
          .setInteractive({ cursor: "pointer" });
        hitAreas.push(hitArea);

        hitArea.on("pointerdown", () => {
          wordAlternative = alternatives[i];
          hitAreas.forEach((area) => area.disableInteractive());
          textOptions.setColor("#00afef");
          rectOptions.clear();
          rectOptions.lineStyle(1, 0x00afef);
          rectOptions.strokeRoundedRect(xA, yA, widthA, height, 20);

          if (wordAlternative === regularJson[count].spanish) {
            scorePuntaje++;
            this.soundWin.play();
          } else {
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
            if (this.hearGroup.getLength() > 0) {
              const hearImageToRemove =
                this.hearGroup.getChildren()[this.hearGroup.getLength() - 1]; // Obtener la primera imagen como ejemplo
              this.hearGroup.remove(hearImageToRemove, true); // Eliminarla del grupo
              hearImageToRemove.destroy(); // Destruir la imagen
            }
          }

          this.time.delayedCall(600, () => {
            let datos = JSON.parse(localStorage.getItem("gameState"));

          
            if (count === regularJson.length) {
              currentScore=scorePuntaje
              if (scorePuntaje > (datos.score||0)) {
                examData.score = scorePuntaje;
                saveStorage();
              }
              this.scene.start("EndDesafio");
              
            }
            if (this.hearGroup.getLength() === 0) {
              currentScore=scorePuntaje
              if (scorePuntaje > (datos.score||0)) {
                examData.score = scorePuntaje;
                saveStorage();
              }
              this.scene.start("EndDesafio");
            
            } else {
              updateText();
            }
          });
          count++;
        });
      }
    };

    updateText();
  }

  createExit() {
    const exit = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height - 100,
        "exit"
      )
      .setScale(0.7);
    exit.setInteractive({ cursor: "pointer" });

    exit.on("pointerdown", () => {
      this.scene.start("Scene1");
    });
  }

  loader() {
    this.loader1 = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "loader"
      )
      .setScale(0.7);

    this.time.delayedCall(500, () => {
      this.loader1.destroy();
      this.createExit();
      this.createScore()
      this.crear();
    });
  }
  createScore() {
    this.score = this.add
      .image(
        this.cameras.main.width - 50,
        40,
        "imgScore"
      )
      .setScale(0.3);

  }
}
