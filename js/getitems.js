(async () => {

itemContainer = document.getElementById("itemDisplay")

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
function createItemContainer(itemData, container) {
    // Create a Bootstrap container
    container.classList.add('container', 'my-4');

    // Create a Bootstrap card
    var card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('id');

    card.setAttribute("id", itemData._id);

    // Create card body
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center');

    // Populate card body with item information
    var itemName = document.createElement('h3');
    itemName.classList.add('card-title', 'text-center', 'border-bottom');
    itemName.textContent = itemData.Item;

    var itemPrice = document.createElement('p');
    itemPrice.classList.add('card-text', 'm-0', 'p-0');
    itemPrice.textContent = 'Price: $' + itemData.Price;

    var itemStock = document.createElement('p');
    itemStock.classList.add('card-text', 'm-0', 'p-0');
    itemStock.textContent = 'In Stock: ' + itemData.In_Stock + '/' + itemData.Total_Stock;

    var addButton = document.createElement("button");
    addButton.classList.add("btn", "btn-primary", "mx-auto");
    addButton.textContent = "Add Item";

    // Append elements to the card body
    cardBody.appendChild(itemName);
    cardBody.appendChild(itemPrice);
    cardBody.appendChild(itemStock);
    cardBody.appendChild(addButton);

    // Append card body to the card
    card.appendChild(cardBody);

    // Append card to the container
    container.appendChild(card);

    // Append container to the body
    document.body.appendChild(container);
}

function populateItems(list, container) {

    // Clear existing content in the container
    container.innerHTML = '';

    // Calculate the number of rows needed
    const numRows = Math.ceil(list.length / 3);

    // Create rows and cells dynamically using Bootstrap grid classes
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < 3; j++) {
            const dataIndex = i * 3 + j;
            if (dataIndex < list.length) {
                const col = document.createElement('div');
                col.classList.add('col-md-4');
                createItemContainer(list[dataIndex], col);
                row.appendChild(col);
            }
        }

        container.appendChild(row);
    }
}

// Get the data and populate items
let data = await getFetch('http://localhost:5000/record');
console.log(data)
if (data !== null) 
{
    populateItems(data, itemContainer);
};

})();