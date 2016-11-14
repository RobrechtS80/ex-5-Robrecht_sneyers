module.exports =  {
  locations : {},
  
  saveLocation : function(location){
    this.locations[location.id]= location;
  },
  listAllLocations : function(){
    var rtnValue =[];
    for (var item in this.locations) {
      rtnValue.push(this.locations[item]);
    };
    return rtnValue;
  },
  findLocations : function(id){
    return this.locations[id];
  }
};


