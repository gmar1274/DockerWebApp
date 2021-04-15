export class User{
    constructor(
        public name?:string,
        public description?:string,
        public address?:string,
        public city?:string,
        public state?:string,
        public zip?:string,
        public country?:string,
        public lat?:number,
        public lon?:number
    ){}
}