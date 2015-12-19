'use strict';

var nphsBooking = new (function(tmplts){
    var self = this;

    self.templates = tmplts;
    self.root = null;
    self.setRootElement = function(element){
        self.root = element;
        element.innerHTML = self.templates['booking-template'];


    }

})(templates);