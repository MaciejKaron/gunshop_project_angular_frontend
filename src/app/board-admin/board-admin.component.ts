import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ActivationStart, Data } from '@angular/router';
import { Role, User } from '../user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  public users!: User[] 
  public editUser: User | undefined
  public delUser: User | undefined
 

  
  currentUser: any;
 

  constructor(private userService: UserService, private token: TokenStorageService) { }
  

  ngOnInit(): void {
    this.getUsers();
    this.getUser(21);
  }

  public getUsers(): void {
    this.userService.getUser().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public changeRoleModerator(user: User, mode: string): void{
    if (mode === 'mod') {
      this.editUser = user;

      user = {
        id: this.editUser.id,
        username: this.editUser.username,
        password: this.editUser.password,
        email: this.editUser.email,
        avatar: this.editUser.avatar,
        roles: [
          {
            id: 1,
            name: "ROLE_USER"
          },
          {
            id: 2,
            name: "ROLE_MODERATOR"
          }
        ]
      }
    }

    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public changeRoleUser(user: User, mode: string): void{
    if (mode === 'user') {
      this.editUser = user;

      user = {
        id: this.editUser.id,
        username: this.editUser.username,
        password: this.editUser.password,
        email: this.editUser.email,
        avatar: this.editUser.avatar,
        roles: [
          {
            id: 1,
            name: "ROLE_USER"
          }
        ]
      }
    }
      
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public changeRoleAdmin(user: User, mode: string): void{
    if (mode === 'admin') {
      this.editUser = user;

      user = {
        id: this.editUser.id,
        username: this.editUser.username,
        password: this.editUser.password,
        email: this.editUser.email,
        avatar: this.editUser.avatar,
        roles: [
          {
            id: 1,
            name: "ROLE_USER"
          },
          {
            id: 2,
            name: "ROLE_MODERATOR"
          },
          {
            id: 3,
            name: "ROLE_ADMIN"
          }
        ]
      }
    }

    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  
 
  public onUpdateUser(user: User): void{
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
       },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteUser(userId: number | undefined): void{
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
       },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(user: User, mode: string): void {
    if (mode === 'edit') {
      this.editUser = user;
    }
    if (mode === 'delete') {
      this.delUser = user;
    }
  }

  public getUser(id: number) {
    this.userService.getUserById(id).subscribe(
      (response) => {
        this.currentUser = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public updUser(user: User, id: number) {
    this.userService.updUser(user = this.currentUser, id = this.currentUser.id).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

  adminRoles:[{ "id": 2; "name": "ROLE_MODERATOR"; }, { "id": 1; "name": "ROLE_USER"; }, { "id": 3; "name": "ROLE_ADMIN"; }] | undefined
  modRoles: [{ "id": 2, "name": "ROLE_MODERATOR" }, { "id": 1, "name": "ROLE_USER" }] | undefined
  userRoles:[{ "id": 1, "name": "ROLE_USER" }] | undefined

  public data() {
    return this.adminRoles;
  }

  data1() {
    return this.modRoles;
  }
  
  data2() {
    return this.userRoles;  
  }
  
  setRoleModerator(){
    this.currentUser.roles = this.data1();
  }
  setRoleAdmin() {
    this.currentUser.roles = this.data()
  }
  setRoleUser() {
    this.currentUser.roles = this.data2();
  }

 

 


 
  

  

}