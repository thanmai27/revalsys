import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import *  as  data from '../products data.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  products: any = data.ProductsDetails;
  Images = [];
  productlength;
  startIndex = 0;
  LastIndex = 12
  colors: any = [];
  count_color: any = [];
  sortby: any;
  isfeedback = false
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {

    this.fnSortType()

    console.log(this.products);
    this.sortResults('Price', false);
    this.fnColors();



  }
  fnSortType() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.sortby = params['sortType'];
    })
  }
  fnPopular() {

    this.Images = [];
    this.products = data.ProductsDetails;
    this.products = this.products.filter(obj => obj.IsBestSeller == true);
    for (let i = 0; i < this.products.length; i++) {
      var words = this.products[i].Images.split("|");
      this.Images.push(this.products[i].ListImagePath + words[0])
    }
    if (this.products.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No products in Popular list',
        showConfirmButton: false,
        timer: 2000
      })
      this.products = data.ProductsDetails;
      for (let i = 0; i < this.products.length; i++) {
        var words = this.products[i].Images.split("|");
        this.Images.push(this.products[i].ListImagePath + words[0])
      }
    }
  }

  fnNewArrival() {
    this.Images = [];
    this.products = data.ProductsDetails;

    this.products = this.products.filter(obj => obj.IsNew == true);

    for (let i = 0; i < this.products.length; i++) {
      var words = this.products[i].Images.split("|");
      this.Images.push(this.products[i].ListImagePath + words[0])
    }


  }
  sortResults(prop, asc) {
    this.products = data.ProductsDetails;
    this.products = this.products.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
    for (let i = 0; i < this.products.length; i++) {
      var words = this.products[i].Images.split("|");
      this.Images.push(this.products[i].ListImagePath + words[0])
    }
  }
  fnLogout() {
    this.router.navigateByUrl('login');
    sessionStorage.clear();
  }
  fndes() {
    this.router.navigate(['list'], { queryParams: { sortType: 'hightolow' } });
    this.Images = []
    this.sortResults('Price', false);

  }
  fnasc() {
    this.router.navigate(['list'], { queryParams: { sortType: 'lowtohigh' } });
    this.Images = []
    this.sortResults('Price', true);

  }

  onScroll(event) {

  }
  fnColors() {

    for (let i = 0; i < this.products.length; i++) {
      this.colors.push(this.products[i].ColorName);
    }

    this.colors.sort();

    var current = null;
    var cnt = 0;
    this.count_color = []
    for (var i = 0; i < this.colors.length; i++) {
      if (this.colors[i] != current) {
        if (cnt > 0) {
          // console.log("hi",current  + cnt );
          this.count_color.push(cnt)
        }
        current = this.colors[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      // console.log(current + cnt);
      this.count_color.push(cnt)

    }
    this.colors = this.colors.sort().filter((item, i, ar) => ar.indexOf(item) === i);

  }

  fnColorFilter(clr) {
    var result = this.products.filter(obj => obj.ColorName == clr);
    console.log(result);

  }
  fnChange(event) {
    console.log(event.target.value, event.target.checked);
    this.fnColorFilter(event.target.value)

  }
  fnFeedback() {
    this.isfeedback = true
  }
  fnSubmit(form: NgForm) {
    sessionStorage.setItem("feedback_data", JSON.stringify(form.value))

     setTimeout(()=>{ form.reset();},1000)
  }
  fnReset(form: NgForm) {
    form.reset();
  }
}
