import { Injectable } from '@angular/core';
import { Usuarios } from '../modelos/usuarios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UsuariosService {
  //base url server api
  private BASE_URL = 'https://jsonplaceholder.typicode.com/';
  //model user
  public usuarios: Observable<Usuarios[]>;

  constructor(public http: HttpClient) {
    this.loadUsersFromServer();
  }
  //get users
  getUsers(): Observable<Usuarios[]> {
    return this.usuarios;
  }
  //load users
  public loadUsersFromServer(): Observable<any> {
    return this.usuarios = this.http.get(this.BASE_URL + 'users').map(res => <any>res)
      .catch((error: any) => {
        if (error.status < 400 || error.status === 500) {
          return Observable.throw(new Error(error.status));
        }
      });
  }
  //filter user for name
  getUserByName(name: string) {
    //validate data filter name user =! empty
    if (name != "") {
      //return filter for name
      return this.usuarios.map(epics => epics.filter(epic => epic.name === name));
    } else {
      //return filter for all data where name != null
      return this.usuarios.map(epics => epics.filter(epic => epic.name != null));
    }
  }
}
