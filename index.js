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
          break;
        case 404:
          console.log('Connection Error 404 !');
          break;
      }
    }
  );
});

function cronStart(msg) {
  var job = new CronJob(
    '* * * * * *',
    function () {
      request.get(
        'https://koronacors.herokuapp.com/?https://covid19.saglik.gov.tr/covid19api?getir=liste',
        function (error, response, body) {
          switch (response.statusCode) {
            case 200:
              let data = JSON.parse(body);
              cronData = data[0]['tarih'];
              if (cronData != oldData) {
                console.log(
                  'Yeni Değer geldi Cron : ' + cronData + ' Old : ' + oldData
                );
                msg.channel.send(
                  '!!! Son Dakika Yeni Korona Virus Tablosu !!!'
                );
                let data = JSON.parse(body);
                msg.channel.send(`Tarih : ${data[0]['tarih']}
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
              }
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
      cronStart(msg);
      msg.reply('Cron Starting');
    }
  }
  if (msg.content === 'Hi') {
    msg.reply('Hello!');
    if (!isCron) {
      cronStart(msg);
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
      cronStart(msg);
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
      cronStart(msg);
      msg.reply('Cron Starting');
    }
  }
});

client.login(process.env.token);
