

import { Component, Injector, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  PhonebookServiceProxy,
  PhonebookDto,
  PhonebookDtoPagedResultDto,
  CountriesServiceProxy,
  CountryDto,
  CountryDtoPagedResultDto,
  CitiesServiceProxy,
  CitiesDtoPagedResultDto,
  CitiesDto
} from '@shared/service-proxies/service-proxies';
import { CreatePhonebookDialogComponent } from './create-phonebook-dialog/create-phonebook-dialog.component';
import { EditPhonebookDialogComponent } from './edit-phonebook-dialog/edit-phonebook-dialog.component';

class PagedPhonebooksRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebooksComponent extends PagedListingComponentBase<PhonebookDto> {
  phonebooks: PhonebookDto[] = [];
  countries: CountryDto[] = [];
  keyword = '';
  countryname = '';
  cities: CitiesDto[] ;


  constructor(
    injector: Injector,
    private _phonebooksService: PhonebookServiceProxy,
    private _countryservice: CountriesServiceProxy,
    private _citiesService: CitiesServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedPhonebooksRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._phonebooksService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PhonebookDtoPagedResultDto) => {
        this.phonebooks = result.items;
        this.showPaging(result, pageNumber);
      });

    //get country
    this._countryservice
    .getAll(request.keyword, request.skipCount, request.maxResultCount)
    .subscribe((result: CountryDtoPagedResultDto) => {
      this.countries = result.items;
      // this.passDataToChild();
    });

      //get cities
      this._citiesService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .subscribe((result: CitiesDtoPagedResultDto) => {
        this.cities = result.items;
      });


  }


  delete(phonebook: PhonebookDto): void {
    abp.message.confirm(
      this.l('PhonebookDeleteWarningMessage'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._phonebooksService
            .delete(phonebook.id)
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

  createPhonebook(): void {
    this.showCreateOrEditPhonebookDialog();
  }

  editPhonebook(phonebook: PhonebookDto): void  { 
    console.log("phonebook info");
    console.log(phonebook);
    this.showCreateOrEditPhonebookDialog(phonebook.id);
  }

  showCreateOrEditPhonebookDialog(id?: number): void {
    let createOrEditPhonebookDialog: BsModalRef;
    if (!id) {
      createOrEditPhonebookDialog = this._modalService.show(
        CreatePhonebookDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditPhonebookDialog = this._modalService.show(
        EditPhonebookDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditPhonebookDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  getcityname(cityId:number):string{
      const city = this.cities.find((c) => c.id==cityId);
      this.countryname = this.countries.find((c) => c.id==city.countryId).countryname;
      return city.cityName; 
  }
  getcountryname(countryId:number):string{
    const country = this.countries.find((c) => c.id==countryId);
    return country.countryname ;
  }
}
