const fajr = document.getElementById("fajer");
const dhuhr = document.getElementById("dhuhr");
const asr = document.getElementById("asr");
const maghrib = document.getElementById("maghrib");
const isha = document.getElementById("isha");

const cityName = document.getElementById("city-name");
const toDay = document.getElementById("today");
const dateSun = document.getElementById("date-sun");
const dateMoon = document.getElementById("date-moon");

const cityNameB = document.getElementById("city-name-b");
const fajerTime = document.getElementById("fajer-time");
const ishaTime = document.getElementById("isha-time");

const selectBox = document.getElementById("city-select");
const searchBtn = document.getElementById("search-btn");





const weekDays = [
      { ar: "الأحد", en: "Sunday" },
      { ar: "الاثنين", en: "Monday" },
      { ar: "الثلاثاء", en: "Tuesday" },
      { ar: "الأربعاء", en: "Wednesday" },
      { ar: "الخميس", en: "Thursday" },
      { ar: "الجمعة", en: "Friday" },
      { ar: "السبت", en: "Saturday" },
    ];


// ملء القائمة بالمحافظات من ملف المحافظات
egyptGovernorates.forEach(gov => {
  const opt = document.createElement("option");
  opt.value = gov.en;
  opt.textContent = gov.ar;
  selectBox.appendChild(opt);
});


searchBtn.addEventListener("click" , handleSearch);


function handleSearch(){
    const userInput = selectBox.value;
    if(!userInput) return

      const cityObj = egyptGovernorates.find(
      (gov) => gov.ar === userInput || gov.en.toLowerCase() === userInput.toLowerCase()
    );
  const city = cityObj ? cityObj.en : userInput;

  fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`)
  .then(response => response.json())
  .then(data =>{
    fajr.textContent = data.data.timings.Fajr
    dhuhr.textContent = data.data.timings.Dhuhr
    asr.textContent = data.data.timings.Asr
    maghrib.textContent = data.data.timings.Maghrib
    isha.textContent = data.data.timings.Isha

    cityName.textContent = selectBox.options[selectBox.selectedIndex].text;
    cityNameB.textContent = selectBox.options[selectBox.selectedIndex].text;

    fajerTime.textContent = data.data.timings.Fajr;
    ishaTime.textContent = data.data.timings.Isha;

    dateSun.textContent = data.data.date.gregorian.date;
    dateMoon.textContent = data.data.date.hijri.date;

    

    const weekDay = data.data.date.gregorian.weekday.en ; 

    const day = weekDays.find(day => day.en === weekDay);
    toDay.textContent = day ? day.ar : weekDay;


    
  })
  .catch(error => {
      alert("حدث خطأ أثناء جلب البيانات");
      console.error(error);
    });


}


//عرض الاسماعيلية كمدينة افتراضية

document.addEventListener("DOMContentLoaded", () => {
  const defaultCity = "Ismailia";

  selectBox.value = defaultCity;

  fetch(`https://api.aladhan.com/v1/timingsByCity?city=${defaultCity}&country=Egypt&method=5`)
    .then(response => response.json())
    .then(data => {
      // عرض البيانات
      fajr.textContent = data.data.timings.Fajr;
      dhuhr.textContent = data.data.timings.Dhuhr;
      asr.textContent = data.data.timings.Asr;
      maghrib.textContent = data.data.timings.Maghrib;
      isha.textContent = data.data.timings.Isha;

      // عرض اسم المدينة
      cityName.textContent = "الإسماعيلية";

      toDay.textContent = weekDays.find(day => day.en === data.data.date.gregorian.weekday.en)?.ar || "";
      dateSun.textContent = data.data.date.gregorian.date;
      dateMoon.textContent = data.data.date.hijri.date;

      
      fajerTime.textContent = data.data.timings.Fajr;
      ishaTime.textContent = data.data.timings.Isha;

    })
    .catch(error => {
      console.error("حدث خطأ أثناء جلب البيانات:", error);
      alert("تعذر تحميل مواقيت الصلاة الافتراضية.");
    });
});

