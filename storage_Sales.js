module.exports =  {
  sales : {},
  
  saveSales : function(sales){
    this.sales[sales.id]= sales;
  },
  listAllSales : function(){
    var rtnValue =[];
    for (var item in this.sales) {
      rtnValue.push(this.sales[item]);
    };
    return rtnValue;
  },
  findSales : function(id){
    return this.sales[id];
  }
};

