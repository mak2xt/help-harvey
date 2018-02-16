import {ScoreStorage} from "../score-storage/score-storage";


export class Game {
    /**
     * @description main class
     * @param {LevelManager} levelManager
     * @param {Hero} hero
     * @param {CaseFactory} CaseFactory
     * @param {CaseManager} caseManager
     * @param {ScoreBoard} scoreBoard
     * @param {StartModal} startModal
     */
    constructor(levelManager, hero, CaseFactory, caseManager, scoreBoard, startModal){
        this.levelManager = levelManager
        this.hero = hero
        this.CaseFactory = CaseFactory
        this.caseManager = caseManager
        this.scoreBoard = scoreBoard
        this.startModal = startModal
        this.score = 0;
        this.cases = []
        this.timers = []
        this.isOver = false;
    }
    /** PRIVATE METHODS */
    createCases(){
        let levelParams = this.levelManager.getLevelParams()
        return this.CaseFactory(levelParams.speed, levelParams.numOfCases)
    }

    /**
     *
     * @param {number} time - ms after which case will go out
     * @returns number - timeout reference for clearTimeout
     */
    delayCase(time){
        return setTimeout(() => {
            if(this.isOver){
                return false;
            }
            this.caseManager.pop().then(this.onCaseResolved.bind(this))
        }, time)
    }
    onCaseResolved(position){
        if(this.isOver){
            return false;
        }
        if(this.hero.getPosition() !== position){
            return this.endGame()
        }
        this.addScore()
        this.timers.pop()
        if(this.timers.length === 0){
            this.genNextLevel()
        }
    }
    addScore(){
        this.score++;
        this.scoreBoard.injectScore(this.score);
    }
    endGame(){
        this.isOver = true;
        this.caseManager.clear()
        this.timers.forEach(el => {
            clearTimeout(el)
        })
        if(this.score > ScoreStorage.getBestScore()){
            ScoreStorage.setBestScore(this.score)
            this.scoreBoard.injectBestScore(this.score)
        }
        this.startModal.create()
    }
    genNextLevel(){
        this.levelManager.levelUp()
        this.scoreBoard.injectLevel(this.levelManager.level)
        this.cases = this.createCases()
        for(let specCase of this.cases){
            this.caseManager.push(specCase)
        }
        this.start()
    }
    /** PUBLIC METHODS */
    /**
     * @param {number} level
     * @returns {Game}
     */
    init(level){

        this.scoreBoard.injectScore(this.score)
        this.scoreBoard.injectLevel(level)

        this.levelManager.setLevel(level)
        this.cases = this.createCases()
        for(let specCase of this.cases){
            this.caseManager.push(specCase)
        }
        return this;
    }

    /**
     *
     * @param {string} pos - 'left' or 'right'
     */
    changeHeroPosition(pos){
        this.hero.changePosition(pos)
    }
    start(){
        for(let i = 0; i < this.cases.length; i++){

            let timer = this.delayCase(i * 1000 / this.levelManager.getLevelParams().casesPerSec)

            this.timers.push(timer);

        }
    }
}