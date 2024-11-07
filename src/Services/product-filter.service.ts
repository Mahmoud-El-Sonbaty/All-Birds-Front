// import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs';
// import { environment } from '../environments/environment.development';
// import { HttpClient } from '@angular/common/http';
// import { ApiFilterBody } from '../Modules/FilterTypes';
// import { ApiresponsePrd } from '../Modules/Product';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductFilterService {

//   constructor(private httpclient : HttpClient) { }

//   getProductFilter(apiFilterBody : ApiFilterBody):Observable<ApiresponsePrd>
//   {
//     console.log(apiFilterBody);

//     return this.httpclient.post<ApiresponsePrd>(`${environment.BaseUrl}/Product/filter` , apiFilterBody );
//   }


//   getAllProducts(_subCategoryId : number):Observable<ApiresponsePrd>
//   {
//     return this.httpclient.get<ApiresponsePrd>(`${environment.BaseUrl}/Product/${_subCategoryId}`);
//   }}
