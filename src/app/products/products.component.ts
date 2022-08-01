import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, interval, Subscription } from 'rxjs';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  uploadForm: any;
  updateForm: any;
  products: any;
  updateSubscription: Subscription | undefined;
  dataforupdate: any;
  idforupdate:any;
  productscategory:any;

  constructor(
    private _ProductServiceService: ProductServiceService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.uploadForm = this.fb.group({
      Name: [''],
      Description: [''],
      Price: [''],
      Cat_ID: [''],
      ImageFile: [null],
    });

    this.updateForm = this.fb.group({
      Name: [''],
      Description: [''],
      Price: [''],
      Cat_ID: [''],
      ImageFile: [null],
    });
  }

  ngOnInit(): void {
    this.getdata();
    this.updateSubscription = interval(2000).subscribe(
      (val) => { this.getdata()});

      this.getCategory();

  }

  getdata() {
    this._ProductServiceService
      .GetProduct()
      .subscribe((productlist) => (this.products = productlist));
  }

  getCategory() {
    this.http.get('http://localhost:5111/api/Category').subscribe((productlist) => (this.productscategory = productlist));
  }

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('ImageFile').setValue(file);
    }
  }


  updateile(event: any) {
    if (event.target.files.length > 0) {
      const file2 = event.target.files[0];
      this.updateForm.get('ImageFile').setValue(file2);
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('Name', this.uploadForm.get('Name').value);
    formData.append('Description', this.uploadForm.get('Description').value);
    formData.append('Price', this.uploadForm.get('Price').value);
    formData.append('Cat_ID', this.uploadForm.get('Cat_ID').value);
    formData.append('ImageFile', this.uploadForm.get('ImageFile').value);

    this.http.post<any>('http://localhost:5111/Product', formData).subscribe((data)=>{
      console.log("success");
      });
  }


  getupdatedata(id:any){

    this.idforupdate =id
      this.http.get('http://localhost:5111/Product/'+id).subscribe((data) => {
        this.dataforupdate =data;
        this.updateForm.patchValue({

          Name:this.dataforupdate.name,
          Description:this.dataforupdate.description,
          Price:this.dataforupdate.price,
          Cat_ID:this.dataforupdate.cat_ID,
        })
      });

     this.getCategory();

  }


  update(){

    const updateformData = new FormData();
    updateformData.append('id', this.idforupdate);
    updateformData.append('Name', this.updateForm.get('Name').value);
    updateformData.append('Description', this.updateForm.get('Description').value);
    updateformData.append('Price', this.updateForm.get('Price').value);
    updateformData.append('Cat_ID', this.updateForm.get('Cat_ID').value);
    updateformData.append('ImageFile', this.updateForm.get('ImageFile').value);

    this.http.put('http://localhost:5111/Product/'+this.idforupdate, updateformData).subscribe((data)=>{
      console.log("success");
     });
 
  }



  Deleteproduct(id: any) {
    this.http.delete('http://localhost:5111/Product/'+id).subscribe((data) => {
      console.log('success');
    });
  }
}
