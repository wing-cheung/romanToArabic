/**
 * Reads roman numeral from input field and converts it into arabic number.
 */
const convertRomanToArabic = () => {
  const romanNumeral = document.getElementById('romanNumeral').value.toUpperCase()
  const arabicNumber = document.getElementById('arabicNumber')
  arabicNumber.innerHTML = isValidRomanNumeral(romanNumeral) ? calculate(romanNumeral) : 'invalid roman numeral'
}

/**
 * Validates roman numeral which can only contain letters [M, D, C, L, X, V, I] in specific order and amount.
 * @param {string} romanNumeral - Roman numeral which is beeing validated.
 */
const isValidRomanNumeral = (romanNumeral) => {
  const regex = /M{0,3}(CM)?D?(CD)?C{0,3}(XC)?(XL)?L?X{0,3}(IX)?(IV)?V?I{0,3}/g
  return (romanNumeral.match(regex)[0].length === romanNumeral.length)
}

/**
 * Gets corresponding arabic number to given roman numeral.
 * @param {string} singleRomanNumeral - Single roman numeral.
 */
const getArabicNumber = (singleRomanNumeral) => {
  const arabicValue = {'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1}
  return arabicValue[singleRomanNumeral]
}

/**
 * Calculates arabic number by first subtracting roman numeral pairs and then adding every single roman numeral.
 * @param {string} romanNumeral -  Valid roman numeral.
 */
const calculate = (romanNumeral) => {
  const edgeCases = { 'IV': 4, 'IX': 9, 'XL': 40, 'XC': 90, 'CD': 400, 'CM': 900 }
  let calculatedArabicNumber = 0
  // subtract romanNumerals
  for (let key in edgeCases) {
    if (romanNumeral.indexOf(key) !== -1) {
      calculatedArabicNumber += edgeCases[key]
      romanNumeral = romanNumeral.replace(String(key), '')
    }
  }
  // add romanNumerals
  for (let i = 0; i < romanNumeral.length; i++) {
    calculatedArabicNumber += getArabicNumber(romanNumeral.charAt(i))
  }
  return calculatedArabicNumber
}

/**
 * Empty input field for roman numeral and arabic number field when mouse focuses on input.
 * @param {HTMLElement} input -  Input field.
 */
const emptyInput = (input) => {
    const arabicNumber = document.getElementById('arabicNumber')
    arabicNumber.innerHTML = ''
    input.value = ''
}