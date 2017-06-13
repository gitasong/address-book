//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
};

function Address(street, city, state, kind) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.kind = kind;
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Address.prototype.fullAddress = function() {
  return "(" + this.kind + ") " + this.street + ", " + this.city + ", " + this.state;
};

function resetFields() {
  // resets form fields with empty string to clear them
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("input.new-kind").val("");
};

//user interface logic
$(document).ready(function() {
  $("#add-address").click(function() {
    // dynamically writes new address panel below existing one when "Add Address" button is clicked
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-kind">Address Type (home, school, etc.)</label>' +
                                   '<input type="text" class="form-control new-kind">' +
                                 '</div>' +
                               '</div>');
  });


  $("form#new-contact").submit(function(event){
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);
    console.log(newContact);

    // loops through each new address and assigns the data from each sub-field to its own variable
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedKind = $(this).find("input.new-kind").val();
      // takes all the variables for each new address, creates a new Address object, and pushes it to the address array of the new Contact
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedKind);
      newContact.addresses.push(newAddress);
    });

    // appends each new contact's full name to the Contacts list below the form fields
    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    // function enabling us to click on contact in Contacts list, and the fly-out panel to the right opens up with each contact's info
    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    resetFields();
  });
});
