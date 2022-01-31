import { Component, OnInit } from '@angular/core';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import { AngularFireDatabase } from '@angular/fire/compat/database';

export interface User {
  name: string;
  age: number;
  score: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data=[]
  datasource = new MatTableDataSource<User>(this.data);
  displayedColumns = ["name","score","winner"];

  constructor(private db: AngularFireDatabase) { 
    this.db.list<User>("users").valueChanges().forEach((ele)=>{
       var data:User[]=[]
       ele.forEach(v=>{
         if(v.age<21){
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

    async addWinner(event:Event,u:User){
      var v=await confirm("Do you want to add to winner?")
      console.log(v)
      if(v){
        this.db.list("winners").push({"name":u.name,"score":u.score})
      }
    }

    
}
