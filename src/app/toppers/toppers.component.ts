import { Component, OnInit } from '@angular/core';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import { AngularFireDatabase } from '@angular/fire/compat/database';


export interface User {
  name: string;
  age: number;
  score: number;
}


@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.css']
})
export class ToppersComponent implements OnInit {

   data=[]
  datasource = new MatTableDataSource<User>(this.data);
  displayedColumns = ["name","age","score"];

  constructor(private db: AngularFireDatabase) { 
    this.db.list<User>("users").valueChanges().forEach((ele)=>{
       var data:User[]=[]
       ele.forEach(v=>{
         if(v.score>90){
          data.push(v as User)
         }
       })
       this.datasource.data=data
   })
  }

  ngOnInit(): void {
  
   
  }


    filter(event:Event){
        const filterValue = (event.target as HTMLInputElement).value;
        this.datasource.filter = filterValue.trim().toLowerCase();
    }

   

}
