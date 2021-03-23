        const angle = 6;
         let horas = document.getElementById("Horas");
         let minutos = document.getElementById("Minutos");
         let segundos = document.getElementById("Segundos");
         setInterval(function(){ 
             let date = new Date();
             let hour = date.getHours() * 30;
             let minute = date.getMinutes() * angle;
             let second = date.getSeconds() * angle;
             horas.style.transform = `rotate(${hour}deg)`;
             minutos.style.transform =`rotate(${minute}deg)`; 
             segundos.style.transform =`rotate(${second}deg)`; 
            }, 1000);

            console.log(Date.getHours()) 
