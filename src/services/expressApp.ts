import * as mongoose from 'mongoose';

export class ExpressApp {

    app: object;

    constructor(){
       this.app = null

       
       console.log('huga')

        this.setupDB()
    }

    setupDB(){
        const MONGO_URI = 'mongodb://localhost:27017/todo';
    
        return mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology:true});
    }
    
}