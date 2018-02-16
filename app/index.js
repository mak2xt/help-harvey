import {HeroDrawer} from "./rendering/hero/hero-drawer";
import {SlidingLineContainer} from "./rendering/sliding-line/sliding-line-container";
import {CaseManager} from "./case/case-manager";
import {Hero} from "./hero/hero";
import {Game} from "./game/game";
import {CaseFactory} from "./case/case-factory";
import {LevelManager} from "./game/level-manager";
import {ScoreBoard} from "./rendering/score-board/score-board";
import {ScoreStorage} from "./score-storage/score-storage";
import {GameContainer} from "./rendering/game-container";
import {mobileAndTabletcheck} from "./util/util";
import {HeroContainer} from "./rendering/hero/hero-container";
import {getGapInPixels} from "./rendering/lines-gap";
import {StartModal} from "./rendering/start-modal";

document.addEventListener("DOMContentLoaded", function() {

    let gameContainer = new GameContainer('game-container')

    let slidingLineContainer = new SlidingLineContainer('sliding-lines-container', gameContainer);

    let heroContainer = new HeroContainer('hero', getGapInPixels(gameContainer.getDimensions()))
    let heroDrawer = new HeroDrawer(heroContainer, 'left')
    let hero = new Hero('left');

    let caseManager = new CaseManager(slidingLineContainer.getLines(), heroDrawer.getCatchCoordinates())

    let scoreBoard = new ScoreBoard(
        document.getElementById('level'),
        document.getElementById('score'),
        document.getElementById('best-score')
    )

    scoreBoard.injectBestScore(ScoreStorage.getBestScore())

    let game = null;

    window.startGame = () => {
        if(game){
            game = null;
        }
        game = new Game(new LevelManager(), hero, CaseFactory, caseManager, scoreBoard, startModal)
        game.init(1).start();
    }

    let startModal = new StartModal(gameContainer, window.startGame)

    startModal.create();


    window.left = function () {
        game.changeHeroPosition('left')
        heroDrawer.onChange('left')
    }

    window.right = function () {
        game.changeHeroPosition('right')
        heroDrawer.onChange('right')
    }

    if(mobileAndTabletcheck()){
        gameContainer.injectTouchControls(window.left, window.right)
    }

    document.addEventListener('keydown', function (e) {
        if (e.keyCode == '37') {
            window.left()
        }
        else if (e.keyCode == '39') {
            window.right()
        }
    })

    window.onresize = function () {
        slidingLineContainer.destroyLines()
        slidingLineContainer.drawLines()
        heroContainer.setWidth(getGapInPixels(gameContainer.getDimensions()))
    }

});
