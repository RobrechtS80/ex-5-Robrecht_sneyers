module.exports =  {
  attendences : {},
  
  saveAttendences : function(attendences){
    this.attendences[attendences.id]= attendences;
  },
  listAllAttendences : function(){
    var rtnValue =[];
    for (var item in this.attendences) {
      rtnValue.push(this.attendences[item]);
    };
    return rtnValue;
  },
  findAttendences : function(id){
    return this.attendences[id];
  }
};

