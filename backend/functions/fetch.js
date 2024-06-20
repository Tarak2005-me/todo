

document.getElementById('fetchButton').addEventListener('click', function() {
    fetch('/.netlify/functions/hello')
        .then(response => response.json())
        .then(data => {
            console.log('Response from Netlify Function:', data);
            // Handle the response data as needed
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors if any
        });
});
