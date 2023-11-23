// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-edit-countries-dialog',
//   templateUrl: './edit-countries-dialog.component.html',
//   styleUrls: ['./edit-countries-dialog.component.css']
// })
// export class EditCountriesDialogComponent implements OnInit {

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
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CountriesServiceProxy,
  // GetCountriesForEditOutput,
  CountryDto,
  PermissionDto,
  // CountriesEditDto,
  FlatPermissionDto,
  CitiesDto,
  CitiesServiceProxy,
  CitiesDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
class PagedCitiessRequestDto extends PagedRequestDto {
  keyword: string;
}
@Component({
  selector: 'app-edit-countries-dialog',
  templateUrl: './edit-countries-dialog.component.html',
  styleUrls: ['./edit-countries-dialog.component.css']
})
export class EditCountriesDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  keyword = '';
  countries = new CountryDto();
  cities = new CitiesDto();
  citiesarr :any[] = [];
  newcities :any[] = [];
  deletedcities :number[] = [];
  countrycitiesarr :any[] = [];
  permissions: FlatPermissionDto[];
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};

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
    this._countriesService
      .get(this.id)
      .subscribe((result: CountryDto) => {
        this.countries = result;
        // this.permissions = result.permissions;
        // this.grantedPermissionNames = result.grantedPermissionNames;
        this.setInitialPermissionsStatus();
      });


    //get cities
    this._citiesService
    .getallforcities()
    .subscribe((result: CitiesDtoPagedResultDto) => {
      this.citiesarr = result.items;
      const filtercity = this.citiesarr.filter((m)=>m.countryId==this.countries.id)
      this.citiesarr = filtercity; 
    });
  }



  // GetCities(){
  //   for (let i = 0; i < this.citiesarr.length; i++) {
  //   console.log("asdfsd")
  //   console.log(this.citiesarr[i].filter((m)=>m.countryId==this.id))
  //   }
  // }
 

  setInitialPermissionsStatus(): void {
    _map(this.permissions, (item) => {
      this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
        item.name
      );
    });
  }

  isPermissionChecked(permissionName: string): boolean {
    return _includes(this.grantedPermissionNames, permissionName);
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

    this._countriesService.update(countries).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );

    
     //add cities
     console.log(this.newcities);
     if(this.newcities.length > 0){
      for (let i = 0; i < this.newcities.length; i++) {


        this._citiesService
        .create(this.newcities[i])
        .subscribe(
          () => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.bsModalRef.hide();
            this.onSave.emit();
          },
          () => {
            this.saving = false;
          }
        );

        
       }
     }
  
  }

    //add city
    AddorEditCity(cities:CitiesDto){
 


      console.log(cities);
      const newcity = new CitiesDto();
       newcity.cityName = cities.cityName;
       newcity.population = cities.population;
       newcity.id = cities.id
       newcity.countryId = this.countries.id;
   
      this.citiesarr.push(newcity)
      this.newcities.push(newcity)
      this.cities.cityName = '';
      this.cities.population = 0;
      this.cities.countryId = 0;
     }

     //remove city
     Delectcity(id:number){
      console.log(id)
      this.citiesarr = this.citiesarr.filter((m)=>m.id != id);
      this.deletedcities.push(id);
      console.log(this.citiesarr)

     }
}
