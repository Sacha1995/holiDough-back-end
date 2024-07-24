function genToken() {
  return Math.round(Math.random() * 999999999999) + "" + Date.now();
}

module.exports = { genToken };
