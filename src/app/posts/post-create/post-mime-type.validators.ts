import { AbstractControl } from "@angular/forms";
import { Observable , Observer , of} from "rxjs";

// below is asynchronous validator . we have to register some event which the reader will be fire when its done reading
// and parsing file little bit longer and not to block javascript ececution
// normal asynchronous javascript will return object which have key value pair (Promise <-- keduanya generic type --> | Observable)
// promise adalah default javascript type
// Observable adalah milik rxjs
// because they are generic so we can clear about which value they will eventually yield
// key yang di return adalah error code 
// if validator return null the value is trated to be valid
// baik promise atau observable punya return dengan format <{[key :string]: any}> maksunya adalah Promise/Observable akan punya property key yang bisa diinterpretasikan sebagai string dan tidak peduli namanya. square bracket tidak mengindikasikan array, hanya menandakan kalau itu dynamic property. dan bagian any nya adalah value nya

export const mimeType = (control : AbstractControl) : Promise<{[key:string] : any}> | Observable<{[key:string] : any}> =>{
    if(typeof(control.value === 'string')){
      return of(null);
    }
    const file = control.value as File;
    const fileReader = new FileReader();

    // by handled rxjs
    // with create, we can create observable from scratch
    // observable tak es function as argument, and that function automatically get an observer, that passed in by rxjs and its type of observer
    // so observer nya rxjs harus import juga 
    // observer adalah tool untuk kontrol saat observable emits new data
    const fileReaderObservable = Observable.create((observer : Observer<{[key:string] : any}>) => {
        fileReader.addEventListener("loadend",  () => {
            // will executed once we are done, we do the validation process
            const arr = new Uint8Array(<ArrayBuffer>fileReader.result).subarray(0,4);
            let header = "";
            let isValid = false;
            for (let i = 0; i < arr.length; i++){
                header += arr[i].toString(16)
            }

            switch (header) {
                case "89504e47":
                  isValid = true;
                  break;
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                  isValid = true;
                  break;
                default:
                  isValid = false; // Or you can use the blob.type as fallback
                  break;
              }
              if (isValid) {
                observer.next(null);
              } else {
                observer.next({ invalidMimeType: true });
              }
              observer.complete();

        });

        // this will allow us to access mime type
        fileReader.readAsArrayBuffer(file);

    });
    return fileReaderObservable;
}