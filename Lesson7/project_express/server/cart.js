const add = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.body.id_product);
    if (find !== undefined ) {
        find.quantity += 1;
    }
    else {
        const newCartItem = req.body;
        newCartItem.quantity = 1;
        cart.contents.push(newCartItem);
    }
    return JSON.stringify(cart, null, 4);
};

const del = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.body.id_product);
    if (find.quantity > 1){
        find.quantity--;
    }
    else {
        cart.contents.splice(cart.contents.indexOf(find), 1)
    }
    return JSON.stringify(cart, null, 4);
};

const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del,
};
