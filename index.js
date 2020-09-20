const Discord = require('discord.js');
const client = new Discord.Client();

const request = require('request');

var CronJob = require('cron').CronJob;

let oldData = null;
let cronData = null;

let isCron = false;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  request.get(
    'https://koronacors.herokuapp.com/?https://covid19.saglik.gov.tr/covid19api?getir=liste',
    function (error, response, body) {
      switch (response.statusCode) {
        case 200:
          let data = JSON.parse(body);
          oldData = data[0]['tarih'];
          //console.log('!!!!!!!!!!!!!!!1First Data Old Data : ' + oldData);
          break;
        case 404:
          console.log('Connection Error 404 !');
          break;
      }
    }
  );
});

/// Eğer cron data ile first data farklı ise mesaj at

function cronStart() {
  var job = new CronJob(
    '* * * * * *',
    function () {
      //console.log('You will see this message every second');
      request.get(
        'https://koronacors.herokuapp.com/?https://covid19.saglik.gov.tr/covid19api?getir=liste',
        function (error, response, body) {
          switch (response.statusCode) {
            case 200:
              let data = JSON.parse(body);
              // console.log('Cron Data');
              cronData = data[0]['tarih'];
              if (cronData != oldData) {
                console.log(
                  'Yeni Değer geldi Cron : ' + cronData + ' Old : ' + oldData
                );
                msg.channel.send(
                  '!!! Son Dakika Yeni Korona Virus Tablosu !!!'
                );
                let data = JSON.parse(body);
                //console.log(data[0]);
                msg.channel(`Tarih : ${data[0]['tarih']}
            Günlük Test : ${data[0]['gunluk_test']}
            Günluk Vaka : ${data[0]['gunluk_vaka']}
            Günlük Vefat : ${data[0]['gunluk_vefat']}
            Günlük İyileşen : ${data[0]['gunluk_iyilesen']}
            Toplam Test : ${data[0]['toplam_test']}
            Toplam Vaka : ${data[0]['toplam_vaka']}
            Toplam Vefat : ${data[0]['toplam_vefat']}
            Toplam İyileşen : ${data[0]['toplam_iyilesen']}
            Hastalarda Zatürre Oranı : ${data[0]['hastalarda_zaturre_oran']}
            Ağır Hasta Sayısı : ${data[0]['agir_hasta_sayisi']}`);
                oldData = cronData;
              } /*else {
                  console.log('Eski Değer Mevcut');
                  msg.channel.send('Eski!');
                }*/
              break;
            case 404:
              console.log('Connection Error 404 !');
              break;
          }
        }
      );
    },
    null,
    true,
    'America/Los_Angeles'
  );
  job.start();
  isCron = true;
}

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong! ');
    if (!isCron) {
      cronStart();
      msg.reply('Cron Starting');
    }
  }
  if (msg.content === 'Hi') {
    msg.reply('Hello!');
    if (!isCron) {
      cronStart();
      msg.reply('Cron Starting');
    }
  }
  if (msg.content === '!korona') {
    request.get(
      'https://koronacors.herokuapp.com/?https://covid19.saglik.gov.tr/covid19api?getir=liste',
      function (error, response, body) {
        switch (response.statusCode) {
          case 200:
            let data = JSON.parse(body);
            //console.log(data[0]);
            msg.reply(`Tarih : ${data[0]['tarih']}
            Günlük Test : ${data[0]['gunluk_test']}
            Günluk Vaka : ${data[0]['gunluk_vaka']}
            Günlük Vefat : ${data[0]['gunluk_vefat']}
            Günlük İyileşen : ${data[0]['gunluk_iyilesen']}`);
            break;
          case 404:
            msg.reply('Connection Error 404 !');
            break;
        }
      }
    );
    if (!isCron) {
      cronStart();
      msg.reply('Cron Starting');
    }
  }
  if (msg.content === '!koronadetayli') {
    request.get(
      'https://koronacors.herokuapp.com/?https://covid19.saglik.gov.tr/covid19api?getir=liste',
      function (error, response, body) {
        switch (response.statusCode) {
          case 200:
            let data = JSON.parse(body);
            //console.log(data[0]);
            msg.reply(`Tarih : ${data[0]['tarih']}
            Günlük Test : ${data[0]['gunluk_test']}
            Günluk Vaka : ${data[0]['gunluk_vaka']}
            Günlük Vefat : ${data[0]['gunluk_vefat']}
            Günlük İyileşen : ${data[0]['gunluk_iyilesen']}
            Toplam Test : ${data[0]['toplam_test']}
            Toplam Vaka : ${data[0]['toplam_vaka']}
            Toplam Vefat : ${data[0]['toplam_vefat']}
            Toplam İyileşen : ${data[0]['toplam_iyilesen']}
            Hastalarda Zatürre Oranı : ${data[0]['hastalarda_zaturre_oran']}
            Ağır Hasta Sayısı : ${data[0]['agir_hasta_sayisi']}`);
            break;
          case 404:
            msg.reply('Connection Error 404 !');
            break;
        }
      }
    );
    if (!isCron) {
      cronStart();
      msg.reply('Cron Starting');
    }
  }
});

client.login(process.env.token);
