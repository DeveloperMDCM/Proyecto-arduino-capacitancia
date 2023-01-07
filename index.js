var   Voltaje = document.getElementById("Voltaje")
var Capacitancia  =document.getElementById("Capacitancia")
var Resistencia = document.getElementById("Resistencia")
var Constante  =document.getElementById("Constante")
var Joules = document.getElementById("Joules")


 function getData() {
getData2();

  constante_tiempo = Capacitancia.value * Resistencia.value * 0.000001;
  Constante.value =  (constante_tiempo).toFixed(6);
  Joules_calculo = ((Voltaje.value * Voltaje.value) * Capacitancia.value) / 2  * 0.000001;
  Joules.value = (Joules_calculo).toFixed(7);
  // Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#grafica");
// Las etiquetas son las que van en el eje X. 

var etiquetas = [];
carga = [];
descarga = [];
for (var i = 0; i < 7; i++) {

  if (i == 0) {
    etiquetas.push("0");
    carga.push(0);
    descarga.push(100);
  } else {
    etiquetas.push( i + " RC");
  }

}

for (var i = 0; i < 7; i++) {
  carga.push(63.2);
  carga.push(86.5);
  carga.push(95);
  carga.push(98.2);
  carga.push(99.3);
  carga.push(99.8);
 //Descarga lo contrario de carga 
  descarga.push(36.8);
  descarga.push(13.5);
  descarga.push(4.98);
  descarga.push(1.83);
  descarga.push(0.674);
  descarga.push(0.248);
}


  // Podemos tener varios conjuntos de datos
const datos_carga = {

  
  label: "Capacitancia Alta",
  data: carga, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
  backgroundColor: 'rgba(0, 255, 4, 0.2)', // Color de fondo
  borderColor: 'rgba(0, 444, 0, 1)', // Color del borde
  borderWidth: 1,// Ancho del borde
  fill: false,
  pointBackgroundColor: "#000",
  pointBorderColor: "#000",
};
const datos_descarga = {
  label: "Capacitancia Baja",
  data: descarga, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
  backgroundColor: 'rgba(255, 0, 0, 0.2)',// Color de fondo
  borderColor: 'red',// Color del borde
  borderWidth: 1,// Ancho del borde
  fill: false,
  pointBackgroundColor: "#00f",
  pointBorderColor: "#000",
  bezierCurve: true,
};

    new Chart($grafica, {
        type: 'line',
        data: {
            labels: etiquetas,    
            datasets: [ datos_carga, datos_descarga]
            
        },
        options: {
            elements: {
                line: {
                    tension: 0.2 // disables bezier curves
                }   
            },
         
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: 'black',
                }
            },
            title: {
                display: true,
                text: 'GRAFICA DE TODAS LAS MEDICIONES',
               
            }
        }
    });
  
    setTimeout(function () {
      getData();
    }, 1000);
 
}
const CargarDatos = async () => {
  try {
    //json de datos    
    const url = "https://api.thingspeak.com/channels/1922315/feeds.json?api_key=OTXUE2XWWW585J7S&results=1";
    const res = await fetch(url);
    const data = await res.json();
    // Recorre el json y lo guarda en una variable
    data.feeds.forEach((element) => {
      var f2 = Math.round(element.field2 * 100) / 100;
              document.querySelector(".container_chart").innerHTML = '</div></div><div class="box"><div class="chart"  id="dato2"  data-percent="'+f2+'">'+
              '<h1 id="field2" > <img src="img/capacitancia.png" >' + "<br>" + f2 + " C"
              +'</div><h2>CAPACITANCIA</h2></div>';       
     
              
              
    
    });
    
  
  } catch (err) {
    console.error(err);
   
  }
};
CargarDatos();

setTimeout(function () {
  CargarDatos();
}, 5000);
async function getData2() { 
  const response = await fetch('https://api.thingspeak.com/channels/1922315/feeds.json?api_key=OTXUE2XWWW585J7S&results=30');
  const data = await response.json();
  length = data.feeds.length;
labels = [];
values2 = [];

for (i = 0; i < length; i++) {
  labels.push(data.feeds[i].field2);

  values2.push(data.feeds[i].field2);
}

new Chart(document.getElementById("bar-chart"), {
  type: 'line',
  data: {
      labels: labels,
      datasets: [               
          {               
              type: 'line',
              label: "Capacitancia",
              fill: false,
              backgroundColor:"#d80913", 
              borderColor: "#d80913",
              data: values2,
              pointBackgroundColor: "#060f14",
              scaleFontColor: "#050404"                   
          }
         
      ]
  },
  options: {
      elements: {
          line: {
              tension: 0.4 // disables bezier curves
          }   
      },
      legend: {
          labels: {
              // This more specific font property overrides the global property
              fontColor: 'black',
          }
      },
      title: {
          display: true,
          text: 'GRAFICA DE LA CAPACITANCIA',
         
      }
  }
});


}