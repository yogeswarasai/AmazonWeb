import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductInfo } from './productsinfo';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AmazonWeb';
 public cartItemsCount:number=0;
 public categories:string[]=[];
 public products:ProductInfo[]=[];
 public cartItems:ProductInfo[]=[];
 public isCartItemsVisible:boolean=false;

 public LoadCategories():void{
  fetch('https://fakestoreapi.com/products/categories')
  .then(response=>response.json())
  .then(data=>{
    data.unshift('all');
    this.categories=data;
  })
 }

 public LoadProducts(url:string):void{
  fetch(url)
  .then(response=>response.json())
  .then(data=>{
    this.products=data;

  })
 }

 public GetCartItemsCount():void{
this.cartItemsCount=this.cartItems.length;
 }

 ngOnInit():void{
  this.LoadCategories();
  this.LoadProducts('https://fakestoreapi.com/products');
  this.GetCartItemsCount();
 }

 ToggleCart()
 {
  this.isCartItemsVisible=(this.isCartItemsVisible==false)?true:false;
 }
  categoryChanges(categoryName:String)
{
  if(categoryName=='all')
  {
    this.LoadProducts('https://fakestoreapi.com/products');
  }
  else{
    this.LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`)
  }
}
RemoveItem(id:number)
{
  var confirmation = confirm('are you sure to delete');
  if(confirmation==true)
  {
    this.cartItems.splice(id,1);
    this.GetCartItemsCount();
  }
}
AddToCart(id:number)
{
  fetch('https://fakestoreapi.com/products/'+id)
  .then(res=>res.json())
  .then(data=>{
    this.cartItems.push(data);
    this.GetCartItemsCount();
  })
}
}
