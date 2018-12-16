import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuarios } from '../modelos/usuarios';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  //observable users var
  public users: Observable<Usuarios[]>;
  //form search
  searchForm: FormGroup;

  constructor(private usuariosService: UsuariosService, private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    //init populate table of users
    this.getUsersAllData();
    //init form search
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
  }
  //get all users
  getUsersAllData() {
    //populate model users for service users 
    this.users = this.usuariosService.loadUsersFromServer();
  }
  //get user for name
  getUserForName() {
    //populate model users for service users 
      this.users = this.usuariosService.getUserByName(this.searchForm.value.search); 
  }
}
