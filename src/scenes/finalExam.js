import Phaser from "phaser";
import loading from "../assets/loading.png";
import mankey from "../assets/mankey.png";
import { saveStorage } from "./exam1.js";
import { textConfigNext } from "./aprender.js";
import regularJson from "../json/regular.json";
import { examData } from "./aprender.js";

export default class FinalExam extends Phaser.Scene {
  constructor() {
    super("FinalExam");
  }

  preload() {
    this.load.image("loader", loading);
    this.load.spritesheet("monkey", mankey, {
      frameWidth: 95, 
      frameHeight: 85, 
    });
  }
  create() {
    this.animsMonkey();
    this.text1();
  }
  crear() {
    const x = this.cameras.main.width / 2; 
    const y = this.cameras.main.height - 100; 
    const width = 250; 
    const height = 50; 
    const nextBoton = this.add.graphics();
    nextBoton.lineStyle(1, 0xffffff);
    nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);

    const rectTextNext = this.add
      .text(x, y + height / 2, `N e x t`, textConfigNext)
      .setOrigin(0.5, 0.5);
    const hitAreaNext = this.add.zone(x, y, width, height).setOrigin(0.5, 0);
    hitAreaNext.setInteractive({ cursor: "pointer" });

    // Guardar referencias a los elementos del DOM
    this.progressContainer = document.createElement("div");
    this.progressBar = document.createElement("div");
    this.progressText = document.createElement("p");

    // Configuración de progressContainer
    this.progressContainer.style.width = "80px";
    this.progressContainer.style.height = "70vh";
    this.progressContainer.style.margin = "auto";
    this.progressContainer.style.backgroundColor = "#e0e0e0";
    this.progressContainer.style.borderRadius = "25px";
    this.progressContainer.style.display = "flex";
    this.progressContainer.style.justifyContent = "center";
    this.progressContainer.style.alignItems = "flex-end";
    this.progressContainer.style.position = "absolute";
    this.progressContainer.style.top = "8%";
    this.progressContainer.style.left = "50%";
    this.progressContainer.style.transform = "translateX(-50%)";

    // Configuración de progressBar
    this.progressBar.style.width = "100%";
    this.progressBar.style.height = "0%";
    this.progressBar.style.backgroundColor = "#00fce5";
    this.progressBar.style.borderBottomLeftRadius = "20px";
    this.progressBar.style.borderBottomRightRadius = "20px";
    this.progressBar.style.transition = "height 0.3s ease";

    // Configuración de progressText
    this.progressText.style.position = "absolute";
    this.progressText.style.bottom = "5%";
    this.progressText.style.left = "50%";
    this.progressText.style.transform = "translate(-50%, 0)";
    this.progressText.style.fontWeight = "900";
    this.progressText.style.fontSize = "2rem";
    this.progressText.innerText = "0%";

    // Añadir barra y texto al contenedor
    this.progressContainer.appendChild(this.progressBar);
    this.progressContainer.appendChild(this.progressText);

    // Añadir contenedor al cuerpo del documento
    document.body.appendChild(this.progressContainer);


    // Función para actualizar el progreso
    this.actualizarProgreso = () => {
      let porcentajeActual = Math.round(
        (examData.countGeneral / regularJson.length) * 100
      );
      examData.overalPorcentaje = porcentajeActual;
      saveStorage();
      if (examData.countGeneral <= regularJson.length) {
        if (examData.overalPorcentaje == 100) {
          this.progressBar.style.borderTopLeftRadius = "20px";
          this.progressBar.style.borderTopRightRadius = "20px";
        }
        this.progressBar.style.height = `${examData.overalPorcentaje}%`;
        this.progressText.innerText = `${examData.overalPorcentaje}%`;
      }
    };

    this.progressBar.style.height = `${examData.overalPorcentaje}%`;
    this.progressText.innerText = `${examData.overalPorcentaje}%`;

    this.progressTimeout = setTimeout(() => {
      this.actualizarProgreso();
      hitAreaNext.setInteractive({ cursor: "pointer" });

    }, 500);

    this.events.on("shutdown", () => {
      console.log("Shutdown event triggered");
      if (this.progressContainer) {
        document.body.removeChild(this.progressContainer);
        this.progressContainer = null;
      }
      if (this.progressTimeout) {
        clearTimeout(this.progressTimeout);
        this.progressTimeout = null;
      }
    });
    hitAreaNext.on("pointerdown", () => {
      nextBoton.clear();
      nextBoton.lineStyle(1, 0x00afef);
      nextBoton.strokeRoundedRect(x - width / 2, y, width, height, 20);
      rectTextNext.setColor("#00afef");
      console.log("ESTOY HACIENDO CLICK");
      this.time.delayedCall(1000, () => {
        if (examData.overalPorcentaje >= 100) {
        let user =confirm('muy bien terminaste la leccion REGRSAR A  MENU')
        user?  this.scene.start("Scene1"): this.scene.start("Scene1");
        } else {
          examData.activateRepeat=true
          saveStorage()
          this.scene.start("Aprender");
        }
      });
    });
  }
  animsMonkey() {


    this.mono = this.add
      .sprite(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 100,
        "monkey"
      )
      .setScale(2);
    this.mono.play("idle");
    this.time.delayedCall(1000, () => {
      this.mono.destroy();
      this.text.destroy();
      this.loader();
    });
  }
  text1() {
    this.text = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 20,
        " B u e n   T r a b a j o",
        {
          fontSize: "20px", 
          fontFamily: "Courier New ",
          color: "#ffffff", 
        }
      )
      .setOrigin(0.5, 0.5);
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
      this.crear();
    });
  }
}
