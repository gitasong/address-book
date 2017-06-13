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

//user interface logic
$(document).ready(function() {
  $("#add-address").click(function() {
    // dynamically writes new address panel below existing one when "Add Address" button is clicked
    $("#new-addresses").append('<div class="new-address remove">' +
                                 '<div class="form-group remove">' +
                                   '<label for="new-street" class="remove">Street</label>' +
                                   '<input type="text" class="form-control new-street remove">' +
                                 '</div>' +
                                 '<div class="form-group remove">' +
                                   '<label for="new-city" class="remove">City</label>' +
                                   '<input type="text" class="form-control new-city remove">' +
                                 '</div>' +
                                 '<div class="form-group remove">' +
                                   '<label for="new-state" class="remove">State</label>' +
                                   '<input type="text" class="form-control new-state remove">' +
                                 '</div>' +
                                 '<div class="form-group remove">' +
                                   '<label for="new-kind" class="remove">Address Type (home, school, etc.)</label>' +
                                   '<input type="text" class="form-control new-kind remove">' +
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

    $("#new-addresses").find(".remove").remove();

    // appends each new contact's full name to the Contacts list below the form fields
    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    // displays contact details in show-contact panel when hover over newContact.fullName
    $(".contact").mouseenter(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    $(".contact").mouseleave(function() {
      $("#show-contact").hide();
      $("#show-contact h2").text("");
      $(".first-name").text("");
      $(".last-name").text("");
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("");
      });
    });

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

function resetFields() {
  // resets form fields with empty string to clear them
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("input.new-kind").val("");
};
