// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-cities',
//   templateUrl: './cities.component.html',
//   styleUrls: ['./cities.component.css']
// })
// export class CitiesComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-countries',
//   templateUrl: './countries.component.html',
//   styleUrls: ['./countries.component.css']
// })
// export class CountriesComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, Injector, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  CitiesServiceProxy,
  CitiesDto,
  CitiesDtoPagedResultDto,
  CountriesServiceProxy,
  CountryDto,
  CountryDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateCitiesDialogComponent } from './create-cities-dialog/create-cities-dialog.component';
import { EditCitiesDialogComponent } from './edit-cities-dialog/edit-cities-dialog.component';
import { NgIf } from '@angular/common';

class PagedCitiessRequestDto extends PagedRequestDto {
  keyword: string;
}
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiessComponent extends PagedListingComponentBase<CitiesDto> {
  citiess: CitiesDto[] = [];
  keyword = '';
  countriess: CountryDto[] = [];


  constructor(
    injector: Injector,
    private _citiessService: CitiesServiceProxy,
    private _modalService: BsModalService,
    private _countryService: CountriesServiceProxy,

  ) {
    super(injector);
  }

  

  list(
    request: PagedCitiessRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

      //get country
      this._countryService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CountryDtoPagedResultDto) => {
        this.countriess = result.items;
        console.log(result.items);

      });    


    this._citiessService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CitiesDtoPagedResultDto) => {
        this.citiess = result.items;
        this.showPaging(result, pageNumber);
      });



  }

  delete(cities: CitiesDto): void {
    abp.message.confirm(
      this.l('CitiesDeleteWarningMessage'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._citiessService
            .delete(cities.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }

  createCities(): void {
    this.showCreateOrEditCitiesDialog();
  }

  editCities(cities: CitiesDto): void  { 
    console.log("cities info");
    console.log(cities);
    this.showCreateOrEditCitiesDialog(cities.id);
  }

  showCreateOrEditCitiesDialog(id?: number): void {
    let createOrEditCitiesDialog: BsModalRef;
    if (!id) {
      createOrEditCitiesDialog = this._modalService.show(
        CreateCitiesDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditCitiesDialog = this._modalService.show(
        EditCitiesDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditCitiesDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  getcountryname(countryId:number):string{
    const country = this.countriess.find((c) => c.id==countryId);
    return country.countryname ;
  }

}




