const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const evSahibi = fifaData.filter((mac) => {
  return mac["Year"] === 2014 && mac["Stage"] === "Final";
});
console.log(evSahibi[0]["Home Team Name"]);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(evSahibi[0]["Away Team Name"]);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(evSahibi[0]["Home Team Goals"]);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(evSahibi[0]["Away Team Goals"]);
//(e) 2014 Dünya kupası finali kazananı*/
if (evSahibi[0]["Home Team Name"] > evSahibi[0]["Away Team Goals"]) {
  console.log(evSahibi[0]["Home Team Name"]);
} else if (evSahibi[0]["Home Team Name"] < evSahibi[0]["Away Team Goals"]) {
  console.log(evSahibi[0]["Away Team Name"]);
} else {
  const kazananTakim = evSahibi[0]["Win conditions"].split(" win "); //split ile berabere kalan takımlarda uzatmalarda kim kazandı bulmak için metni win den önce ve sonra olmak üzere 2 ye ayırdık. yeni bir array'e atadığı için console.log yaparken [0] kullandık.
  console.log(kazananTakim[0]);
  //kazananTakim diye yeni değişken atamadan console.log(evSahibi[0]["Win conditions"].split(" win ")[0])şeklinde de yazabiliriz. sonuçta parantez içindeki de bir array.
}
/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(gelenDizi) {
  const final = gelenDizi.filter((sonuc) => sonuc["Stage"] === "Final");
  return final;
}
console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(gelenDizi, callbackFunction) {
  const final = callbackFunction(gelenDizi); // yukarıda oluşturuduğumuz final array ini çağırdık. callback fonksiyonunu gelenDizi datası için kullanacağız.
  const finalYili = final.map((mac) => mac["Year"]);
  return finalYili;
}
console.log(Yillar(fifaData, Finaller));
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(gelenDizi, callbackFunction) {
  const final = callbackFunction(gelenDizi);
  const kazananlarList = [];
  for (let i = 0; i < final.length; i++) {
    if (final[i]["Home Team Goals"] > final[i]["Away Team Goals"]) {
      kazananlarList.push(final[i]["Home Team Name"]);
    } else if (final[i]["Home Team Goals"] < final[i]["Away Team Goals"]) {
      kazananlarList.push(final[i]["Away Team Name"]);
    } else {
      let winArr = final[i]["Win conditions"].split(" win ");
      kazananlarList.push(winArr[0]);
    }
  }
  return kazananlarList;
}
console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(
  gelenDizi,
  callbackFinaller,
  callbackYillar,
  callbackKazananlar
) {
  // let kazananlarListesi = callbackFinaller(gelenDizi).map((mac, i) => {
  //   return (
  //     callbackYillar(gelenDizi, callbackFinaller)[i] +
  //     " yılında, " +
  //     callbackKazananlar(gelenDizi, callbackFinaller)[i] +
  //     " dünya kupasını kazandı!"
  //   );
  // });
  // return kazananlarListesi;
  let final = callbackFinaller(gelenDizi);
  let kazananlarList = callbackKazananlar(gelenDizi, callbackFinaller);
  let finalYili = callbackYillar(gelenDizi, callbackFinaller);
  let yillaraGöreKazan = final.map((mac, i) => {
    return (
      finalYili[i] +
      " yılında, " +
      kazananlarList[i] +
      " dünya kupasını kazandı!"
    );
  });
  return yillaraGöreKazan;
}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));
//console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finaller) {
  const ortalamaGol = finaller.reduce(
    (total, match) =>
      total + match["Home Team Goals"] + match["Away Team Goals"],
    0
  );
  return (ortalamaGol / finaller.length).toFixed(2); //toFixed noktadan sonra 2 basamak alıyor.
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)));
/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
