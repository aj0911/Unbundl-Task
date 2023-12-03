slider = document.querySelector('.slider');
img = document.querySelector('.wrapperTask2  .container .left img');
rightDiv = document.querySelector('.wrapperTask2  .container .right');
document.querySelector('.wrapperTask2  .container .left .pagination .fa-angle-right').
addEventListener('click',()=>{
    const item = document.querySelectorAll('.item');
    slider.appendChild(item[0]);
    img.setAttribute('src',item[2].style.backgroundImage.slice(5,item[2].style.backgroundImage.length-2));
    const contents = document.querySelectorAll('.content');
    rightDiv.appendChild(contents[0]);
})
document.querySelector('.wrapperTask2  .container .left .pagination .fa-angle-left').
addEventListener('click',()=>{
    const item = document.querySelectorAll('.item');
    slider.prepend(item[item.length-1]);
    img.setAttribute('src',item[0].style.backgroundImage.slice(5,item[0].style.backgroundImage.length-2));
    const contents = document.querySelectorAll('.content');
    rightDiv.prepend(contents[contents.length-1]);
})
const prodArr = [];

allBtns = document.querySelectorAll('.addToCart')

for(let i=0;i<allBtns.length;i++){
    allBtns.item(i).addEventListener('click',(e)=>{
        let totalProducts = 0;
        for(let i=0;i<prodArr.length;i++){
            totalProducts += prodArr[i].quantity;
        }
        if(totalProducts===8){
            Swal.fire({
                title: "<i>No Enough Space</i>", 
                html: "You cannot add items more than <b>8</b> in your basket.",  
                confirmButtonText: "Yes", 
              });
        }
        else{
            let bool = true;
            for(let i=0;i<prodArr.length;i++){
                if(prodArr[i].name === e.target.parentNode.children[0].innerText){
                    prodArr[i].quantity += 1;
                    bool = false;
                }
            }
            if(bool){
                prodArr.push({
                    name:e.target.parentNode.children[0].innerText,
                    amount:e.target.parentNode.children[2].children[0].innerText,
                    image:img.getAttribute('src'),
                    title:e.target.parentNode.children[1].innerText,
                    quantity:1
                });
            }
            document.querySelector('#cartQaun').innerHTML = `${totalProducts+1}`;
        }
    })
}

document.querySelector('#cart').addEventListener('click',()=>{
    if(!document.querySelector('.wrapperTask2').classList.contains('active')){
        let htmlText = '';
        for(let i = 0;i<prodArr.length;i++){
            htmlText+=`<div class="cart-item">
                <img src="${prodArr[i].image}" alt="">
                <div class="cart-content">
                    <h3>${prodArr[i].name}</h3>
                    <p>${prodArr[i].title}</p>
                </div>
                <div class="quan">
                    <i class="fa fa-minus"></i>
                    <h3>${prodArr[i].quantity}</h3>
                    <i class="fa fa-plus"></i>
                </div>
                <h3>$${prodArr[i].quantity*Number(prodArr[i].amount.slice(1))}</h3>
            </div>`
        }
        document.querySelector('.LeftQuan').innerHTML = htmlText;
        let tprice = 0;
        prodArr.forEach((prod)=>{
            tprice+= prod.quantity*Number(prod.amount.slice(1));
        })
        document.querySelector('#subtotal').innerHTML = `$${tprice}`
        document.querySelector('#total').innerHTML = `$${tprice+10}`
    }
    document.querySelector('.wrapperTask2').classList.toggle('active');
    
    const minusBtns = document.querySelectorAll('.fa-minus')
    for(let i=0;i<minusBtns.length;i++){
        minusBtns.item(i).addEventListener('click',(e)=>{
            let totalProducts = 0;
            for(let i=0;i<prodArr.length;i++){
                totalProducts += prodArr[i].quantity;
            }
            prodArr.forEach((prod,j)=>{
                if(e.target.parentNode.parentNode.children[1].children[0].innerText===prod.name){
                    if(prodArr[j].quantity===1){
                        prodArr.splice(j,1);
                        e.target.parentNode.parentNode.remove();
                    }
                    else{
                        prodArr[j].quantity-=1;
                        e.target.parentNode.children[1].innerHTML = prodArr[j].quantity;
                        e.target.parentNode.parentNode.children[3].innerHTML = `$${prodArr[j].quantity*Number(prod.amount.slice(1))}`
                    }
                    document.querySelector('#cartQaun').innerHTML = `${totalProducts-1}`
                    let tprice = 0;
                    prodArr.forEach((prod)=>{
                        tprice+= prod.quantity*Number(prod.amount.slice(1));
                    })
                    document.querySelector('#subtotal').innerHTML = `$${tprice}`
                    document.querySelector('#total').innerHTML = `$${tprice+10}`
                }
            })
        })
    }

    const addBtns = document.querySelectorAll('.fa-plus')
    for(let i=0;i<addBtns.length;i++){
        addBtns.item(i).addEventListener('click',(e)=>{
            let totalProducts = 0;
            for(let i=0;i<prodArr.length;i++){
                totalProducts += prodArr[i].quantity;
            }
            if(totalProducts===8){
                Swal.fire({
                    title: "<i>No Enough Space</i>", 
                    html: "You cannot add items more than <b>8</b> in your basket.",  
                    confirmButtonText: "Yes", 
                  });
            }
            else{
                prodArr.forEach((prod,j)=>{
                    if(e.target.parentNode.parentNode.children[1].children[0].innerText===prod.name){
                        prodArr[j].quantity += 1;
                        e.target.parentNode.children[1].innerHTML = prodArr[j].quantity;
                        e.target.parentNode.parentNode.children[3].innerHTML = `$${prodArr[j].quantity*Number(prod.amount.slice(1))}`
                    }
                    document.querySelector('#cartQaun').innerHTML = `${totalProducts+1}`
                    let tprice = 0;
                    prodArr.forEach((prod)=>{
                        tprice+= prod.quantity*Number(prod.amount.slice(1));
                    })
                    document.querySelector('#subtotal').innerHTML = `$${tprice}`
                    document.querySelector('#total').innerHTML = `$${tprice+10}`
                })
            }
        })
    }
})





