

export class HeroContainer {
    constructor(elementID, width){
        this.container = document.getElementById(elementID)
        this.setWidth(width)
    }
    /**
     *
     * @param {number} width - pixels
     */
    setWidth(width){
        this.container.style.width = `${width}px`
    }
    getElement(){
        return this.container
    }
    getTopMargin(){
        let style = window.getComputedStyle(this.container)
        return parseFloat(style.marginTop)
    }
}