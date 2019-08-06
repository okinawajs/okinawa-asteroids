import engine from 'okinawa.js/src/engine';
import Options from './options';
import * as SCENES from './scenes/scenes';
import Loader from './loader';
import AsteroidsPlayer from './player';
import Points from './points';

class Game {
  constructor() {
    // Generic
    this.options = null;
    this.loader = null;
    this.player = null;

    // Game specific
    this.commonBackground = null;
    this.points = null;
  }

  initialize() {
    // The specific game options could be reached as options AND as engine.options
    this.options = new Options();
    engine.options.addOptions(this.options);

    // Common background for every screen
    this.commonBackground = new SCENES.StarBackground();
    this.commonBackground.initialize();

    this.loader = new Loader();
    this.loader.initialize();

    engine.player = new AsteroidsPlayer();
    engine.player.initialize();

    this.points = new Points();
    this.points.initialize();
  }

  // Game Initialization
  activate() {
    engine.logs.log('activate', 'Starting game');

    let lvl = new SCENES.InitialScene();
    lvl.addBackground(this.commonBackground);
    lvl.playable = true;
    lvl.initialize();

    engine.scenes.addScene(lvl, 'start_game');

    lvl = new SCENES.Level();
    lvl.addBackground(this.commonBackground);
    lvl.playable = true;
    lvl.initialize();

    engine.scenes.addScene(lvl, 'main_game');
  }

  step() {}
}

// singleton pattern
const game = new Game();
export default game;
