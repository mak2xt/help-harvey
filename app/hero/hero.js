

export class Hero {
    /**
     *
     * @param {string} curPosition - 'left' or 'right'
     */
    constructor(curPosition){
        this.curPosition = curPosition
    }

    /**
     *
     * @param {string} pos - 'left' or 'right'
     */
    changePosition(pos){
        if(pos !== 'left' && pos !== 'right'){
            throw new Error(`Position has to be left or right, ${pos} is not valid`)
        }
        this.curPosition = pos;
    }
    getPosition(){
        return this.curPosition
    }
}