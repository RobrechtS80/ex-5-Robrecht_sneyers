
module.exports =  {
  products : {},
  
  saveProducts : function(products){
    this.products[products.id]= products;
  },
  listAllProducts : function(){
    var rtnValue =[];
    for (var item in this.products) {
      rtnValue.push(this.products[item]);
    };
    return rtnValue;
  },
  findProducts : function(id){
    return this.productss[id];
  }
};


