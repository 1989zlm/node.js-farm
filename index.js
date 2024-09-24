// api gelen istekleri izler ve isteklere cevap verir

//!http modülünü çağırırız yani import ederiz.
const http = require('http'); //!bunlar nodejsmodulu
const fs = require('fs');
//!bu bizim oluşturduğumuz bi modül old.için importu böyle
const replaceTemplate = require('./modules/replaceTemplate')

const url = require('url')

/*
 * createServer(), veridğimiz dinleyici fonksiyonu api'a her istek geldiğinde tetikler.
 * Bu fonksiyon 2 parametre alır
 * 1) request > istek ile alakalı verileri içeren nesne
 * 2) response > cevap göndermemizi sağlayacak nesne
  
 * Bu fonksiyon içerisinde gelen isteğe göre cevap gönderilir.
 */


/*
 * Routing
 * API'a gelen isteğin hangi endpoint (uç nokta / yol(/movies, /details gibi))'e geldiğini tespit edip ona göre farklı cevaplar gönderme işlemine routing denir
 * Routing için client'ın hangi yola ve hangi http methodu ile istek attığını bilmemiz gerekiyor.
 */



//! sunucu oluştururuz.2 parametre alır. response ve request
const server = http.createServer((request, response) => {
    //  console.log('apiye istek geldi')
    console.log('apiye istek geldi', request.url)

    //const result = url.parse('http://127.0.0.1:3434/product?id=0', true) 1
    // const result = url.parse(request.url, true) 2
    const { query, pathname } = url.parse(request.url, true) //? url parçalara ayırıdık
    //console.log(result)
    //! true nun false hali product?id=0



    let tempOverview = fs.readFileSync('./templates/overview.html', 'utf-8')
    let tempProduct = fs.readFileSync('./templates/product.html', 'utf-8')
    let tempCard = fs.readFileSync('./templates/card.html', 'utf-8')

    //json dosyasındaki verilere eriş
    let jsonData = fs.readFileSync('./dev-data/data.json', 'utf-8')

    //json verisini js formatına çevirmek için(//!data dizisindeki templatecard kadar card basacağız o yuzden yaptık bunu)
    const data = JSON.parse(jsonData)



    //gelen isteğin detaylarını consola yaz
    // console.log(request.method + 'method tipinde istek geldi')
    // console.log(request.url + 'adresine istek geldi')
    //!gelen isteğin url ine göre farklı cevap göndericez inşaallah
    // if (request.url === '/overview') {
    //     return response.end('<h1>Ana Sayfa </h1>')
    // }
    // if (request.url === '/product') {
    //     return response.end('<h1>Products</h1>')}

    //? yukarıdaki if in aynısı switch case ile yazdık
    //switch (request.url)
    switch (pathname) {
        case '/overview':
            //meyveler dizisindeki eleman sayısı kadar cart  oluştur
            const cards = data.map((el) => replaceTemplate(tempCard, el))

            //  return response.end('<h1>Anasayfa</h1>');
            //! yukarıda let ile yazdığımız tempoverviewi burada güncelledik 
            //anasayfa htmlindeki kartlar alanına kart html kodlarını ekle
            tempOverview = tempOverview.replace(
                '{%PRODUCT_CARDS%}',
                cards)
            return response.end(tempOverview);

        case '/product':
            //1)dizideki doğru elemanı bul
            const item = data.find((item) => item.id == query.id)

            //2) detay sayfasının htmlini bulunan elemanın verilerine göre güncelle

            //3) güncel html'i client'a gönder
            const output = replaceTemplate(tempProduct, item)
            //return response.end(tempProduct);
            return response.end(output);

        default:
            response.end('<h1>Tanimlanmayan yol</h1>')
    }

    //gelen isteğe gönderilcek cevap
    //  response.end('dunyadan selamun aleykum!!!')
})

// bir dinleyici oluşturup hangi porta gelen isteklerin dinleneceğini söylemeliyiz.
server.listen(3434, "127.0.0.1", () => {
    console.log('IP adresinin 3434 portuna gelen istekler dinlemeye alındı')

})