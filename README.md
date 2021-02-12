
##Çalıştırmak için
ilnk önce arka uç kısmının(https://github.com/mfakyol/code-editor-backend) çalıştırılması ardından projenin ana dizininde 
# -> npm install
# -> npm start


## sitenin demosu https://code-editor-project.netlify.app/


### yapılacaklar
#### head kısmı için meta, link ve script alanları eklenecek ve kullanıcı ayarlardan istediği script meta, link ve script i ekleyebilecek.(state olarak arrayde tutulacak her bir )

### 22 ocak 

#### Projenin tasarımı oluşturuldu.
#### Frontend kısmında kullanılacak teknolojiler belirlendi.
#### Kodların kullanılacağı editör kütüphanesi seçildi. Seçilen kütüphane codemirror.
#### Tasarımı gerçekleştirmek için küçük bir demoya başlandı. 

### 23 ocak
#### Demonun iskeleti kuruldu.
#### Kod editörleri eklendi .
#### Editörler için onChange eventleri yazıldı.
#### Html,css,js dilleri için destek eklendi.
#### Kod çıktısı eklendi.

### 24 ocak
#### Editörlerin scrollbarları özelleştirildi.
#### Kod editörleri için daraltma ve genişletme eklendi.
#### Kod editörleri ve çıktı arasına eklenecek bir element ile resize işlemi gerçekleştirilecek element ve resize işlemi gerçekleştirildi.
#### resize olayından kaynaklı css hataları düzeltildi.

### 25 ocak 
#### Pug desteği eklendi(browser-side compile)(pug ın dökümantasyonlarında browser-side da kullanılmaması gerektiği söyleniyor. Bu yüzden server-side a taşınacak şimdilik demo için tutuluyor.).
#### Css bug fix.
#### Ayalar menusü eklendi.
#### Ayarların Template modlarına pug ve html sçenekleri eklendi.

### 26 ocak

#### Projenin backend kısmı oluşturuldu.
#### Api ara yüzü oluşturudu.
#### Frontend kısmında api isteklerin hangi durumlarda hangi apilere istek gideceği belirtilerek istekler otomatikleştirildi.
#### Pug derleyicisi frontend kısmından backend kısmına alındı.


### 27 ocak 

#### Sass derleyicisi eklendi.
#### Frontend  de style için sass seçeneği getirildi.
####  Babel eklendi.
#### Frontend de javascript için babel tercihi getirildi.


### 28 ocak

### Frontend kısmında, link, script, meta, v.b. tag lerin çıktıya eklenebilmesi, silinebilmesi ve düzenlenebilmesi için ayarlara bir alan eklendi.  
### Css bug fix.


### 29 ocak

##### Projeye TypeScript desteği eklenebilmesi için babel 7 ye ihtiyaç duyuldu. Ancak backend kısmı babel 6 nın üzerine inşa edildiği için ve babel 6 ve 7 bir arada çalışmadığı ndan dolayı backend sıfırdan babel 7 nin üzerine kuruldu.
##### Backend de yapılan değişikliklerin bir soruna sebep olup olmadığının anlaşılması için backend test edildi..


### 30 ocak

#### TypeScript desteği eklendi.
#### CoffeeScript desteği eklendi.


### 31 ocak

#### Less deteği eklendi.
#### Markdown desteği eklendi.
