import { Component, OnInit } from '@angular/core';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import { AngularFireDatabase } from '@angular/fire/compat/database';

export interface User {
  name: string;
  age: number;
  score: number;
}


@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {

  data=[]
  datasource = new MatTableDataSource<User>(this.data);
  displayedColumns = ["name","score"];

  constructor(private db: AngularFireDatabase) { 
    this.db.list<User>("winners").valueChanges().forEach((ele)=>{
       var data:User[]=[]
       ele.forEach(v=>{
          data.push(v as User)
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
