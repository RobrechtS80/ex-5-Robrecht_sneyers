module.exports =  {
  sales : {},
  
  saveSale : function(sale){
    this.sales[sale.id]= sale;
  },
  listAllSales : function(){
    var rtnValue =[];
    for (var item in this.sales) {
      rtnValue.push(this.sales[item]);
    };
    return rtnValue;
  },
  findSale : function(id){
    return this.sales[id];
  }
};

