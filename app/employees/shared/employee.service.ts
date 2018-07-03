import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Employee} from'./employee.model'

@Injectable()
export class EmployeeService {

  selectedEmployee : Employee;
  employeeList: any;
  constructor(public http: HttpClient) { }

  getEmployeeList(){
    return new Promise(resolve => {
      this.http.get('http://localhost/api/Employee.php').subscribe(data => {
        resolve(data);
        this.employeeList = data;
      }, err => {
        console.log(err);
      });
    });
  }

  postEmployee(a){
   return this.http.post('http://localhost/api/addEmployee.php', a, {responseType: 'text'}).subscribe(
      val => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  udateEmployee(id, a) {
    return this.http.put('http://localhost/api/updateEmployee.php?id=' + id, a, {responseType: 'text'}).subscribe(
      (val) => {
        
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://localhost/api/deleteEmployee.php?id=' + id).subscribe(
      (val) => {
        
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }
  
}
