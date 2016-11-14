

var express = require('express'); 
var parser = require('body-parser'); 

// Toevoegen van de code van de dal vervangt onze
// onze lokale 'datastore'. deze variable bewaart onze state. 
var dal = require("./storage.js");
var validation = require("./validate.js");

//this shit
var dalsales = require("./storage_Sales.js");
var dalattendences = require("./storage_Attendences.js");
var dalproducts = require("./storage_Products.js");
var dallocations = require("./storage_Location.js");
var app = express();
app.use(parser.json());

// Sales
app.get("/sales", function (request, response) {
    response.send(dalsales.listAllSales());
});

app.get("/sales/:id", function (request, response) {
    var sale = dalsales.findSale(request.params.id);
    if (sale) {
        response.send(sale);
    } else {
        response.status(404).send();
    }
});

app.post("/sales", function (request, response) {

    var sale = request.body;

    var errors = validation.fieldsNotEmpty(sale, "Date", "Product", "Gain", "SaleID");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existingSale = dalsales.findSale(sale.SaleID);
    if (existingSale) {
        response.status(409).send({msg: "Sale_ID is must be unique, it's already registered", link: "../sales/" + existingSale.id});
        return;
    }
    sale.id = sale.SaleID;
    dalsales.saveSale(sale);
    response.status(201).location("../sales/" + sale.id).send();
});

// Attendences
app.get("/attendences", function (request, response) {
    response.send(dalattendences.listAllAttendences());
});

app.get("/attendences/:id", function (request, response) {
    var attendence = dalattendences.findAttendence(request.params.id);
    if (attendence) {
        response.send(attendence);
    } else {
        response.status(404).send();
    }
});

app.post("/attendences", function (request, response) {

    var attendence = request.body;

    var errors = validation.fieldsNotEmpty(attendence, "Number of purchases", "Date", "Count", "Ratio");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existingAttendence = dalattendences.findAttendence(attendence.Date);
    if (existingAttendence) {
        response.status(409).send({msg: "Date must be unique, it's already registered", link: "../sales/" + existingAttendence.id});
        return;
    }
    attendence.id = attendence.Date;
    dalattendences.saveAttendence(attendence);
    response.status(201).location("../attendence/" + attendence.id).send();
});

// Products
app.get("/products", function (request, response) {
    response.send(dalproducts.listAllProducts());
});

app.get("/products/:id", function (request, response) {
    var product = dalproducts.findProduct(request.params.id);
    if (product) {
        response.send(product);
    } else {
        response.status(404).send();
    }
});

app.post("/products", function (request, response) {

    var product = request.body;

    var errors = validation.fieldsNotEmpty(product, "ProductName", "Price", "ProductID", "Promotion", "Quantity in stock");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existingProduct = dalproducts.findProduct(product.ProductID);
    if (existingProduct) {
        response.status(409).send({msg: "ProductID is must be unique, it's already registered", link: "../products/" + existingProduct.id});
        return;
    }
    product.id = product.ProductID;
    dalproducts.saveProduct(product);
    response.status(201).location("../products/" + product.id).send();
});

// Locations
app.get("/locations", function (request, response) {
    response.send(dallocations.listAllLocations());
});

app.get("/locations/:id", function (request, response) {
    var location = dallocations.findLocation(request.params.id);
    if (location) {
        response.send(location);
    } else {
        response.status(404).send();
    }
});

app.post("/locations", function (request, response) {

    var location = request.body;

    var errors = validation.fieldsNotEmpty(location, "Name", "Postcode", "Province", "Address");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existingLocation = dallocations.findLocation(location.Name);
    if (existingLocation) {
        response.status(409).send({msg: "Location name must be unique, it's already registered", link: "../locations/" + existingLocation.id});
        return;
    }
    location.id = location.Name;
    dallocations.saveLocation(location);
    response.status(201).location("../locations/" + location.id).send();
});

// de server starten op poort 4567 (bereikbaar op http://localhost:4567 )
app.listen(4567);
// lijntje voor te zien dat alles is opgestart.
console.log("Server started");