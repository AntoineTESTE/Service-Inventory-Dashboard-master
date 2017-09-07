import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';



// Appel des routes de l'API
@Injectable()
export class ReposService {

  constructor(
    private http: Http
  ) { }

  getRepos() {
    return this.http.get('http://localhost:6752/repos').map((res: Response) => res.json());
  }
}