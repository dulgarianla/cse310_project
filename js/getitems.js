(async () => {

async function getFetch(url) {
    try {
        // Make a GET fetch request and wait for the response
        const response = await fetch(url);

        // Check if the request was successful (status code 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }

        // Parse the JSON response and return the data
        return response.json();
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        return null; // Return null or another suitable value in case of an error
    }
}


// Get the data and populate items
let data = await getFetch('http://localhost:5000/record');
console.log(data)
// if (data !== null) 
// {

// };


})();