import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {PconnectionService} from "../pconnection.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  pconnectionForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public pconnectionService: PconnectionService
  ) { }

  ngOnInit(): void {
    this.pconnectionForm = this.fb.group({
      host: ['void'],
      port: 8080,
      wsport: 8887,
      password: ['']
    })
  }

  submitForm() {
    this.pconnectionService.create(this.pconnectionForm.value).subscribe(res => {
      console.log('Connection created!')
      this.router.navigateByUrl('pconnection/home')
      console.log(this.router)
    })
  }


}
