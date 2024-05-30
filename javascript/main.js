// data
let datatoday = new Date()
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };

        let format = datatoday.toLocaleDateString('en-EN', options);
        let result = document.getElementById('datatoday');
        result.innerHTML = `${format}`;
        