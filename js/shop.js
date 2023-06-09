// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional

var products = [
    {
         id: 1,
         name: 'cooking oil',
         price: 10.5,
         type: 'grocery',
         offer: {
             number: 3,
             percent: 20
         }
     },
     {
         id: 2,
         name: 'Pasta',
         price: 6.25,
         type: 'grocery'
     },
     {
         id: 3,
         name: 'Instant cupcake mixture',
         price: 5,
         type: 'grocery',
         offer: {
             number: 10,
             percent: 30
         }
     },
     {
         id: 4,
         name: 'All-in-one',
         price: 260,
         type: 'beauty'
     },
     {
         id: 5,
         name: 'Zero Make-up Kit',
         price: 20.5,
         type: 'beauty'
     },
     {
         id: 6,
         name: 'Lip Tints',
         price: 12.75,
         type: 'beauty'
     },
     {
         id: 7,
         name: 'Lawn Dress',
         price: 15,
         type: 'clothes'
     },
     {
         id: 8,
         name: 'Lawn-Chiffon Combo',
         price: 19.99,
         type: 'clothes'
     },
     {
         id: 9,
         name: 'Toddler Frock',
         price: 9.99,
         type: 'clothes'
     }
 ]
 // Array with products (objects) added directly with push(). Products in this array are repeated.
 var cartList = [];
 
 // Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
 var cart = [];
 
 var total = 0;
 
 // Exercise 1
     // 1. Loop for to the array products to get the item to add to cart
     // 2. Add found product to the cartList array
/*  function buy(id) {
     for (let i=0; i<products.length; i++) {
         if (products[i].id === id) {
             cartList.push(products[i]);
             i=products.length;
         }
         document.getElementById("count_product").innerHTML=cartList.length;
     }
     console.table(cartList);
 } */
   
 // Exercise 2
 function cleanCart() {
     cartList.length=0;
     console.table(cartList);
 }
 
 // Exercise 3
 // Calculate total price of the cart using the "cartList" array
     function calculateTotal() {        
         for (let i=0; i<cartList.length; i++) {
             total += cartList[i].price;
         } 
         return total;
     }
 
 /*Exercise 4
  Using the "cartlist" array that contains all the items in the shopping cart, 
  generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.*/
  /* function generateCart() {
         cart=[];
         for (let i =0; i<cartList.length; i++) {
             let target = cart.find( element =>  element.id === cartList[i].id );
 
              if (target === undefined) {
                 cartList[i].quantity = 1;
                 cartList[i].subtotal = cartList[i].price * cartList[i].quantity;
                 cartList[i].subtotalWithDiscount = "not defined yet";
                 cart.push(cartList[i]); 
             
             } else {
                 cartList[i].quantity += 1;
                 cartList[i].subtotal = cartList[i].price * cartList[i].quantity;
                 cartList[i].subtotalWithDiscount = "not defined yet"; 
             } 
         }
         //testing
         console.log("Sin descuentos promocionales")
         console.table(cart);
         console.log("A continuación con descuentos promocionales");
         applyPromotionsCart(cart);
         console.table(cart);
    } */ 
 
 // Exercise 5
 // Apply promotions to each item in the array "cart"
 function applyPromotionsCart() {
     for (let i=0; i<cart.length;i++) {
         if (cart[i].id === 1 && cart[i].quantity >= 3) {
            cart[i].subtotalWithDiscount = (cart[i].price-0.5)*cart[i].quantity;
         } else if (cart[i].id === 3 && cart[i].quantity >= 10) {
             cart[i].subtotalWithDiscount = cart[i].price*cart[i].quantity*0.66666667;
         } else {
             cart[i].subtotalWithDiscount=cart[i].price*cart[i].quantity;
         }
     } // console.log para probar en la función generate cart.
 }
 
 // Exercise 6
 // Fill the shopping cart modal manipulating the shopping cart dom
 function printCart() {
     
     let printProducts ="";
     for (let i=0; i<cart.length; i++) {
         printProducts += "<tr>";
         printProducts += "<th>" + cart[i].name + "</th>";
         printProducts += "<td>" + cart[i].price.toFixed(2) + "</td>";
         printProducts += "<td>" + cart[i].quantity.toFixed(2) + "</td>";
         printProducts += "<td>" + cart[i].subtotalWithDiscount.toFixed(2) + "</td>";
         printProducts += "<td>" + "<button class='btn btn-danger' onclick='removeFromCart("+cart[i].id+")'>-</button>" + "</td>";
         printProducts += "</tr>";
     }
 
     document.getElementById("cart_list").innerHTML=printProducts;
 
     let grandTotal = 0;
     for (let i=0; i<cart.length; i++) {
         grandTotal += cart[i].subtotalWithDiscount;
     }
 
     document.getElementById("total_price").innerHTML=grandTotal.toFixed(2);
 }

 // ** Nivell II **
 
 // Exercise 8
  // Refactor previous code in order to simplify it 
     // 1. Loop for to the array products to get the item to add to cart
     // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    
function pillUpdate() {
    let totQuantity =0;
    for (let i = 0; i<cart.length; i++) {
        totQuantity += cart[i].quantity;
    }
    document.getElementById("count_product").innerHTML=totQuantity;
}

function addToCart(id) {
let choosen = products.find(element => element.id === id); // devuelve objeto
let target = cart.findIndex (element => element.id ===  choosen.id); // devuelve index

if (target === -1) {
    cart.push(choosen);
    let newItem = cart[cart.length-1];
    newItem.quantity=1;
    newItem.subtotalWithDiscount=0;
} else {
    let existingItem=cart[target]
    existingItem.quantity++;        
} 
applyPromotionsCart();    
console.table(cart);
pillUpdate();

    
}
 
// Exercise 9
function removeFromCart(id) {
    let target = cart.findIndex (element => element.id ===  id);
    if (cart[target].quantity === 1) {
        cart.splice(target,1);
        printCart();
        } else {
        cart[target].quantity--;
        applyPromotionsCart();
        printCart();
        }
    pillUpdate();
}
 
 function open_modal(){
     console.log("Open Modal");
     printCart();
 }