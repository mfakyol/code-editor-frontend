

### yapılacaklar
#### head kısmı için meta, link ve script alanları eklenecek ve kullanıcı ayarlardan istediği script meta, link ve script i ekleyebilecek.(state olarak arrayde tutulacak her bir )


### 23 ocak
#### kod editörleri eklendi .
#### editörler için onChange eventleri yazıldı.
#### html,css,js dilleri için destek eklendi.
#### kod çıktısı eklendi.

### 24 ocak
#### editörlerin scrollbarları özelleştirildi.
#### kod editörleri için daraltma ve genişletme eklendi.
#### kod editörleri ve çıktı arasına eklenecek bir element ile resize işlemi yapıldı.
#### resize dan kaynaklı css hataları düzeltildi.

### 25 ocak 
#### pug desteği eklendi(browser-side compile)(pug ın dökümantasyonlarında browser-side da kullanılmaması gerektiği söyleniyor. Bu yüzden server-side a taşınacak şimdilik demo için tutuluyor.)
#### css fix.
#### ayalar menusü eklendi.
#### template ayarı için için pug ve html sçenekleri eklendi.



### html

<div class="icon-one">
  <div class="hamburger hamburger-one"></div>
</div>

<div class="icon-two">
  <div class="hamburger hamburger-two"></div>
</div>

<div class="icon-three">
  <div class="hamburger hamburger-three"></div>
</div>

### css

/* General */
body {
  margin: 0;
  padding: 0;
  width:100px;
  background: #7EDC67;
}

.hamburger {
  top:50%;
  left:10%;
  width: 50px;
  height: 6px;
  background: #FCFCFC;
  position: absolute;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
  transition: 0.5s;
}

.hamburger:before {
  top: -16px;
}

.hamburger:after {
  top: 16px;
}



/* Icon 1 */
.icon-one {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.hamburger-one:before,
.hamburger-one:after {
  content: '';
  position:absolute;
  width: 50px;
  height: 6px;
  background:#FCFCFC;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition:0.5s;
}

.icon-one.active-one .hamburger-one {
  background:rgba(0,0,0,0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0);
}

.icon-one.active-one .hamburger-one:before {
  top: 0;
  transform:rotate(45deg);
}

.icon-one.active-one .hamburger-one:after {
  top: 0;
  transform:rotate(135deg);
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}


/* Icon 2 */
.icon-two {
  position: absolute;
  top: 10%;
  left: 40%;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.hamburger-two:before,
.hamburger-two:after {
  content: '';
  position:absolute;
  width: 50px;
  height: 6px;
  background:#FCFCFC;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition:0.5s;
}

.icon-two.active-two .hamburger-two {
  transform:rotate(180deg);
  box-shadow: 0 -2px 5px rgba(0, 0, 0, .2);
}

.icon-two.active-two .hamburger-two:before {
  top: -9px;
  right:-5px;
  width:30px;
  transform:rotate(-135deg);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0);
}

.icon-two.active-two .hamburger-two:after {
  top: 9px;
  right:-5px;
  width:30px;
  transform:rotate(-45deg);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0);
}


/* Icon 3 */
.icon-three {
  position: absolute;
  top: 10%;
  left: 70%;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.hamburger-three:before,
.hamburger-three:after {
  content: '';
  position:absolute;
  width: 50px;
  height: 6px;
  background:#FCFCFC;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition:0.5s;
}

.icon-three.active-three .hamburger-three {
  background:rgba(0,0,0,0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0);
}

.icon-three.active-three .hamburger-three:before {
  top: 0;
  transform:rotate(135deg);
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}

.icon-three.active-three .hamburger-three:after {
  top: 0;
  transform:rotate(225deg);
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}


### javascript

const iconOne = document.querySelector('.icon-one');
const iconTwo = document.querySelector('.icon-two');
const iconThree = document.querySelector('.icon-three');

iconOne.addEventListener('click',() => {
 iconOne.classList.toggle('active-one')
});

iconTwo.addEventListener('click',() => {
 iconTwo.classList.toggle('active-two')
});

iconThree.addEventListener('click',() => {
 iconThree.classList.toggle('active-three')
});


### pug
div(class="icon-one")
   div(class="hamburger hamburger-one")
div(class="icon-two")
   div(class="hamburger hamburger-two")
div(class="icon-three")
   div(class="hamburger hamburger-three")
