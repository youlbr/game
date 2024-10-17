import Phaser from "phaser";
import miLogo from "../assets/logo.png";
import back from "../assets/atras1.png";
import backTrue from "../assets/atras.png";
import { textConfigTitle } from "./main.scene.js";
import { textConfigSubTitle } from "./main.scene.js";
import { textConfigOptions } from "./main.scene.js";


export default class Scene2 extends Phaser.Scene {
  constructor() {
    super("Scene2");
  }

  preload() {
    this.load.image("logo", miLogo);
    this.load.image("backTrue", backTrue);
    this.load.image("back", back);
  }

  create() {
    const text = this.add.text(0, 0, "L E A R N D I N G ", textConfigTitle);
    text.setOrigin(0.5, 0);
    text.setPosition(this.cameras.main.width / 2, 50);

    const text1 = this.add.text(
      0,
      0,
      "* V O C A B U L A R I E S *",
      textConfigSubTitle
    );
    text1.setOrigin(0.5, 0);
    text1.setPosition(this.cameras.main.width / 2, 90);

    let back = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height - 250,
        "back"
      )
      .setScale(0.12);
    back.setOrigin(0.5, 0.5);

    back.setInteractive();

    back.on("pointerdown", () => {
      back = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height - 250,
          "backTrue"
        )
        .setScale(0.12);
      back.setOrigin(0.5, 0.5);
      this.time.delayedCall(250, () => {
        this.scene.start("Scene1");
      });
    });

    const logo = this.add.image(0, 0, "logo").setScale(0.25);
    logo.setOrigin(0.5, 0);
    logo.setPosition(
      this.cameras.main.width / 2,
      this.cameras.main.height - 100
    );

    this.createOption();
  }

  update() {}



  createOption(){
    const word = [
      "A p r e n d e r",
      "R e p a s a r",
      "P o n e r m e   a   P r u e v a",
    ];
    
    let selectedHitArea = null; // Variable para almacenar el hitArea seleccionado
    const hitAreas = [];
    
    let datos = JSON.parse(localStorage.getItem("gameState"));
console.log(datos)
    
    // Definir si se deben activar los otros botones
    let activateRepeat = datos ? datos.activateRepeat : false;
    
    for (let i = 0; i < word.length; i++) {
      const x = this.cameras.main.width / 2;
      const width = 250;
      const height = 50;
      const y = 200 + i * 70;
    
      const rect = this.add.graphics();
      const hitArea = this.add.zone(x, y, width, height).setOrigin(0.5, 0);
      hitAreas.push(hitArea);
    
      const rectText = this.add.text(
        x,
        y + height / 2,
        ` ${word[i]}`,
        textConfigOptions
      ).setOrigin(0.5, 0.5);
    
      // Condiciones de interactividad y opacidad
      if (activateRepeat || i === 0) {
        rect.lineStyle(0.5, 0xffffff);
        rect.strokeRoundedRect(x - width / 2, y, width, height, 20);
        hitArea.setInteractive({ cursor: "pointer" });
        
        rectText.setAlpha(1);  // Texto y rectángulo visibles
      } else {
        // Si `activateRepeat` es falso, atenuar los botones que no sean "Aprender"
        rect.lineStyle(0.5, 0xffffff, 0.1);  // Atenúa el rectángulo
        rect.strokeRoundedRect(x - width / 2, y, width, height, 20);
        rectText.setAlpha(0.1);  // Atenúa el texto
      }
    
      // Evento de clic en el área interactiva
      hitArea.on("pointerdown", () => {
        console.log(word[i]);
        selectedHitArea = hitArea;
        
        // Desactivar interactividad después de hacer clic
        if (selectedHitArea) {
          selectedHitArea.off("pointerdown");
          selectedHitArea.setInteractive(false);
        }
    
        hitAreas.forEach((area) => {
          if (area !== selectedHitArea) {
            area.disableInteractive();
          }
        });
    
        // Cambiar el color del rectángulo y el texto al hacer clic
        rect.clear(); // Limpia el gráfico antes de rellenar
        rect.fillStyle(0x00afef, 0.8); // Cambiar color de fondo
        rect.fillRoundedRect(x - width / 2, y, width, height, 20);
        rectText.setFill("#ffffff"); // Cambiar color del texto a blanco
    
        // Diferentes acciones dependiendo del texto
        this.time.delayedCall(350, () => {
          if (word[i] === "A p r e n d e r") {
            this.scene.start("Aprender");
          } else if (word[i] === "R e p a s a r" && activateRepeat) {
            this.scene.start('Repeat')
          } else if (word[i] === "P o n e r m e   a   P r u e v a" && activateRepeat) {
            this.scene.start('Desafio')
          }
        });
      });
    }
    
  }
}
