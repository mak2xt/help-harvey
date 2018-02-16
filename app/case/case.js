

export class Case {
    /**
     *
     * @param expirationTime - amount of time in ms
     * @param {[string, string]} casePosition - tuple [horizontalPosition, verticalPosition]
     */
    constructor(expirationTime, casePosition){
        this.expirationTime = expirationTime
        this.casePosition = casePosition
    }
    getHorizontalPosition(){
        return this.casePosition[0]
    }
    getVerticalPosition(){
        return this.casePosition[1]
    }
    getExpirationTime(){
        return this.expirationTime
    }
    setExpitationTime(newTime){
        this.expirationTime = newTime
    }
}