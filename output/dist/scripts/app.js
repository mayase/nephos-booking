var templates = {"booking-template":"        <div class=\"nphs-booking-wrapper\">            <div class=\"nphs-day-picker\">                <div class=\"nphs-day\">                    <div class=\"nphs-day-date\"><span>28</span>.11</div>                    <div class=\"nphs-day-label\">C&#x411;</div>                </div>                <div class=\"nphs-day active\">                    <div class=\"nphs-day-date\"><span>28</span>.11</div>                    <div class=\"nphs-day-label\">C&#x411;</div>                </div>                <div class=\"nphs-day\">                    <div class=\"nphs-day-date\"><span>28</span>.11</div>                    <div class=\"nphs-day-label\">C&#x411;</div>                </div>                <div style=\"clear:both;\"></div>            </div>            <div class=\"nphs-tables\">                <div class=\"nphs-table-wrapper\">                    <div class=\"nphs-table\">                        <div class=\"nphs-table-header\">                            &#x421;&#x442;&#x43E;&#x43B; &#x2116; 1                            <div class=\"nphs-table-header-addon\">4</div>                        </div>                    </div>                </div>                <div style=\"clear:both;\"></div>            </div>        </div>    "}
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
(function(){
    window.onload = function(){
        var bookingRootElementName = 'nphs-booking';
        nphsBooking.setRootElement(document.getElementById(bookingRootElementName));
    };

}());