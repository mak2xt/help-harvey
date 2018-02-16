

export class HeroDrawer {
    /**
     * @param {HeroContainer} container
     * @param {string} position - 'left' or 'right'
     */
    constructor(container, position){
        this.container = container.getElement()
        this.heroContainer = container
        this.position = position
        this.el = document.createElement("div")
        this.el.classList.add('hero')
        this.el.classList.add(position)
        this.container.appendChild(this.el)
    }
    onChange(position){
        if(position === this.position){
            return false;
        }
        this.el.classList.remove(this.position)
        this.el.classList.add(position)
        this.position = position
    }
    getCatchCoordinates(){
        let containerRect = this.container.getBoundingClientRect()

        return {
            top: containerRect.top + this.heroContainer.getTopMargin(),
            left: containerRect.left,
            right: containerRect.right
        }
    }
}