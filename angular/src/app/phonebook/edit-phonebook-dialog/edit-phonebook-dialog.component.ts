// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-edit-phonebook-dialog',
//   templateUrl: './edit-phonebook-dialog.component.html',
//   styleUrls: ['./edit-phonebook-dialog.component.css']
// })
// export class EditPhonebookDialogComponent implements OnInit {

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
  PhonebookServiceProxy,
  // GetPhonebookForEditOutput,
  PhonebookDto,
  PermissionDto,
  // PhonebookEditDto,
  FlatPermissionDto,
  CountriesServiceProxy,
  CountryDtoPagedResultDto,
  CountryDto,
  CitiesServiceProxy,
  CitiesDtoPagedResultDto,
  CitiesDto
} from '@shared/service-proxies/service-proxies';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { Console } from 'console';
class PagedCountriessRequestDto extends PagedRequestDto {
  keyword: string;
}


@Component({
  selector: 'app-edit-phonebook-dialog',
  templateUrl: './edit-phonebook-dialog.component.html',
  styleUrls: ['./edit-phonebook-dialog.component.css']
})
export class EditPhonebookDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  phonebook = new PhonebookDto();
  permissions: FlatPermissionDto[];
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  keyword = '';
  cities: CitiesDto[] ;
  filteredCities: CitiesDto[] ;
  selectedcountry : number;
  selectedcity : number;
  countriess: CountryDto[] ;


  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _phonebookService: PhonebookServiceProxy,
    private _countryService: CountriesServiceProxy,
    private _citiesService: CitiesServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadcountries();
    this._phonebookService
      .get(this.id)
      .subscribe((result: PhonebookDto) => {
        this.phonebook = result;
        this.selectedcountry = this.cities.find((m)=>m.id==this.phonebook.cityId).countryId;
        this.selectedcity = this.phonebook.cityId;
        this.filteredCities = this.cities.filter((m)=>m.countryId==this.selectedcountry)
        console.log(this.selectedcountry);
        console.log(this.selectedcity);
       
        // this.countriess = this.countriess.filter((m)=>m.id==this.cities.)
        // this.permissions = result.permissions;
        // this.grantedPermissionNames = result.grantedPermissionNames;
        this.setInitialPermissionsStatus();
      });
  }
  

//get countries
private loadcountries():void{
  const request: PagedCountriessRequestDto = {
    keyword: this.keyword,
    skipCount: 0, 
    maxResultCount: 10,
  };

  
  //get country
  this._countryService
  .getAll(request.keyword, request.skipCount, request.maxResultCount)
  .subscribe((result: CountryDtoPagedResultDto) => {
    this.countriess = result.items;

  });


    //get cities
    this._citiesService
    .getAll(request.keyword, request.skipCount, request.maxResultCount)
    .subscribe((result: CitiesDtoPagedResultDto) => {
      this.cities = result.items;

    });
}
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

    const phonebook = new PhonebookDto();
    phonebook.init(this.phonebook);
    // phonebook.grantedPermissions = this.getCheckedPermissions();

    this._phonebookService.update(phonebook).subscribe(
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

  
  oncountrychange(id:any){

    if(id != null){
     this.filteredCities = this.cities.filter((m)=>m.countryId==id)
 
    } 
    else{
     this.filteredCities = this.cities;
    }
   }

}
