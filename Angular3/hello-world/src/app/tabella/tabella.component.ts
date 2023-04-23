import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../types/Employee';



@Component({
  selector: 'app-tabella',
  templateUrl: './tabella.component.html',
  styleUrls: ['./tabella.component.css']
})
export class TabellaComponent implements OnInit{
  
  data: any
  displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName', 'gender', 'hireDate', 'delete', 'edit'];
  currentUrl: string = "http://localhost:8080/employees"
  currentEmployee: Employee | undefined;
  links: any;
  currentElement: any ={};
  
constructor(private employeeService: EmployeeService){
  this.loanData(this.currentUrl);
}

ngOnInit(): void {
  this.loanData("http://localhost:8080/employees");
}

loanData(url: string): void{
  this.currentUrl = url;
  this.employeeService.get(url).subscribe(
    data => {
      this.data = data
      console.log(this.data);
      this.links=data._links
    }
  )
}

addFn() {
  //edit
  if (this.currentElement.id) {
    this.employeeService.put(this.currentElement._links.self.href, this.currentElement).subscribe(
      (data) => {
        this.loanData(this.currentUrl);
      }
    )  
  } else { //add
    this.employeeService.post("http://localhost:8080/employees", this.currentElement).subscribe(
      (data) => {
        this.loanData(this.links.last.href);
      }
    )  
  }
}

firstPage(){
  if (this.data) this.loanData(this.data._links.first.href);
}
prevPage(){
  if (this.data) this.loanData(this.data._links.prev.href);
}
nextPage(){
  if (this.data) this.loanData(this.data._links.next.href);
}
lastPage(){
  if (this.data) this.loanData(this.data._links.last.href);
}
delete(urlWithId: string){
  this.employeeService.delete(urlWithId).subscribe( (data) => {
    this.loanData(this.currentUrl);
  }
  );
}


}



