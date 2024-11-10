import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../Services/product.service';
import { IproductSearch } from '../../../Modules/Product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CurrencyPipe,CommonModule,TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  {
  BaseImage: string = environment.BaseIMageUrl;
  sub: Subscription[] = [] as Subscription[];

  public ProductCards!: IproductSearch[];
  @Input('id') CatIdURL: string = '';
  public Msg: string = '';
  public NamePrdSearch: string = '';
  public Lang : string = 'Ar'
  constructor(private productService: ProductService) {

  }
  ngOnChanges(): void {

    // this.getAllProductByCatId(Number(this.CatIdURL));



  }

  OnSearch(Input: string) {
    this.NamePrdSearch = Input;
    this.getProductByName(this.NamePrdSearch , this.Lang)

  }

  getProductByName(NamePrdSearch: string, Lang: string) {

    let item = this.productService.getProductsByName(NamePrdSearch , Lang).subscribe({
      next: (res) => {
        if (!res.isSuccess) {
          this.ProductCards = []
          this.Msg = res.msg;
          console.log(this.Msg);

        }
        else {
          this.ProductCards = res.data;
          console.log(this.ProductCards);
        }
      },
      error: (error) => {
        console.log(error);
      }

    })
    this.sub.push(item);
  }



  ngOnDestroy(): void {
    for (const element of this.sub) {
      element.unsubscribe();
    }
  }
}
