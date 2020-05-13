export class User{
   
   constructor(public email:string,
            public userId:string,
            private _tokenExpirationDate:Date,
            private _idToken:string){}
    
    get idToken(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._idToken;
    }
     
}