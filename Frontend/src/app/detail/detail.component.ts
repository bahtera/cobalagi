import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  produk = {};

  idcart = {};


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getProdukDetail(this.route.snapshot.params['id']);
  }

  getProdukDetail(id) {
    this.http.get('http://localhost:3000/api/produk/detail/'+id).subscribe(data => {
      this.produk = data;
      this.idcart = {id};
      console.log(data);
      console.log(this.idcart)
    });
  }

  saveCart() {
    this.http.post('http://localhost:3000/api/produk/cartlist', this.idcart)
      .subscribe(res => {
          
          this.router.navigate(['/cart']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
