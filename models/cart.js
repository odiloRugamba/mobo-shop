class CartItem{
    constructor(quantity, productPrice, productTitle, sum){
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.productTitle = productTitle;
        this.sum = sum;
    }
}

export default CartItem;