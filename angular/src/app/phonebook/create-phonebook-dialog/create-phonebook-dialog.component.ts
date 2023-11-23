// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-create-phonebook-dialog',
//   templateUrl: './create-phonebook-dialog.component.html',
//   styleUrls: ['./create-phonebook-dialog.component.css']
// })
// export class CreatePhonebookDialogComponent implements OnInit {

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
  Input,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  PhonebookServiceProxy,
  PhonebookDto,
  PermissionDto,
  // CreatePhonebookDto,
  PermissionDtoListResultDto,
  CountriesServiceProxy,
  CountryDto,
  CountryDtoPagedResultDto,
  CitiesDtoPagedResultDto,
  PhonebookDtoPagedResultDto,
  CitiesServiceProxy,
  CitiesDto
} from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { request } from 'https';
class PagedCountriessRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-create-phonebook-dialog',
  templateUrl: './create-phonebook-dialog.component.html',
  styleUrls: ['./create-phonebook-dialog.component.css']
})
export class CreatePhonebookDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  phonebook = new PhonebookDto();
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  keyword = '';
  countriess: CountryDto[] ;
  cities: CitiesDto[] ;
  filteredCities: CitiesDto[] ;
  selectedcountry : number;


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
  }

 

  private loadcountries():void{
    const request: PagedCountriessRequestDto = {
      keyword: this.keyword,
      skipCount: 0, 
      maxResultCount: 10,
    };

    
    this._countryService
    .getAll(request.keyword, request.skipCount, request.maxResultCount)
    .subscribe((result: CountryDtoPagedResultDto) => {
      this.countriess = result.items;

    });


      this._citiesService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .subscribe((result: CitiesDtoPagedResultDto) => {
        this.cities = result.items;
  
      });
  }

  isPermissionChecked(permissionName: string): boolean {
    // just return default permission checked status
    // it's better to use a setting
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

    const phonebook = new PhonebookDto();
    phonebook.init(this.phonebook);

    this._phonebookService
      .create(phonebook)
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

  oncountrychange(id:any){

   if(id != null){
    this.filteredCities = this.cities.filter((m)=>m.countryId==id)

   } 
   else{
    this.filteredCities = this.cities;
   }
  }

}
