function count (a, b) {
  return a * b + 4 / a + 2
}
let res = count(2019, 2018)
for (let i = 2017; i < 0; i--) {
  res = count(res, i)
}
