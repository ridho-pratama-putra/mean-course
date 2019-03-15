import { AbstractControl } from "@angular/forms";
import { Observable , Observer } from "rxjs";

// below is asynchronous validator . we have to register some event which the reader will be fire when its done reading
// and parsing file little bit longer and not to block javascript ececution
// normal asynchronous javascript will return object which have key value pair (Promise <-- keduanya generic type --> | Observable)
// promise adalah default javascript type
// Observable adalah milik rxjs
// because they are generic so we can clear about which value they will eventually yield
// key yang di return adalah error code 
// if validator return null the value is trated to be valid
// baik promise atau observable punya return dengan format <{[key:string]: any}> maksunya adalah Promise/Observable akan punya property key yang bisa diinterpretasikan sebagai string dan tidak peduli namanya. square bracket tidak mengindikasikan array, hanya menandakan kalau itu dynamic property. dan bagian any nya adalah value nya

export const mimeType = (control : AbstractControl) : Promise<{[key:string] : any}> | Observable<{[key:string] : any}> =>{
    const file = control.value as File;
    const fileReader = new FileReader();

    // thanks to rxjs
    const fileReaderObservable = Observable.create((observer : Observer) => {

    });

}