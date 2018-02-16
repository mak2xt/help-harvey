/**
 * @typedef {Object} SlidingPoints
 * @property {{x: number, y: number}} start
 * @property {{x: number, y: number}} end
 */

export class CaseDrawer {
    /**
     *
     * @param {SlidingPoints} slidingPoints
     * @param {{top: number, left: number}} catchCoordinates
     * @param {{fall: number, slide: number}} timings
     */
    constructor(slidingPoints, catchCoordinates, timings){
        this.element = document.createElement("div")
        this.element.classList.add('case')
        this.slidingPoints = slidingPoints
        this.catchCoordinates = catchCoordinates
        this.timings = timings
    }
    draw(){
        // this.canvas.width = 20;
        // this.canvas.height = 20;
        // let ctx = this.canvas.getContext("2d")
        // ctx.beginPath();
        // ctx.arc(10, 10, 10, 0, 2 * Math.PI);
        // ctx.fillStyle = "#0095DD";
        // ctx.fill()
        // ctx.closePath();
    }
    move(){
        this.element.style["transition-duration"] = `${this.timings.slide / 1000}s`;
        this.element.style.top = `${this.slidingPoints.end.y}px`
        this.element.style.left = `${this.slidingPoints.end.x}px`
        this.element.addEventListener('transitionend', (event) => {
            if (event.propertyName === 'top') {
                this.element.style["transition-duration"] = `${this.timings.fall / 1000}s`;
                this.element.style.top = `${this.catchCoordinates.top}px`
                this.element.style.left = `${this.catchCoordinates.left}px`
            }
        })
    }
    init(){
        this.draw()
        this.element.setAttribute('style', `top: ${this.slidingPoints.start.y}px;
         left: ${this.slidingPoints.start.x}px;
          transition-property: all;
          transition-timing-function: linear;`)
        document.body.appendChild(this.element)
    }
    destroy(){
        this.element.remove()
    }
}