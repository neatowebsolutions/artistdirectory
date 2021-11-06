const toString = (product) => {
  const data = [];

  data.push(`ID = ${product.id}`);

  return data.join(' | ');
};

module.exports = toString;
