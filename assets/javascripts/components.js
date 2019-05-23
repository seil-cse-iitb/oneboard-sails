angular.module('oneboard')
.component('fan', {
    templateUrl: 'components/equipments/fan.html',
    controller: function($scope, $element, $attrs, Equipment){
        var ctrl = this;
        ctrl.fan.properties.state=ctrl.fan.properties.state||false;
        $scope.switch = function(equipment){
            Equipment.actuate({id:equipment.id},{msg:"S"+Number(!equipment.properties.state), state:!equipment.properties.state});
        }
    },
    bindings: {
        fan: '<'
    }
})
.component('light', {
    templateUrl: 'components/equipments/light.html',
    controller: function($scope, $element, $attrs, Equipment){
        var ctrl = this;
        ctrl.light.properties.state=ctrl.light.properties.state||false;
        $scope.switch = function(equipment){
            Equipment.actuate({id:equipment.id},{msg:"S"+Number(!equipment.properties.state), state:!equipment.properties.state});
        }
    },
    bindings: {
        light: '<'
    }
})
.component('lightArray', {
    templateUrl: 'components/equipments/light-array.html',
    controller: function($scope, $element, $attrs, $http, Equipment){
        var ctrl = this;
        ctrl.lightArray.properties.state=ctrl.lightArray.properties.state||false;
        $scope.range = function(count) {
            return Array.apply(0, Array(+count)).map(function(value,index){
                return index;
            });
        }
        $scope.switch = function(equipment){
            Equipment.actuate({id:equipment.id},{msg:"S"+Number(!equipment.properties.state), state:!equipment.properties.state});
        }
    },
    bindings: {
        lightArray: '<'
    }
})
.component('ac', {
    templateUrl: 'components/equipments/ac.html',
    controller: function($scope, $element, $attrs, Equipment){
        var ctrl = this;
        ctrl.ac.properties.state.on=ctrl.ac.properties.state.on||false;
        $scope.switch = function(equipment){
            var state = equipment.properties.state;
            state.on = !state.on;
            if(state.on){
                Equipment.actuate({id:equipment.id},{msg:"T"+Number(equipment.properties.state.temperature), state:state});    
            }
            else{
                Equipment.actuate({id:equipment.id},{msg:"T00", state:state});
            }
        }
        $scope.change_temp = function(equipment, new_temp){
            if (new_temp<18 || new_temp>28){
                return ;
            }
            console.log(new_temp);
            equipment.properties.state.temperature = new_temp;
            Equipment.actuate({id:equipment.id},{msg:"T"+Number(equipment.properties.state.temperature), state:equipment.properties.state});
            // Equipment.actuate({id:equipment.id},{msg:"T1", state:equipment.properties.state});
        }
    },
    bindings: {
        ac: '<'
    }
})


//sensors
.component('temperature', {
    templateUrl: 'components/sensors/temperature.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.temperature.properties.state=false;
        // ctrl.temperature.value = "hourglass_full"
    },
    bindings: {
        temperature: '<'
    }
})


// Groups
.component('zone', {
    templateUrl: 'components/equipments/zone.html',
    controller: function($scope, $element, $attrs, $state, EquipmentGroup){
        var ctrl = this;
        ctrl.zone.properties.state=ctrl.zone.properties.state||false;
        $scope.switch = function(equipment){
            EquipmentGroup.actuate({id:equipment.id},{msg:"S"+Number(!equipment.properties.state), state:!equipment.properties.state}, function(res){
                console.log(res);
                $state.reload();
            });
        }
    },
    bindings: {
        zone: '<'
    }
})