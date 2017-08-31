export class Address{
    public $key: string;
    
    constructor(
        public street: string,
        public number: string,
        public zipcode: string,
        public city: string,
        public country: string
    ) {}
}