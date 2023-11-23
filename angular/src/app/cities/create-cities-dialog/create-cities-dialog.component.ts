// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-create-cities-dialog',
//   templateUrl: './create-cities-dialog.component.html',
//   styleUrls: ['./create-cities-dialog.component.css']
// })
// export class CreateCitiesDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


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
  Input,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CitiesServiceProxy,
  CitiesDto,
  PermissionDto,
  // CreateCitiesDto,
  PermissionDtoListResultDto,
  CountriesServiceProxy,
  CountryDto,
  CountryDtoPagedResultDto,
  CitiesDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { request } from 'https';
class PagedCountriessRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-create-cities-dialog',
  templateUrl: './create-cities-dialog.component.html',
  styleUrls: ['./create-cities-dialog.component.css']
})
export class CreateCitiesDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  cities = new CitiesDto();
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  keyword = '';
  countriess: CountryDto[] ;
  


  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private _citiesService: CitiesServiceProxy,
    private _countryService: CountriesServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadcountries();
  }

 
// //get countries
// list(
//   request: PagedCountriessRequestDto,
//   pageNumber: number,
//   finishedCallback: Function
// ): void {
//   request.keyword = this.keyword;

//     //get country
//     this._countryService
//     .getAll(request.keyword, request.skipCount, request.maxResultCount)
//     .pipe(
//       finalize(() => {
//         finishedCallback();
//       })
//     )
//     .subscribe((result: CountryDtoPagedResultDto) => {
//       console.log("my country");
//       this.countriess = result.items;
//       console.log(result.items);

//     });
// }

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

    const cities = new CitiesDto();
    cities.init(this.cities);
    // cities.grantedPermissions = this.getCheckedPermissions();

    this._citiesService
      .create(cities)
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
