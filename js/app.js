window.addEventListener('load', () => {
    let long;
    let lat;


    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');

    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation)
    {
        //  Sử dung hàm định vị của API về Geolocation dể lấy kinh độ và vĩ độ
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);

            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/c5d1cc68ed27452c09a48dc63fd4e27c/${lat},${long}`;
                    
            // Get Request thông tin từ đường dẫn URL (api)
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    const timezone = data.timezone;

                    // Thiết lập các p tử DOM từ API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = timezone;

                    //Tính nhiêt độ từ độ F sang độ C
                    let doC = (temperature - 32) * (5 / 9);

                    // Thiết lập icon
                    setIcon(icon, document.querySelector('.icon'));

                    // Thiết lập lại từ độ F sang đô C
                    temperatureSection.addEventListener("click", () => {
                        if( temperatureSpan.textContent === 'F' )
                        {
                            temperatureSpan.textContent ='C';
                            temperatureDegree.textContent = Math.floor(doC);
                        }
                        else
                        {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcon(icon, iconID)
    {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});