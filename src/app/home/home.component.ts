import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Equipment } from '../equipment';
import { EquipmentService } from '../equipment.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  totalLength: any;
  page: number = 1;

  public equipments!: Equipment[] 
  public editEquipment: Equipment | undefined;
  public delEquipment: Equipment | undefined;
  public wishEquipment: Equipment | undefined 

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  itemAfterWish: any;
  itemAfWi: boolean = false;

  constructor(private equipmentService: EquipmentService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getEquipments();
    this.access();
  }

  public  getEquipments(): void {
    this.equipmentService.getEquipment().subscribe(
      (response: Equipment[]) => {
        this.equipments = response;
        this.totalLength = response.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  updateWish(id: number) {
    this.itemAfWi = true;
    this.itemAfterWish = id;
  }


  public onAddEquipment(addForm: NgForm): void{
    document.getElementById('add-form-close')?.click();
    this.equipmentService.addEquipment(addForm.value).subscribe(
      (response: Equipment) => {
        console.log(response);
        this.getEquipments();
        addForm.reset();
       },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEquipment(equipment: Equipment): void{
    this.equipmentService.updateEquipment(equipment).subscribe(
      (response: Equipment) => {
        console.log(response);
        this.getEquipments();
       },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEquipment(equipmentId: number | undefined): void{
    this.equipmentService.deleteEquipment(equipmentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEquipments();
       },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(equipment: Equipment, mode: string): void {
    if (mode === 'edit') {
      this.editEquipment = equipment;
    }
    if (mode === 'delete') {
      this.delEquipment = equipment;
    }
    if (mode === 'wish') {
      this.wishEquipment = equipment;
    }
  }

  public searchEquipment(key: string): void {
    console.log(key);
    const results: Equipment[] = [];
    for (const equipment of this.equipments) {
      if (equipment.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || equipment.type_equipment.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || equipment.description.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) {
        results.push(equipment);
      }
    }
    this.equipments = results;
    if (results.length === 0 || !key) {
      this.getEquipments();
    }
  }

  public access() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }


}
