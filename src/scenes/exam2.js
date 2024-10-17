import Phaser from "phaser";
import loading from "../assets/loading.png";
import exit from "../assets/exit.png";
import mankey from "../assets/mankey.png";
import questionIMG from "../assets/question1.png";
import { textConfigOptions } from "./main.scene.js";
import sound from "../assets/win.wav";
import { examData } from "./aprender.js";
import { saveStorage } from "./exam1.js";
import { textConfigNext } from "./aprender.js";
import { textConfigEnglish } from "./aprender.js";
import { textConfigOptions } from "./main.scene.js";

export default class Examen2 extends Phaser.Scene {
  constructor() {
    super("Examen2");
  }

  preload() {
    this.load.image("loader", loading);
    this.load.image("question1",questionIMG);
    this.load.image("exit", exit);
    this.load.spritesheet("monkey", mankey, {
      frameWidth: 95,
      frameHeight: 85
    });
    this.load.audio("soundWin", sound);
  }

  create() {
    console.log(this.textures.get('monkey').getFrameNames());

    examData.wordRepeat=[...examData.wordRepeat,...examData.tuelvenWords]
    examData.exam2 = 1;
    saveStorage();
    this.animsMonkey();
    this.text1()

 
    this.soundWin = this.sound.add("soundWin");
  }

  crear() {
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height - 100; 
    const width = 250; 
    const height = 50; 
    let hitAreas = [];
    let wordAlternative;
    let currentText;
    let count = 0;
  
    const numberOfRectangles = 6;
    const spacing = 10;
    const widthA = 150; 
  
    const nextBoton = this.add.graphics();
    nextBoton.lineStyle(1, 0xffffff, 0.1);
    nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);
  
    const rectTextNext = this.add.text(x, y + height / 2, `N e x t`, textConfigNext).setOrigin(0.5, 0.5);
  
    const hitAreaNext = this.add.zone(x, y, width, height).setOrigin(0.5, 0);
  
     let rectangles = [];
    let texts = []; 
  
    const updateText = () => {
      hitAreaNext.disableInteractive();
      nextBoton.clear();
      nextBoton.lineStyle(1, 0xffffff, 0.1);
      nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);
      rectTextNext.setAlpha(0.1);
      rectTextNext.setColor('#ffffff');
  
      if (currentText) currentText.destroy();
      rectangles.forEach((rect) => rect.destroy());
      texts.forEach((text) => text.destroy());
  
      rectangles = [];
      texts = [];
  
      currentText = this.add.text(this.cameras.main.width / 2, y - 400, examData.tuelvenWords[count].english, textConfigEnglish).setOrigin(0.5, 0.5);
  
      let alternatives = examData.tuelvenWords
        .flatMap((ele) => (ele.spanish !== examData.tuelvenWords[count].spanish ? [ele.spanish] : []))
        .slice(0, 5);
      alternatives.push(examData.tuelvenWords[count].spanish);
      alternatives = alternatives.sort(() => Math.random() - 0.5);
  
      const totalHeight = numberOfRectangles * height + (numberOfRectangles - 1) * spacing;
      const startY = (this.cameras.main.height - totalHeight) / 2 +100;
      const startX = this.cameras.main.width / 2 - 150; 
  
      for (let i = 0; i < alternatives.length; i++) {
        const xA = i % 2 === 0 ? startX : startX + widthA + spacing;
        const yA = startY + Math.floor(i / 2) * (height + spacing);
  
        const rectOptions = this.add.graphics();
        rectOptions.lineStyle(1, 0xffffff);
        rectOptions.strokeRoundedRect(xA, yA, widthA, height, 20);
        rectangles.push(rectOptions);
  
        const textOptions = this.add.text(xA + widthA / 2, yA + height / 2, alternatives[i], textConfigOptions).setOrigin(0.5, 0.5);
        texts.push(textOptions);
  
        const hitArea = this.add.zone(xA, yA, widthA, height).setOrigin(0, 0).setInteractive({ cursor: "pointer" });
        hitAreas.push(hitArea);
  
        hitArea.on("pointerdown", () => {
          wordAlternative = alternatives[i];
          hitAreas.forEach((area) => area.disableInteractive());
          textOptions.setColor('#00afef')
          rectOptions.clear();
          rectOptions.lineStyle(1, 0x00afef);
          rectOptions.strokeRoundedRect(xA, yA, widthA, height, 20);
  
          if (wordAlternative === examData.tuelvenWords[count].spanish) {
            this.soundWin.play();
            nextBoton.clear();
            nextBoton.lineStyle(1, 0xffffff);
            nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);
            rectTextNext.setAlpha(1);
            rectTextNext.setColor('#ffffff')
            hitAreaNext.setInteractive();

          } else {
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
  
            this.time.delayedCall(700, () => {
              textOptions.setStyle({ fill: "#ffffff" });
              rectOptions.clear();
              rectOptions.lineStyle(1, 0xffffff);
              rectOptions.strokeRoundedRect(xA, yA, widthA, height, 20);
              hitAreas.forEach((area) => area.setInteractive());
            });
          }
        });
      }
    };
  
    updateText()

    hitAreaNext.on("pointerdown", () => {
      hitAreaNext.disableInteractive()
      nextBoton.clear();
      nextBoton.lineStyle(1, 0x00afef);
      nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);
      rectTextNext.setColor('#00afef')
      this.time.delayedCall(500, () => {
      
      if (count == examData.tuelvenWords.length-1 ) {
        examData.exam2=0
        saveStorage()
        this.scene.start('Examen3');
      } else {
        count++;
        updateText();
      }
      })
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
  animsMonkey() {
    this.anims.create({
      key: "idle", 
      frames: this.anims.generateFrameNumbers("monkey", { start: 0, end: 5 }), 
      frameRate: 10, 
      repeat: -1, 
    }); 

    this.mono = this.add.sprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 -100,
      "monkey"
    ).setScale(2)
    this.mono.play("idle");
    this.time.delayedCall(1000, () => {
      this.mono.destroy();
      this.text.destroy();
      this.loader()
    });
  }
text1(){
  this.text= this.add.text(this.cameras.main.width / 2,
    this.cameras.main.height / 2 + 20,' B u e n   T r a b a j o',{
      fontSize: '20px', 
      fontFamily: 'Courier New ',
      color: '#ffffff'     
  }).setOrigin(0.5,0.5)

}
loader(){
     this.loader1 = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "loader"
      )
      .setScale(0.7);

    this.time.delayedCall(500, () => {    
      this.loader1.destroy();
      this.question()
 
    }); 
}
question(){
  this.question1 = this.add
  .image(
    this.cameras.main.width / 2,
    this.cameras.main.height / 2,
    "question1"
  ).setScale(3)
 

 this.time.delayedCall(500, () => {
   this.question1.destroy();
  this.createExit()
    this.crear();
 }); 
}

}
