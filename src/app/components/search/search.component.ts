  import { Component, Input } from '@angular/core';
  import { environment } from '../../../environments/environment.development';
  import { Subscription } from 'rxjs';
  import { ProductService } from '../../../services/product.service';
  import { IproductSearch } from '../../../models/Product';
  import { CommonModule, CurrencyPipe } from '@angular/common';
  import { TranslateModule } from '@ngx-translate/core';
  import { LoaderComponent } from '../loader/loader.component';
import { RouterLink } from '@angular/router';

  @Component({
    selector: 'app-search',
    standalone: true,
    imports: [CurrencyPipe,CommonModule,TranslateModule,LoaderComponent,RouterLink],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
  })
  export class SearchComponent  {
    BaseImage: string = environment.baseImageUrl;
    sub: Subscription[] = [] as Subscription[];
    loading:boolean=false;

    public ProductCards!: IproductSearch[];
    @Input('id') CatIdURL: string = '';
    public Msg: string = '';
    public NamePrdSearch: string = '';
    public Lang !: string ;
    constructor(private productService: ProductService) {

    }
    ngOnChanges(): void {

      // this.getAllProductByCatId(Number(this.CatIdURL));



    }

    OnSearch(Input: string) {
      this.NamePrdSearch = Input;
      this.getProductByName(this.NamePrdSearch )

    }

    getProductByName(NamePrdSearch: string) {
        this.loading=true;
      let item = this.productService.getProductsByName(NamePrdSearch).subscribe({
        next: (res) => {
          if (!res.isSuccess) {
            this.ProductCards = []
            this.Msg = res.msg;
            console.log(this.Msg);
            this.loading=false;

          }
          else {
            this.ProductCards = res.data;
            this.loading=false;

            console.log(this.ProductCards);
          }
        },
        error: (error) => {
          this.loading=false;

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
