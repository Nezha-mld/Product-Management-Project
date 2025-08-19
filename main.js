let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood  ='create';
let tmp;
let searchMood = "title";
//get total
    function getToal(){
    if (price.value != ''){
        let result =(+price.value +  +taxes.value +  +ads.value)-  +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }else {
        total.innerHTML='';
        total.style.background='#977a43'; }}
//create product
//problem of deleting in refreche
       let dataPro;
        if (localStorage.product!=null){
       dataPro=JSON.parse(localStorage.product)
               }else{
      dataPro=[];}

      submit.onclick=function(){
      let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
//count
    if (title.value != '' 
        && price.value!=''
         && category.value!=''
        && newPro.count<100){
        if(mood=='create'){
    if (newPro.count > 1){
        for(let i=0;i<newPro.count;i++){
             dataPro.push(newPro);   //ici on fait la creation(push)
               } 
         } 
       else{
            dataPro.push(newPro); }}else {
                dataPro[tmp]=newPro;
                mood='create';
                submit.innerHTML='create';
                count.style.display='block';
            }
            clearData()
    }
    
    
//save localstorage
                localStorage.setItem('product',JSON.stringify(dataPro));
                        
                        showData()
    
                }
//clear inputs
                       function clearData(){
                         title.value='';
                         price.value='';
                         taxes.value='';
                         ads.value='';
                         discount.value='';
                         total.innerHTML='';
                         count.value='';
                         category.value='';
                }
//read 
                 function showData(){
                    getToal();
                  let table ='';
                  for(let i=0;i< dataPro.length;i++){
                  table +=`
                <tr>
                  <td>${i+1}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].category}</td>
                  <td>${dataPro[i].total}</td>
                 
                  <td> <button onclick="updateData(${i})" id="update">update</button></td>
                 <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

                </tr>`;}
                 document.getElementById("tbody").innerHTML = table;
                 let btnDelete=document.getElementById('deleteAll');
                 if(dataPro.length>0){
                    btnDelete.innerHTML=`<button onclick="deleteAll()">delete All (${dataPro.length}) </button>`}
                    else { btnDelete.innerHTML='';

                }   }               showData()
 //delete
                function deleteData(i){
                dataPro.splice(i,1);
                 localStorage.product=JSON.stringify(dataPro);
                                 showData() }
                function deleteAll(){
                localStorage.clear();
                dataPro.splice(0);
                   showData()  ;  
                    }
//update
                function updateData(i){
                      title.value=dataPro[i].title;
                      price.value = dataPro[i].price;
                      taxes.value = dataPro[i].taxes;
                      ads.value = dataPro[i].ads;
                      discount.value = dataPro[i].discount;
                      category.value = dataPro[i].category;  
                       getToal();
                       count.style.display = "none";
                       submit.innerHTML = "Update"; 
                       mood='update';
                       tmp=i;
                       scroll({
                        top:0,
                        behavior:'smooth'
                       })       
                    }
//search
              function getsearchmood(id){
                let search=document.getElementById('search');
                        if(id=='searchtitle'){
                            searchMood='title';
                            //search.placeholder='search by title';
                        }else{
                            searchMood='category';
                             //search.placeholder='search by category';
                             }
                             search.placeholder='search by ' +searchMood;
                               search.focus();
                               search.value="";
                               showData();
                    }
                    function searchdata(value){
                        let table= '';
                        for(let i=0;i<dataPro.length;i++){
                        if (searchMood=='title'){
                            
                                if(dataPro[i].title.includes(value.toLowerCase())){
                                    table +=`
                <tr>
                  <td>${i}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].category}</td>
                  <td>${dataPro[i].total}</td>
                
                  <td> <button onclick="updateData(${i})" id="update">update</button></td>
                 <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
                            }
                   

                        }else{
                            
                                if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                                    table +=`
                <tr>
                  <td>${i}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].category}</td>
                  <td>${dataPro[i].total}</td>
                  
                  <td> <button onclick="updateData(${i})" id="update">update</button></td>
                 <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
                            }

                        }}
                               document.getElementById("tbody").innerHTML = table;
                    }   
//clean data   


let toggleBtn = document.getElementById('toggleTheme');
toggleBtn.onclick = function(){
    document.body.classList.toggle("light-mode");

    // save mode in localStorage
    if(document.body.classList.contains("light-mode")){
        localStorage.setItem("theme","light");
    }else{
        localStorage.setItem("theme","dark");
    }
}

// keep theme after refresh
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
}









let scrollBtn = document.getElementById("scrollTopBtn");

// إظهار الزر عند النزول 200px
window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.opacity = "1";
    scrollBtn.style.pointerEvents = "auto";
  } else {
    scrollBtn.style.opacity = "0";
    scrollBtn.style.pointerEvents = "none";
  }
};

// عند الضغط على الزر، يرجع المستخدم لفوق smoothly
scrollBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};



