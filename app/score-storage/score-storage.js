

export class ScoreStorage {
    static getBestScore(){
        if(localStorage.best === undefined){
            return 0
        }
        return localStorage.best;
    }
    static setBestScore(score){
        localStorage.best = score;
    }
}