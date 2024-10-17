import Phaser from "phaser";
import miLogo from "../assets/logo.png";
// localStorage.clear('gameState')
export const textConfigTitle = {
  fontSize: "2rem",
  fontFamily: "Arial",
  fill: "#ffffff",
  align: "center",
  // stroke: "rgba(255, 255, 255, 0.9)", // Borde blanco con 50% de opacidad
  strokeThickness: 0,
};
export const textConfigSubTitle = {
  fontSize: "1.5em",
  fontFamily: "Arial",
  fill: "#ffffff",
  align: "center",
  // stroke: "rgba(255, 255, 255, 0.9)", // Borde blanco con 50% de opacidad
  strokeThickness: 0,
};
export const textConfigOptions = {
  fontSize: "1.7em",
  fontFamily: "Arial",
  fill: "#ffffff",
  align: "center",
  // stroke: "rgba(255, 255, 255, 0.9)", // Borde blanco con 50% de opacidad
  strokeThickness: 0,
};


 



export default class Scene1 extends Phaser.Scene {
  constructor() {
    super("Scene1");
  }

  preload() {
    this.load.image("logo", miLogo);
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

    const logo = this.add.image(0, 0, "logo").setScale(0.25);
    logo.setOrigin(0.5, 0);
    logo.setPosition(
      this.cameras.main.width / 2,
      this.cameras.main.height - 100
    );

    this.createOption();
  }

  update() {}

  createOption() {
    const word = [
      "V e r b o s    R e g u l a r e s",
      "A d j e t i v o s",
      "V e r b o s    I r e g u l a r e s",
      "C o s a s",
      "F a m i l i a",
    ];
    let selectedHitArea = null; // Variable para almacenar el hitArea seleccionado
    const hitAreas = [];

    for (let i = 0; i < 5; i++) {
      const x = this.cameras.main.width / 2;
      const width = 250;
      const height = 50;
      const y = 180 + i * 70;
      const rect = this.add.graphics();
      rect.lineStyle(0.5, 0xffffff);
      rect.strokeRoundedRect(x - width / 2, y, width, height, 20);

      const rectText = this.add.text(
        x,
        y + height / 2,
        ` ${word[i]}`,
        textConfigOptions
      );
      rectText.setOrigin(0.5, 0.5);

      // Hacer el área interactiva
      const hitArea = this.add.zone(x, y, width, height);
      hitArea.setOrigin(0.5, 0);
      hitArea.setInteractive({ cursor: "pointer" });
      hitAreas.push(hitArea);

      hitArea.on("pointerdown", () => {
        console.log(word[i]);
        selectedHitArea = hitArea; 
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
        rect.fillStyle(0x00afef, 0.8); // Cambiar color de fondo a negro
        rect.fillRoundedRect(x - width / 2, y, width, height, 20);

        rectText.setFill("#ffffff"); // Cambiar color del texto a blanco
        this.time.delayedCall(350, () => {
          if (word[i] === "V e r b o s    R e g u l a r e s")this.scene.start("Scene2");
          if (word[i] === "A d j e t i v o s")this.scene.start("Working");
          if (word[i] === "C o s a s")this.scene.start("Working");
          if (word[i] === "V e r b o s    I r e g u l a r e s")this.scene.start("Working");
          if (word[i] === "F a m i l i a")this.scene.start("Working");
        });
      });
    }
  }
}
