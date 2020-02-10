export default class debug {
    private static active: boolean;
    
    public static init(debug: boolean) {
        this.active=debug;
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