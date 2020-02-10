const config = require('../config/vars');

export default class debug {
    private static active: boolean = config.debug;
    
    /**
     * log
     */
    public static log(text: String) {
        if(this.active) {
            console.log('[Debug]: ' + text);
        }
        
    }
};