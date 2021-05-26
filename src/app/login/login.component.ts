import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    var url = 'assets/images/login3.jpeg';
    $('body').css('background-image', 'url("' + url + '")');
    $('body').css('background-image', 'no-repeat');
    $('body').css('background-size', 'fixed');
    $('body').css('background-position', "0px 1120px");
  }
  ngOnDestroy(): void {

    $('body').css("background-image", "linear-gradient(white, white) ");


  }

  fnSubmit(form:NgForm)
  {
    
    if(form.value.user == "thanmai123@gmail.com" && form.value.password=='thanmai123')
    {
      sessionStorage.setItem('loggedUserdID',form.value.user)
      this.router.navigate(['list'], { queryParams: { sortType: 'hightolow' } })
    }
    else{
      sessionStorage.clear();
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid username and password',
        showConfirmButton: false,
        timer: 2000
      })   
      
      form.reset()
    }
  }
}
