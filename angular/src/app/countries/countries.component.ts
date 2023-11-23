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


import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  CountriesServiceProxy,
  CountryDto,
  CountryDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateCountriesDialogComponent } from './create-countries-dialog/create-countries-dialog.component';
import { EditCountriesDialogComponent } from './edit-countries-dialog/edit-countries-dialog.component';

class PagedCountriessRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriessComponent extends PagedListingComponentBase<CountryDto> {
  countriess: CountryDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _countriessService: CountriesServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedCountriessRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._countriessService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CountryDtoPagedResultDto) => {
        this.countriess = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(countries: CountryDto): void {
    abp.message.confirm(
      this.l('CountriesDeleteWarningMessage'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._countriessService
            .delete(countries.id)
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

  createCountries(): void {
    this.showCreateOrEditCountriesDialog();
  }

  editCountries(countries: CountryDto): void  { 
    console.log("countries info");
    console.log(countries);
    this.showCreateOrEditCountriesDialog(countries.id);
  }

  showCreateOrEditCountriesDialog(id?: number): void {
    let createOrEditCountriesDialog: BsModalRef;
    if (!id) {
      createOrEditCountriesDialog = this._modalService.show(
        CreateCountriesDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditCountriesDialog = this._modalService.show(
        EditCountriesDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          }
        }
      );
    }

    createOrEditCountriesDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
