// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-create-countries-dialog',
//   templateUrl: './create-countries-dialog.component.html',
//   styleUrls: ['./create-countries-dialog.component.css']
// })
// export class CreateCountriesDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }





import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  Cities,
  CitiesDto,
  CitiesServiceProxy,
  CountriesServiceProxy,
  CountryDto,
  CountryDtoPagedResultDto,
  PermissionDto,
  // CreateCountriesDto,
  PermissionDtoListResultDto
} from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { runInNewContext } from 'vm';

@Component({
  templateUrl: 'create-countries-dialog.component.html'
})
export class CreateCountriesDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  countries = new CountryDto();
  countryid:number;
  // cities:CitiesDto[] = [];
  cities = new CitiesDto();
  citiesarr :any[] = [];
  countries2 :CountryDto[] = [];
  countrycount : number;

  newcitiesarr :any[] = [];
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _countriesService: CountriesServiceProxy,
    private _citiesService: CitiesServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.citiesarr = [];

  }


  isPermissionChecked(permissionName: string): boolean {
    return this.defaultPermissionCheckedStatus;
  }

  onPermissionChange(permission: PermissionDto, $event) {
    this.checkedPermissionsMap[permission.name] = $event.target.checked;
  }

  getCheckedPermissions(): string[] {
    const permissions: string[] = [];
    _forEach(this.checkedPermissionsMap, function (value, key) {
      if (value) {
        permissions.push(key);
      }
    });
    return permissions;
  }

  save(): void {
    this.saving = true;

    const countries = new CountryDto();
    countries.init(this.countries);
    // countries.grantedPermissions = this.getCheckedPermissions();

    this._countriesService
      .create(countries)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
          this._countriesService
          .getAllforcountries()
          .subscribe((result: CountryDtoPagedResultDto) => { 
            this.countries2 = result.items;
            const newcountry = this.countries2.find((m)=>m.countryname==this.countries.countryname)
            this.countrycount = newcountry.id
            console.log(this.countrycount);
            for (let i = 0; i < this.newcitiesarr.length; i++) {
              this.newcitiesarr[i].countryid = this.countrycount
            }
          });
        }
      );
     
    
      
    
  
     
     if(this.newcitiesarr.length > 0 && this.countrycount !=undefined){
      for (let i = 0; i < this.newcitiesarr.length; i++) {

          console.log(this.countrycount);
        // this._citiesService
        // .create(this.newcitiesarr[i])
        // .subscribe(
        //   () => {
        //     this.notify.info(this.l('SavedSuccessfully'));
        //     this.bsModalRef.hide();
        //     this.onSave.emit();
        //   },
        //   () => {
        //     this.saving = false;
        //   }
        // );

        
       }
     }



    
  

      
  }
  

  //add city
  AddorEditCity(cities:CitiesDto){
   console.log(cities);
   const newcity = new CitiesDto();
    newcity.cityName = cities.cityName;
    newcity.population = cities.population;
    newcity.id = cities.id;

   this.citiesarr.push(newcity)
   this.newcitiesarr.push(newcity)
   this.cities.cityName = '';
   this.cities.population = 0;
   this.cities.countryId = 0;
  }
}