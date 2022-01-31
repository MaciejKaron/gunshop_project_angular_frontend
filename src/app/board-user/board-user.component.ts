import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Equipment } from '../equipment';
import { EquipmentService } from '../equipment.service';
import { User } from '../user';
import { Wishes } from '../wishes';
import { WishesService } from '../wishes.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  public equipments!: Equipment[]
  public users!: User[]
  public wishes!: Wishes[]

  totalLength: any;
  page: number = 1;

  currentUser: any;


  constructor(private token: TokenStorageService, private wishesService: WishesService, private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.getWishess();
  }


  public getWishess(): void {
    this.currentUser = this.token.getUser();
    this.wishesService.getAllMyWishes(this.currentUser.id).subscribe(
      (response: Wishes[]) => {
        this.wishes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteWish(wishId: number | undefined): void{
    this.wishesService.deleteWishes(wishId).subscribe(
      (response: void) => {
        console.log(response);
        this.getWishess();
       },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  




}