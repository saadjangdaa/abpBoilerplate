// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-edit-cities-dialog',
//   templateUrl: './edit-cities-dialog.component.html',
//   styleUrls: ['./edit-cities-dialog.component.css']
// })
// export class EditCitiesDialogComponent implements OnInit {

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
  CitiesServiceProxy,
  // GetCitiesForEditOutput,
  CitiesDto,
  PermissionDto,
  // CitiesEditDto,
  FlatPermissionDto,
  CountriesServiceProxy,
  CountryDtoPagedResultDto,
  CountryDto
} from '@shared/service-proxies/service-proxies';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
class PagedCountriessRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-edit-cities-dialog',
  templateUrl: './edit-cities-dialog.component.html',
  styleUrls: ['./edit-cities-dialog.component.css']
})
export class EditCitiesDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  cities = new CitiesDto();
  permissions: FlatPermissionDto[];
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};
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
    this._citiesService
      .get(this.id)
      .subscribe((result: CitiesDto) => {
        this.cities = result;
        // this.permissions = result.permissions;
        // this.grantedPermissionNames = result.grantedPermissionNames;
        this.setInitialPermissionsStatus();
      });
      this.loadcountries();
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

    const cities = new CitiesDto();
    cities.init(this.cities);
    // cities.grantedPermissions = this.getCheckedPermissions();

    this._citiesService.update(cities).subscribe(
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
