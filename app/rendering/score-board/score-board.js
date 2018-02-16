

export class ScoreBoard {
    constructor(levelEl, scoreEl, bestScoreEl){
        this.levelEl = levelEl
        this.scoreEl = scoreEl
        this.bestScoreEl = bestScoreEl
    }
    injectScore(score){
        this.scoreEl.innerHTML = `SCORE: ${score}`
    }
    injectBestScore(bestScore){
        this.bestScoreEl.innerHTML = `BEST: ${bestScore}`
    }
    injectLevel(level){
        this.levelEl.innerHTML = `LEVEL: ${level}`
    }
}