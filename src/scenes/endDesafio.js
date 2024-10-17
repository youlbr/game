import Phaser from "phaser";
import loading from "../assets/loading.png";
import exit from "../assets/exit.png";
import imgScore from "../assets/imgScore.png";
import level from "../assets/completedLevel.png";
import hear from "../assets/eart.png";
import monex from "../assets/salvaje.png";
import back from "../assets/atras1.png";
import backTrue from "../assets/atras.png";
import repeat from "../assets/repeat.png";
import repeat1 from "../assets/repeat1.png";
import currentScore from "./desafio.js";
import regularJson from "../json/regular.json";
import sound from "../assets/win.wav";
import { textConfigSpanish } from "./aprender.js";
import { textConfigOptions } from "./main.scene.js";
import { currentScore } from "./desafio.js";

export default class EndDesafio extends Phaser.Scene {
  constructor() {
    super("EndDesafio");
  }

  preload() {
    this.load.image("loader", loading);
    this.load.image("exit", exit);
    this.load.audio("soundWin", sound);
    this.load.image("hear", hear);
    this.load.image("mono", monex);
    this.load.image("imgScore",imgScore );
    this.load.image("levelCompleted",level );
    this.load.image("backTrue", backTrue);
this.load.image("back", back);
this.load.image("repeatImage", repeat);
this.load.image("repeatImage1", repeat1);
  }

  create() {

    let datos = JSON.parse(localStorage.getItem("gameState"));

    if(datos.score===regularJson.length ){
this.createlevel()
    }else{
        this.score = this.add
        .image(
          this.cameras.main.width / 2,
          200,
          "imgScore"
        )
        .setScale(1);
        this.mono = this.add
        .image(
          this.cameras.main.width / 2,
          450,
          "mono"
        )
        .setScale(0.2);

        let back = this.add
        .image(
          this.cameras.main.width / 3,
          this.cameras.main.height - 50,
          "back"
        )
        .setScale(0.12);
      back.setOrigin(0.5, 0.5);
      
      back.setInteractive();
      
      back.on("pointerdown", () => {
        // Crear una nueva imagen en lugar de reasignar `back`
        let backTrue = this.add
          .image(
            this.cameras.main.width / 3,
            this.cameras.main.height - 50,
            "backTrue"
          )
          .setScale(0.12);
        backTrue.setOrigin(0.5, 0.5);
      
        this.time.delayedCall(250, () => {
          this.scene.start("Scene2");
        });
      });

      let repeatImage = this.add
      .image(
        this.cameras.main.width / 2 + 100,
        this.cameras.main.height - 50,
        "repeatImage"
      )
      .setScale(0.15);
    
    repeatImage.setOrigin(0.5, 0.5);
    repeatImage.setInteractive();
    
    repeatImage.on("pointerdown", () => {
      
      // Crear una nueva imagen antes de reiniciar la escena
      let newRepeatImage = this.add
        .image(
          this.cameras.main.width / 2 + 100,
          this.cameras.main.height - 50,
          "repeatImage1"
        )
        .setScale(0.15);
      newRepeatImage.setOrigin(0.5, 0.5);
    
      // Usar un pequeño retraso antes de reiniciar la escena
      this.time.delayedCall(250, () => {
        console.log('hola')
        this.scene.start("Desafio");
      });
    });
    this.createText()
    
     
    }


  }
  createlevel() {
    this.level = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "levelCompleted"
      )
      .setScale(2);

    this.time.delayedCall(1000, () => {
      this.level.destroy();
    });
  }

  createText() {
    let datos = JSON.parse(localStorage.getItem("gameState"));
    const scoreNEW = this.add.text(
        this.cameras.main.width / 3,
        this.cameras.main.height / 3 - 40,        
        `Mejor Record :  ` + datos.score,
        textConfigSpanish
      );
      scoreNEW.setColor('#00afef')
    const scoreAffter = this.add.text(
        this.cameras.main.width / 3,
        this.cameras.main.height / 3,          
        ` Ahora :  ` + currentScore,
        textConfigSpanish
      );
      scoreAffter.setColor('#ed3237')


  }


}