import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Equipment } from './equipment';
import { EquipmentService } from './equipment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public equipments: Equipment[] | undefined;

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit() {
    this.getEquipments();
  }

  public getEquipments(): void {
    this.equipmentService.getEquipment().subscribe(
      (response: Equipment[]) => {
        this.equipments = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
