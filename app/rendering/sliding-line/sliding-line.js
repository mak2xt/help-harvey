

export class SlidingLine {
    /**
     * @param {Element} container - container in which line should be placed
     * @param {{width: number, height: number}} size
     * @param {"left" | "right"} slopeType
     */
    constructor(container, size, slopeType){
        this.container = container;

        this.slopeType = slopeType;
        this.size = size;

        this.canvas = document.createElement("canvas");
        this.canvas.classList.add(`line-${slopeType}`)
        this.draw()
    }
    createCanvasLine(ctx, width, height){
        let startPos = {}
        let endPos = {}
        if(this.slopeType === 'left'){
            startPos.x = 0
            startPos.y = 0
            endPos.x = width
            endPos.y = height
        } else {
            startPos.x = width
            startPos.y = 0
            endPos.x = 0
            endPos.y = height
        }
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x, endPos.y);
        ctx.stroke();
    }
    draw(){

        this.canvas.width = this.size.width
        this.canvas.height = this.size.height

        this.createCanvasLine(this.canvas.getContext("2d"), this.canvas.width, this.canvas.height)

        this.container.appendChild(this.canvas)
    }
    destroy(){
        this.canvas.remove();
    }
    getLineRect(){
        let boundingClientRect = this.canvas.getBoundingClientRect()
        return {
            top: boundingClientRect.top,
            bottom: boundingClientRect.bottom,
            left: boundingClientRect.left,
            right: boundingClientRect.right
        }
    }
}