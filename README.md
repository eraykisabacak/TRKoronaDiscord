# TRKoronaDiscord
Sağlık Bakanlığından Alınan Günlük Verilerle Discord Botu

Node.js kullanarak bir discord botu geliştirmeye çalıştım. 

Bilgileri sağlık bakanlığı API'den aldım. Bu bot !korona yazıldığında günlük raporu bize geri döndürmektedir.

![](https://eraykisabacak.com/wp-content/uploads/2020/09/Covid-19-Discord-G%C3%BCnl%C3%BCk-Bot-Eray-K%C4%B1sabacak.jpg)

Eğer detaylı olarak toplam vaka sayısı, toplam test sayısı gibi bilgilerin ve günlük tablonun gelmesi için !koronadetayli yazılarak bize detaylı olarak geri dönüş vermektedir.

![](https://eraykisabacak.com/wp-content/uploads/2020/09/Covid-19-Discord-G%C3%BCnl%C3%BCk-Bot-Detayl%C4%B1-Eray-K%C4%B1sabacak.jpg)

Proje de request paketini kullanarak Sağlık Bakanlığına bir istek atılıyor ve gelen istek JSON data dönüştürüyor. Sonra en son gelen bilgiler ile bot cevap veriyor.

Discord botu için discord tarafından oluşturulmuş bir paket discord.js paketini kullandım.

Ve bir de Cron job kullanılmıştır. Cron API saniyelik olarak istek atmaktadır ve eski veri ile cron tarafından atılmış istekler karşılaştırılarak eğer birbirlerinden farklı veriler ise bot son dakika olarak mesaj atmakta ve yeni veriler detaylı bir şekilde gösterilmedir. ( TEST EDİLMEMİŞTİR )

Eğer sizde bu botu kullanmak isterseniz yapacağınız tek şey en altta bulunan token yerine sunucu tokeninizi girmeniz yeterlidir. Botun devamlı açık kalması içinde Heroku kullandım.

#[Blog](https://eraykisabacak.com/node-js-ile-discord-covid-19-botu-gelistirme/)
