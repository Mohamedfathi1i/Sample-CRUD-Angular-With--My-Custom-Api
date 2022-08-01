import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Productinterface } from './productinterface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {


  productsubject = new Subject<Productinterface>();
  productl: any;

 
  constructor(private _HttpClient: HttpClient) { }
  
  
  GetProduct(): Observable<any> {
   this.productl =  this._HttpClient.get('http://localhost:5111/Product');
   return this.productl;
  }
  
  postproduct(data:any){
    this._HttpClient.post<any>('http://localhost:5111/Product', data).subscribe((data)=>{
      console.log("success");
 });
  }

//   update(id: string, data: any) {
//      this._HttpClient.put(`${baseUrl}/${id}`, data);
// }

deleteProduct(id:any){
   this._HttpClient.delete('http://localhost:5111/Product/'+id);
   console.log('http://localhost:5111/Product/'+id);

  }


}
