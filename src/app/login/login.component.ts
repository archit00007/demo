import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../register/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(70), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    });
  }

  get has(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  handleSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let reqData = {
      vEmail: this.loginForm.value.email,
      vPassword: this.loginForm.value.password,
    }
    this.authService.Login(reqData).subscribe(async(result: any) => {
      if (result['code'] == 200) {
        sessionStorage.setItem('token', result.token);
        this.router.navigate(['/dashboard']);
      }
      else {
        swal.fire(result.message);
      }
    }, (error: any) => {
      console.log(error);
    })
  }

}
