import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {  
  // Bind http client.
  constructor(private _httpClient:HttpClient) {}

  // Get api for fetch data.
  getApi(apiRoute:any, authHeaders:any = null): Observable<any>{    
    return this._httpClient.get(`${environment.BACKEND_BASEURL}${apiRoute}`, { headers:authHeaders });
  }

  // Get api for pagination data fetch.
  getPaginateApi(apiRoute:any, authHeaders:any = null): Observable<any>{  
    return this._httpClient.get(`${apiRoute}`, { headers:authHeaders });
  }

  // Get api for fetch data for particular id.
  getApiById(apiRoute:any, authHeaders:any = null): Observable<any>{
    return this._httpClient.get(`${environment.BACKEND_BASEURL}${apiRoute}`, { headers:authHeaders });
  }

  // Post api for save data.
  postApi(apiRoute:any, authHeaders:any = null, data:any=null): Observable<any>{
    return this._httpClient.post(`${environment.BACKEND_BASEURL}${apiRoute}`, data, { headers:authHeaders });
  }

  // Patch api for half modify data.
  patchApi(apiRoute:any, authHeaders:any = null, data:any=null): Observable<any>{
    return this._httpClient.patch(`${environment.BACKEND_BASEURL}${apiRoute}`, data, { headers:authHeaders });
  }

  // Put api for update whole modify data.
  putApi(apiRoute:any, authHeaders:any = null, data:any=null): Observable<any>{
    return this._httpClient.put(`${environment.BACKEND_BASEURL}${apiRoute}`, data, { headers:authHeaders });
  }

  // Delete api for delete particular data.
  deleteApi(apiRoute:any, authHeaders:any = null): Observable<any>{
    return this._httpClient.delete(`${environment.BACKEND_BASEURL}${apiRoute}`, { headers:authHeaders });
  }
}