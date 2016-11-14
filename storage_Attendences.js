module.exports =  {
  attendences : {},
  
  saveAttendence : function(attendence){
    this.attendences[attendence.id]= attendence;
  },
  listAllAttendences : function(){
    var rtnValue =[];
    for (var item in this.attendences) {
      rtnValue.push(this.attendences[item]);
    };
    return rtnValue;
  },
  findAttendence : function(id){
    return this.attendences[id];
  }
};

