import {firstLevelNumOfCases, getNextLevelNumOfCases, getPrevLevelNumOfCases} from "./level-defaults";


export class LevelManager {
    /**
     *
     * @param startLevel - positive integer
     */
    constructor(startLevel){
        this.level = 1
        this.numOfCases = firstLevelNumOfCases
        this.slowestSpeed = 1;
        if(startLevel !== 1 && startLevel){
            this.setLevel(startLevel)
        }
    }
    setLevel(level){
        for(let i = 1; i < level; i++){
            this.levelUp()
        }
    }
    levelUp(){
        this.level++;
        this.numOfCases = getNextLevelNumOfCases(this.numOfCases)
        return this;
    }
    levelDown(){
        this.level--;
        this.numOfCases = getPrevLevelNumOfCases(this.numOfCases)
        return this;
    }
    getSpeed(){
        return this.slowestSpeed - (this.level * 0.05)
    }
    getCasesPerSecond(){
        return 1.5 + (this.level * 0.05)
    }
    getNumOfCases(){
        return this.numOfCases
    }
    getLevelParams(){
        return {
            speed: this.getSpeed(),
            casesPerSec: this.getCasesPerSecond(),
            numOfCases: this.getNumOfCases()
        }
    }
}