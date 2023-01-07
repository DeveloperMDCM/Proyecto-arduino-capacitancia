

getData();
async function getData() {
  
   
        const response = await fetch('https://api.thingspeak.com/channels/1922315/feeds.json?api_key=OTXUE2XWWW585J7S&results=40');
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

 

 

  
    setTimeout(function () {
      getData();
    }, 5000);

}