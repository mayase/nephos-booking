var templates = {"booking-template":"        <div class=\"nphs-booking-wrapper\" id=\"nphs-booking-app\">            <div class=\"nphs-day-picker\">                <div class=\"nphs-day\">                    <div class=\"nphs-day-date\"><span>28</span>.11</div>                    <div class=\"nphs-day-label\">C&#x411;</div>                </div>                <div class=\"nphs-day active\">                    <div class=\"nphs-day-date\"><span>28</span>.11</div>                    <div class=\"nphs-day-label\">C&#x411;</div>                </div>                <div class=\"nphs-day\">                    <div class=\"nphs-day-date\"><span>28</span>.11</div>                    <div class=\"nphs-day-label\">C&#x411;</div>                </div>                <div style=\"clear:both;\"></div>            </div>            <div class=\"nphs-tables\">                <div class=\"nphs-table-wrapper\" v-for=\"table in tables\">                    <div class=\"nphs-table\">                        <div class=\"nphs-table-header\">                            {{table.name}}                            <div class=\"nphs-table-header-addon\"><span class=\"nphs-icon-users\"></span>4</div>                        </div>                        <div class=\"nphs-table-time\">                            <div class=\"nphs-table-timerow\">                                <div class=\"nphs-time\" v-for=\"i in 5\"><div>{{times[i]}}</div></div>                            </div>                            <div style=\"clear:both;\"></div>                            <div class=\"nphs-table-timerow\">                                <div class=\"nphs-time\" v-for=\"i in 5\"><div>{{times[i+5]}}</div></div>                            </div>                            <div style=\"clear:both;\"></div>                            <div class=\"nphs-table-timerow\">                                <div class=\"nphs-time\" v-for=\"i in 5\"><div>{{times[i+10]}}</div></div>                            </div>                            <div style=\"clear:both;\"></div>                            <div class=\"nphs-table-timerow\">                                <div class=\"nphs-time\"><div>{{times[15]}}</div></div>                            </div>                            <div style=\"clear:both;\"></div>                        </div>                    </div>                </div>                <div style=\"clear:both;\"></div>            </div>        </div>    "}
'use strict';

var nphsBooking = new (function(tmplts){
    var self = this;

    self.templates = tmplts;
    self.root = null;
    self.app = null;
    self.setRootElement = function(element){
        self.root = element;
        element.innerHTML = self.templates['booking-template'];

        self.app = new Vue({
            el: '#nphs-booking-app',
            data:{
                tables: [],
                times: function(){
                    var times = [];
                    for (var hours = 16; hours < 24; hours++)
                        for (var minutes = 0; minutes <= 30; minutes+=30){
                            times.push(hours+':'+(minutes==0?'00':'30'));
                        }
                    return times;
                }()
            },
            methods: {
                addTable: function(table){
                    this.tables.push(table);
                }
            }
        });
        console.log(self.app);

        setDataFromRemote();
    };


    function setDataFromRemote(){
        for (var i = 1; i <= 5; i++) self.app.addTable({name: 'Стол №' + i});
    }


})(templates);


(function(){
    window.onload = function(){
        var bookingRootElementName = 'nphs-booking';
        nphsBooking.setRootElement(document.getElementById(bookingRootElementName));
    };

}());