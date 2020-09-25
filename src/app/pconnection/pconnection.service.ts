import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Pconnection} from "./pconnection";

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {IpcService} from "../ipc.service";

@Injectable({
  providedIn: 'root'
})
export class PconnectionService {

  constructor(private readonly ipc: IpcService) { }

  create(pconnection: Pconnection): Observable<Pconnection> {
    return new Observable<Pconnection>(observer => {
      observer.next(this.ipc.sendSync('pconnection-create', pconnection));
    }).pipe(
      catchError(this.errorHandler)
    );
  }
  getById(id: number): Observable<Pconnection> {
    return new Observable<Pconnection>(observer => {
      observer.next(this.ipc.sendSync('pconnection-getbyid', id));
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<Pconnection[]> {
    return new Observable<Pconnection[]>(observer => {
      observer.next(this.ipc.sendSync('pconnection-getall', 'ping'));
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  update(pconnection: Pconnection): Observable<Pconnection> {
    return new Observable<Pconnection>(observer => {
      observer.next(this.ipc.sendSync('pconnection-update', pconnection));
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id: number) {
    this.ipc.sendSync('pconnection-delete', id);
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
