import Phaser from "phaser";
import loading from "../assets/loading.png";
import exit from "../assets/exit.png";
import mankey from "../assets/mankey.png";
import imgFINALq from "../assets/finalQuestion.png";
import pista from "../assets/pista.png";
import sound from "../assets/win.wav";
import { examData, textConfigSpanish } from "./aprender.js";
import { saveStorage } from "./exam1.js";
import { textConfigNext } from "./aprender.js";
import { textConfigEnglish } from "./aprender.js";

export default class Examen4 extends Phaser.Scene {
  constructor() {
    super("Examen4");
  }

  preload() {
    this.load.image("loader", loading);
    this.load.image("question3",imgFINALq);
    this.load.image("exit", exit);
    this.load.image("pista", pista);
    this.load.spritesheet("monkey", mankey, {
      frameWidth: 95, 
      frameHeight: 85, 
    });
    this.load.audio("soundWin", sound);
  }

  create() {
    examData.exam4 = 1;
    saveStorage();
    this.animsMonkey();
    this.text1()

 
    this.soundWin = this.sound.add("soundWin");
  }


  crear(){
    const x = this.cameras.main.width / 2; 
    const y = this.cameras.main.height - 100;
    const width = 250; 
    const height = 50; 
    const nextBoton = this.add.graphics();
    nextBoton.lineStyle(1, 0xffffff, 0.1);
    nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);
  
    const rectTextNext = this.add.text(x, y + height / 2, `N e x t`, textConfigNext).setOrigin(0.5, 0.5);
  rectTextNext.setAlpha(0.1)
    const hitAreaNext = this.add.zone(x, y, width, height).setOrigin(0.5, 0);
    
    let currentText;
    let count = 0;
    const numberOfRectangles = 4;
    const spacing = 10;
    let rectangles = [];
    let texts = [];
    let response;
    let pista;

    function generateVariations(word) {
      const variations = [];
      const suffixes = ["t", "h", "n"];

      suffixes.forEach((suffix) => {
        let other = word + suffix;
        console.log(other);
        variations.push(other);

      });

      return variations;
    }

    const updateText = () => {
      if (pista) pista.destroy();
      pista = this.add.image(0, 0, "pista").setScale(0.15);
      pista.setOrigin(0.5, 0);
      pista.setPosition(this.cameras.main.width / 2, 220);
      pista.setInteractive({ cursor: "pointer" });

      pista.on("pointerdown", () => {
         alternatves();
        pista.destroy();
      });

      if (currentText) currentText.destroy();
      rectangles.forEach((rect) => rect.destroy());
      texts.forEach((text) => text.destroy());
      rectangles = [];
      texts = [];

      currentText = this.add
        .text(0, 0, examData.tuelvenWords[count].spanish, textConfigSpanish)
        .setOrigin(0.5, 0.5);
      currentText.setPosition(this.cameras.main.width / 2, y - 230);
      currentText.setColor("#00afef");
      currentText.setFontSize(30) 
    };

    const alternatves = () => {
      let alternatives = generateVariations(examData.tuelvenWords[count].english);
      alternatives = [...alternatives, examData.tuelvenWords[count].english].sort(
        () => Math.random() - 0.5
      );
      console.log(alternatives);
      const totalHeight =
        numberOfRectangles * height + (numberOfRectangles - 1) * spacing;
      const startY = (this.cameras.main.height - totalHeight) / 3;

      for (let i = 0; i < alternatives.length; i++) {
        const xA =
          i < numberOfRectangles / 2
            ? this.cameras.main.width - 340
            : this.cameras.main.width - 170;
        const yA = startY + (i % (numberOfRectangles / 2)) * (height + spacing);
        const widthA = 150;

        const rectText = this.add.text(
          xA + widthA / 2,
          yA + height / 2,
          alternatives[i],
          textConfigSpanish
        );
        rectText.setOrigin(0.5, 0.5);
        texts.push(rectText);
      }
    };

    const title = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 30,
      "Traduce al ingles",
      textConfigEnglish
    );
    title.setOrigin(0.5);
    title.setColor('#ffffff')
  title.setFontSize(35)


    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.style.position = "absolute"; 
    inputElement.style.left = `${window.innerWidth / 2 - 125}px`; 
    inputElement.style.top = `${window.innerHeight / 2 + 70}px`; 
    inputElement.style.width = "250px";
    inputElement.style.height = "40px";
    inputElement.style.zIndex = "1000";
    inputElement.style.fontSize = "30px";
    inputElement.style.textAlign = "center";
    inputElement.style.color = "white ";
    inputElement.style.letterSpacing = "3px";
    inputElement.style.border = " 1px solid white";
    inputElement.style.borderRadius = "20px";
    inputElement.style.backgroundColor = "transparent";

    document.body.appendChild(inputElement);

    const touchArea = document.createElement("div");
    touchArea.style.position = "absolute"; 
    touchArea.style.left = `${window.innerWidth / 2 - 125}px`; 
    touchArea.style.top = `${window.innerHeight / 2 + 70}px`; 
    touchArea.style.width = "250px";
    touchArea.style.height = "50px";
    touchArea.style.backgroundColor = "transparent";
    touchArea.style.display = "flex";
    touchArea.style.alignItems = "center";
    touchArea.style.justifyContent = "center";
    touchArea.style.textAlign = "center";
    touchArea.style.cursor = "pointer";
    touchArea.style.zIndex = "1000";

    document.body.appendChild(touchArea);

    touchArea.addEventListener("touchstart", (event) => {
      event.preventDefault(); 
      inputElement.focus(); 
    });

    document.addEventListener("touchstart", (event) => {
      if (!touchArea.contains(event.target) && event.target !== inputElement) {
        inputElement.blur();
      }
    });

    inputElement.addEventListener("input", (event) => {
      if (event.target.value !== "") {
        console.log("hola");
        response = event.target.value;

        nextBoton.clear();
        nextBoton.lineStyle(1, 0xffffff);
    nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);
        rectTextNext.setAlpha(1);
        hitAreaNext.setInteractive();
      } else {
        nextBoton.clear();
        nextBoton.lineStyle(1, 0xffffff, 0.1);
        nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);
        rectTextNext.setAlpha(0.1);
        hitAreaNext.disableInteractive();
      }
    });
     updateText();

    this.events.on("shutdown", () => {
      inputElement.remove();
      });

    hitAreaNext.on("pointerdown", () => {
      hitAreaNext.disableInteractive()
      if (count == examData.tuelvenWords.length - 1) {
        examData.tuelvenWords=[]
        examData.exam4=0     
        saveStorage()
        this.scene.start("FinalExam");
      } else {
        response = response.toLowerCase();
        
        if (response.trim() === examData.tuelvenWords[count].english) {
            this.soundWin.play();
          this.time.delayedCall(500, () => {
            count++;
            updateText();
            inputElement.value = "";
          });
        } else {

          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
        }
      }
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
  /*   this.anims.create({
      key: "idle", 
      frames: this.anims.generateFrameNumbers("monkey", { start: 0, end: 5 }), 
      frameRate: 10,
      repeat: -1
    }); */

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
      // this.exam();
    }); 
}
question(){
  this.question1 = this.add
  .image(
    this.cameras.main.width / 2,
    this.cameras.main.height / 2,
    "question3"
  ).setScale(3)
 

 this.time.delayedCall(500, () => {
   this.question1.destroy();
  this.createExit()
    this.crear();
 }); 
}

}
