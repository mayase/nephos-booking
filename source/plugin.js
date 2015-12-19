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

