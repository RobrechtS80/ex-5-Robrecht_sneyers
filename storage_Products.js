
module.exports =  {
  products : {},
  
  saveProduct : function(product){
    this.products[product.id]= product;
  },
  listAllProducts : function(){
    var rtnValue =[];
    for (var item in this.products) {
      rtnValue.push(this.products[item]);
    };
    return rtnValue;
  },
  findProduct : function(id){
    return this.products[id];
  }
};


