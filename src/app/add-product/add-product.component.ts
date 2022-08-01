import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { ProductServiceService } from '../product-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  SERVER_URL = 'http://localhost:24988/Product';
  // form: FormGroup;
  uploadForm: any;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private _ProductServiceService: ProductServiceService ,
    private router: Router,
    private route: ActivatedRoute,

    ) {
    this.uploadForm = this.fb.group({
      Name: [''],
      Description: [''],
      Price: [''],
      Cat_ID: [''],
      ImageFile: [null],
    });
  }

  ngOnInit(): void {}

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('ImageFile').setValue(file);
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('Name', this.uploadForm.get('Name').value);
    formData.append('Description', this.uploadForm.get('Description').value);
    formData.append('Price', this.uploadForm.get('Price').value);
    formData.append('Cat_ID', this.uploadForm.get('Cat_ID').value);
    formData.append('ImageFile', this.uploadForm.get('ImageFile').value);

    this._ProductServiceService.postproduct(formData);
  }
}
