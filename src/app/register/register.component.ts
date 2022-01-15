import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from './auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,private router:Router,private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      email: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(70), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      phoneNo: new FormControl('', [Validators.required ]),
    });
  }

  get has(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  
  handleSubmit() {
    this.submitted = true;
    if(this.registerForm.invalid) {
      return;
    }
    let reqData = {
      vUserName:this.registerForm.value.userName,
      vEmail:this.registerForm.value.email,
      vPassword:this.registerForm.value.password,
      nPhone:this.registerForm.value.phoneNo,
    }
    console.log(reqData);
    this.authService.Register(reqData).subscribe((result:any) => {
        if(result['code'] == 200) {
          sessionStorage.setItem('token',result['token']);
          this.router.navigate(['/dashboard']);          
        }
        else {
          swal.fire(result.message);     
        }
    },(error:any)=> {
       console.log(error);
    })
  }
  
}
