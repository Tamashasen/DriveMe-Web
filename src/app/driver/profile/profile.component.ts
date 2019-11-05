import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface Driver{
  name: string;
  email: string;
  driverTelephone: string;
  driverAddress: string;
  driverNIC: string;
  driverLicense: string;
  password: string;
  vehicleNumber: string;
  vehicleChassis: string;
  availableSeets: string;
  vehicleType: Selection;
  isAC: Boolean;
  isDeleted: Boolean;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string;
  email: string;
  driverTelephone: string;
  driverAddress: string;
  driverNIC: string;
  driverLicense: string;
  password: string;
  vehicleNumber: string;
  vehicleChassis: string;
  availableSeets: string;
  vehicleType: Selection;
  isAC: Boolean;
  isDeleted: Boolean;


 private driverDoc: AngularFirestoreCollection<Driver>;
 drivers: Observable<Driver[]>;
 driver: Observable<Driver>

 constructor(
   private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
   private _snackBar: MatSnackBar,) { 
     let userID: string;
     this.spinner.show();
     userID = localStorage.getItem('currentUserId');
     this.driverNIC = userID;
     this.afs.doc<Driver>('users/user/driver/'+userID).valueChanges().subscribe(
       dri_obj=>{
         this.name = dri_obj.name;
         this.email = dri_obj.email;
         this.driverTelephone= dri_obj.driverTelephone;
         spinner.hide();
       }
     );  
   }

 ngOnInit() {
   // this.drivers.forEach(x=>{
   //     x.forEach(y=>{
   //       y.payload.id;
   //     });
   // });

   
 }

 changedriverDetails(driverId: string , driver:Driver){
   this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editdriverdetails']}}],{queryParams: {driverId: driverId}})

   // this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editdriverdetails']}}],{queryParams: {driver: JSON.stringify(driver)}})
   // this.router.navigateByUrl('/admin/(adminnavbar:editdriverdetails)',{queryParams:driver});
   // console.log("passing value==="+driver.driverNIC);
 }

 removeDriver(driverId: string){
   this.afs.doc('users/user/driver/'+driverId).update({isDeleted:true}).then(_ => {
       this.openSnackBar("Driver Removed","Done");
     }
   );
   // this.afs.doc('users/user/driver/'+driverId).delete().then(_=>{
   //   this.openSnackBar("Driver Removed","Done");
   // });
 }
 
 openSnackBar(message: string, action: string) {
   this._snackBar.open(message, action, {
     duration: 2000,
   });
 }

}
