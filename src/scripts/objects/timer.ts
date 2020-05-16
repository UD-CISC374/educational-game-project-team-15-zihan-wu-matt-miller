export default class Timer{

    /**
     * The time the Timer was started, in MS
     */
    static startTime: number;

    /**
     * Constructor private so can't make instance of it
     */
    private constructor(){ }

    /**
     * Sets the startTime for the timer. Overwrites last startTime if called multiple times
     */
    static startTimer():void{
        Timer.startTime = Date.now();
    }

    /**
     * Gets the number of seconds that have elapsed since 'startTime'
     */
    static getElapsedTime():number{
        return (Date.now() - Timer.startTime) / 1000; 
    }

    /**
     * Finds the number of elapsed seconds and returns it as a formatted string
     */
    static getFormattedTime():string{
        // Get the number of seconds, in whole seconds
        let seconds:number = Math.floor((Date.now() - Timer.startTime) / 1000);
        
        // Convert seconds to minutes and seconds
        let mins:string = Math.floor(seconds / 60).toFixed(0);
        let secs:string = (seconds % 60).toFixed(0);

        // Put more 0's if needed
        if(mins.length == 1)
            mins = "0" + mins;
        if(secs.length == 1)
            secs = "0" + secs;

        return mins+":"+secs;
    }   
}