// Card html'ini ve ürün bilgilerini parametre olarak alıcak
// Card html'inin içerisnde değişken olarak tanımlanan değerlerin yerine ürünü bilgilerini ekleyecek bir fonksiyon yazalım


const replaceTemplate = (html, data) => {
    // html şablonundaki değişkenlerin yerine data nesnesindeki verileri ekliyoruz.
    let output = html.replace(/{%PRODUCTNAME%}/g, data.productName)

    // output = output.replace('{%PRICE%}', data.price) normali
    output = output.replace(/{%PRICE%}/g, data.price)
    output = output.replace(/{%QUANTITY%}/g, data.quantity)
    output = output.replace(/{%IMAGE%}/g, data.image) //!iki resim vardı diye regex şeklinde yazdık bide ileride birden fazla yerde kullanırsak diye regex uygulaması yapılabilir o yuzden hepsini regex yaptık
    output = output.replace(/{%ID%}/g, data.id)
    output = output.replace(/{%NUTRIENTS%}/g, data.nutrients)
    output = output.replace(/{%DESCRIPTION%}/g, data.description)
    output = output.replace(/{%FROM%}/g, data.from)


    if (data.organic === false) {
        output = output.replace('{%NOT_ORGANIC%}', 'not-organic')
    }

    //oluşturduğumuz yeni- güncellenmiş card htmlini döndür
    return output;
}

//replacetemplate ismindeki fonksiyonu farklı dosyalarda kullanma niyetimiz varsa export etmemiz gerekli

module.exports = replaceTemplate;


//npx nodemon index.js