

export class StartModal {
    /**
     * @param {GameContainer} gameContainer
     * @param {Function} startGameFn
     */
    constructor(gameContainer, startGameFn){
        this.gameContainer = gameContainer;
        this.startGame = startGameFn;
        this.overlay = null;
        this.modal = null;
    }
    /** PRIVATE METHODS */
    createOverlayEl(){
        let overlay = document.createElement('div')
        overlay.classList.add('overlay')
        return overlay;
    }
    createModalEl(){
        let modal = document.createElement('div')
        modal.classList.add('modal')
        return modal;
    }
    /** PUBLIC METHODS */
    create(){
        this.overlay = this.createOverlayEl();
        this.modal = this.createModalEl();
        let playButton = document.createElement('button')
        playButton.classList.add('play-button')
        playButton.onclick = () => {
            this.destroy();
            this.startGame();
        };
        this.modal.appendChild(playButton);
        let container = this.gameContainer.getElement();
        container.appendChild(this.overlay)
        container.appendChild(this.modal);
    }
    destroy(){
        if(this.overlay !== null){
            this.overlay.remove()
            this.overlay = null;
        }
        if(this.modal !== null){
            this.modal.remove()
            this.modal = null;
        }
    }
}