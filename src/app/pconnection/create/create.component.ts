import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {PconnectionService} from "../pconnection.service";
import { ActivatedRoute } from '@angular/router';
import {Pconnection} from "../pconnection";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  // How to deal with parameters
  // https://www.techiediaries.com/angular/angular-9-route-parameters-snapshot-parammap-example/
  pconnectionForm: FormGroup;
  pconnectionForUpdate: Pconnection;
  pconnectionForUpdateId: number;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public pconnectionService: PconnectionService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.pconnectionForUpdateId = this.route.snapshot.params.pconnectionId;
    console.log(this.pconnectionForUpdateId);
    if ( typeof this.pconnectionForUpdateId !== 'undefined' ) {
      this.pconnectionService.getById(this.pconnectionForUpdateId).subscribe(pcon => {
        console.log(pcon)
        this.pconnectionForUpdate = pcon;

        this.pconnectionForm = this.fb.group({
          id: pcon.id,
          host: [pcon.host],
          port: pcon.port,
          wsport: pcon.wsport,
          password: pcon.password
        });

      })
    } else {
      this.pconnectionForm = this.fb.group({
        host: ['void'],
        port: 8080,
        wsport: 8887,
        password: ['']
      })
    }
  }

  submitForm() {
    this.pconnectionService.create(this.pconnectionForm.value).subscribe(res => {
      console.log('Connection created!')
      this.router.navigateByUrl('pconnection/home')
      console.log(this.router)
    })
  }


}
