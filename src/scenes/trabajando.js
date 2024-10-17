import Phaser from "phaser";
import miLogo from "../assets/logo.png";
import monkey from "../assets/trabajando.png";
import back from "../assets/atras1.png";
import backTrue from "../assets/atras.png";



export default class Working extends Phaser.Scene {
  constructor() {
    super("Working");
  }

  preload() {
    this.load.image("logo", miLogo);
    this.load.image("backTrue", backTrue);
    this.load.image("back", back);
    this.load.image("mankey", monkey);
  }

  create() {
    let back = this.add
    .image(
      this.cameras.main.width / 2,
      50,
      "back"
    )
    .setScale(0.12);
  back.setOrigin(0.5, 0.5);

  back.setInteractive();

    let mone = this.add
    .image(
      this.cameras.main.width / 2,
      this.cameras.main.height /2,
      "mankey"
    )
    .setScale(1.5);


  back.on("pointerdown", () => {
    back = this.add
      .image(
        this.cameras.main.width / 2,
        50,
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
  }
}