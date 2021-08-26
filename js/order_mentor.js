const order = {
    contact: {
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      address: user.adress,
      email: user.email,
    },
    products: productId,
  };
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };
  
  fetch("http://localhost:3000/api/cameras/order", init)
  
  
  let productId = [];
  data.forEach((element) => {
    productId.push(element.id);
  });