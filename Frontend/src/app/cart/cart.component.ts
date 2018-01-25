import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  produkList = [];
  produkList2 = [];

  constructor(private http : Http, private route : Router) { }

  ngOnInit() {
    this.loadProdukList();
  }

  loadProdukList(){
    this.http.get("http://localhost:3000/api/produk/cartlist")
    .subscribe(
      result => {
        this.produkList = result.json();
        this.loadProdukList2();
        // console.log(this.produkList[2]._id);
      },
      error => {

      }
    );
  }

  loadProdukList2(){
    for(let i=0;i<this.produkList.length;i++){
      this.http.get("http://localhost:3000/api/produk/detail/"+this.produkList[i].id)
      .subscribe(
        result => {
          this.produkList2.push(result.json());
          console.log(this.produkList2);
        },
        error => {

        }
      );
    }
  }

  // DeleteProduk(id){
  //   this.http.delete('http://localhost:3000/api/produk/cartlist/'+id)
  //   .subscribe(res => {
  //       this.router.navigate(['/cart']);
  //     }, (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // DeleteProduk(id_p){
  //   console.log(id_p);
  //   let obj = {id: id_p};
  //   let header = new Headers();
  //   let options = new RequestOptions({headers : header});

  //   this.http.delete("http://localhost:3000/api/produk/cartlist/", options)
  //   .subscribe(
  //     result => {
  //       this.loadProdukList();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  //   this.produkList2=[];
  // }

  CheckOut(){
    let header = new Headers();
    let options = new RequestOptions({headers : header});

    this.http.delete("http://localhost:3000/api/produk/cartlist/", options)
    .subscribe(
      result => {
        this.route.navigate(['/cart']);
      },
      error => {
        console.log(error);
      }
    )
    this.produkList2=[];
  }

}
