import { Component, OnInit } from '@angular/core';
import { Equipment } from '../equipment';
import { EquipmentService } from '../equipment.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  public equipments!: Equipment[] 

  totalLength: any;
  page: number = 1;

  constructor(private userService: UserService, private equipmentService: EquipmentService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
   
  }
}