import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'


import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr'
// import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employeeList : any;
  constructor(private employeeService : EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.value.EmployeeID == null) {
      // Perform Insert
      this.employeeService.postEmployee(form.value)
      .add(x => {
        this.employeeService.getEmployeeList().then(data=>
        {
          this.employeeList = data;
        });
        
      })
      this.toastr.warning("Added Successfully","Employee Register");
      // this.router.navigate(['/employee-list']);
    } else {
      // Perform Update 
      this.employeeService.udateEmployee(form.value.EmployeeID,form.value)
      .add(x => {
        this.employeeService.getEmployeeList().then(data=>
        {
          this.employeeList = data;
        });
        
      })
      this.toastr.warning("Update Successfully","Employee Register");
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    }
  }
 

}
