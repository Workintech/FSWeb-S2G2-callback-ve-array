
//import { fifaData } from "fifa.js"
//gitconst {fifaData} = require('./fifa.js');
const {fifaData} = require('./fifa.js');
//console.log(fifaData);

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
let dunyaKupasi2014 = fifaData.filter(isim => isim.Year === 2014 && isim.Stage === "Final" );
//console.log(dunyaKupasi2014);
  
let evSahibi = dunyaKupasi2014.map(dunyaKupasi => dunyaKupasi["Home Team Name"])
//console.log(evSahibi);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
let deplasmanTakimi = dunyaKupasi2014.map(dunyaKupasi => dunyaKupasi["Away Team Name"])
//console.log(deplasmanTakimi);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
let takimGolleri = dunyaKupasi2014.map(dunyaKupasi => dunyaKupasi["Home Team Goals"])
//console.log(takimGolleri);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
let depTakimGolleri = dunyaKupasi2014.map(dunyaKupasi => dunyaKupasi["Away Team Goals"])
//console.log(depTakimGolleri);
//(e) 2014 Dünya kupası finali kazananı*/
let winner = dunyaKupasi2014.map(dunyaKupasi => dunyaKupasi["Win conditions"])
//console.log(winner);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(data) {
	let finalMacları = data.filter(final => final.Stage === "Final");
    return finalMacları;
}

//console.log(Finaller(fifaData))

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(data, Finaller) {
	let finalMaclari2 = Finaller(data);
	let years = [];
	for (var i=0 ; i<finalMaclari2.length ; i++){
		years.push(finalMaclari2[i].Year)
	}
	return years;
}
//console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(fifaData, Finaller) {
	
    let finalMaclari3 = Finaller(fifaData);
	let kazananlar = [];
	for(let i=0; i<finalMaclari3.length; i++){
		if(finalMaclari3[i]["Home Team Goals"] > finalMaclari3[i]["Away Team Goals"]){
			kazananlar.push(finalMaclari3[i]["Home Team Name"]);
		}
		else if(finalMaclari3[i]["Home Team Goals"] < finalMaclari3[i]["Away Team Goals"]){
			kazananlar.push(finalMaclari3[i]["Away Team Name"]);
		}
		else { continue }
	}
	return kazananlar;
}
//console.log(Kazananlar(fifaData, Finaller));


/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {
	//let finalArr = Finaller(fifaData);
	let yearsArr = Yillar(fifaData, Finaller);
	let winnerArr = Kazananlar(fifaData, Finaller);
	let finArr = []
	let mesaj = ""
	for(let j=0;j<yearsArr.length;j++) {
		mesaj =  `${yearsArr[j]}`+ " yılında, " + `${winnerArr[j]}` +  " dünya kupasını kazandı!";
		finArr.push(mesaj);

	}
	return finArr;	
}
//console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar))

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/
function secondDecimal(sayi) {
	const roundedNum = Number(sayi.toFixed(2));
	return roundedNum;
  }

function OrtalamaGolSayisi(Finaller) {
	let finalMaclari4 = Finaller;
    let golSayisi = finalMaclari4.reduce((total, sayi) => {return total + sayi["Home Team Goals"] + sayi["Away Team Goals"];},0 );
	let ortalamaGol = secondDecimal(golSayisi / finalMaclari4.length);
	return String(ortalamaGol);
}
//console.log(OrtalamaGolSayisi(Finaller(fifaData)))


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
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
