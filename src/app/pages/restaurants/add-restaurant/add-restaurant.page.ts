import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { RestaurantService } from '../../../shared';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {

  public restaurantForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public fb: FormBuilder,
    private restaurantS: RestaurantService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      capacity: [0, Validators.required],
    });
  }

  registerRestaurant() {
    console.log(this.restaurantForm.value);
    this.restaurantS.createRestaurant(this.restaurantForm.value).subscribe(
      (response) => {
        console.log(response);
        this.navCtrl.goBack();
        //this.navCtrl.navigateBack('/main/list-restaurants');
      },
      (err) => {
        console.log(err)
      }
    );
  }

}
