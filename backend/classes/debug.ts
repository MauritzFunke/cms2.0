export default class Debug {
    private static active: boolean;
    
    public static init(active: boolean) {
        this.active=active;
    }
    /**
     * log
     */
    public static log(text: String) {
        if(this.active) {
            console.log('[Debug]: ' + text);
        }
    }
};