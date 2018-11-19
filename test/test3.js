let str = '啊士大夫[i-68]啊手动阀及[i-77]asdf12[i-33]1'

let strs = str.split('[i-')

let result = []
for (let i = 0; i < strs.length; i++) {
  let cons = strs[i].split(']')
  if (cons.length == 2) {
    result.push({
      content: cons[0],
      expression: true
    })
    result.push({
      content: cons[1],
      expression: false
    })
  } else {
    cons.forEach(it => {
      result.push({
        content: it,
        expression: false
      })
    })
  }
}


