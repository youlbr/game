import Phaser from "phaser";
import loading from "../assets/loading.png";
import exit from "../assets/exit.png";
import repeat from "../assets/repeat.png";
import repeat1 from "../assets/repeat1.png";
import { textConfigNext } from "./aprender.js";
import { textConfigEnglish } from "./aprender.js";
import { textConfigSpanish } from "./aprender.js";


export default class Repeat extends Phaser.Scene {
  constructor() {
    super("Repeat");
  }

  preload() {
    this.load.image("repeatImage", repeat);
    this.load.image("repeatImage1", repeat1);
    this.load.image("loader", loading);
    this.load.image("exit", exit);
  }

  create() { 
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
  }

  crear() {
    let count = 0;
    let textEglish;
    let textSpanish;
    let repeatImage;
     let datos = JSON.parse(localStorage.getItem("gameState"));
     console.log(datos.wordRepeat)
    const updateText = () => {
      if (textEglish) textEglish.destroy();
      if (textSpanish) textSpanish.destroy();
      if (repeatImage) repeatImage.destroy();

      textEglish = this.add
        .text(0, 0, datos.wordRepeat[count].english, textConfigEnglish)
        .setOrigin(0.5, 0);
      textEglish.setPosition(this.cameras.main.width / 2, 200);

      textSpanish = this.add
        .text(0, 0, datos.wordRepeat[count].spanish, textConfigSpanish)
        .setOrigin(0.5, 0);
      textSpanish.setPosition(this.cameras.main.width / 2, 300);
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
      if(hitAreaNext)hitAreaNext.disableInteractive()
      if(nextBoton)nextBoton.destroy()
      if(textNext)textNext.destroy()
    


      repeatImage = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "repeatImage"
        )
        .setScale(0.2);
      repeatImage.setOrigin(0.5, 0.5);
      repeatImage.setInteractive({ cursor: "pointer" });
      
      repeatImage.on("pointerdown", () => {
        repeatImage.destroy(0);
        repeatImage=this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "repeatImage1"
        )
        .setScale(0.2);
        repeatImage.setOrigin(0.5, 0.5);
    
    
        this.time.delayedCall(200, () => {
     this.scene.start('Repeat')

        });
      }); 
    }; 

    const hitAreaNext = this.add.zone(x, y, width, height);
    hitAreaNext.setOrigin(0.5, 0);
    hitAreaNext.setInteractive({ cursor: "pointer" });

    updateText();
    hitAreaNext.on("pointerdown", () => {
      nextBoton.fillStyle(0x00afef);
      nextBoton.fillRoundedRect(x - width / 2, y, width, height, 20);
      this.time.delayedCall(500, () => {
        nextBoton.clear();
        nextBoton.lineStyle(1, 0xffffff);
        nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);
        if (count === datos.wordRepeat.length) {
          console.log("hola");
          repeatWindow();
        } else {
          updateText();
        }
      });
      count++;
    });
  }
  createExit() {
    const exit = this.add
      .image(this.cameras.main.width - 50, 50, "exit")
      .setScale(0.4);
    exit.setInteractive({ cursor: "pointer" });

    exit.on("pointerdown", () => {
      this.scene.start("Scene1");
    });
  }
}
