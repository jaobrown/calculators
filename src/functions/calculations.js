// Utility for formatting percentages
export const percentFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
})

// Utility for formatting money
export const moneyFormatter = new Intl.NumberFormat("en-US", {
  // style: "currency",
  // currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export const calculateMonthlyPayment = (principle, loanTerm, interest) => {
//   const strippedLoanTerm = +loanTerm.split(" ")[0]
  const p = principle
//   const n = strippedLoanTerm * 12
  const n = loanTerm * 12
  const i = interest / 100 / 12
  return moneyFormatter.format(
    (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
  )
}

export const calculateMonthlySavings = (
  currentMonthlyPayment,
  refiMonthlyPayment
) => {
  let current = parseFloat(currentMonthlyPayment)
  let refi = parseFloat(refiMonthlyPayment)
  let difference = current - refi
  if (difference > 0) {
    return `You will save $${moneyFormatter.format(difference)} every month`
  } else if (difference < 0) {
    return `You will spend $${-moneyFormatter.format(
      difference
    )} more every month`
  }
}

export const calculateTimeToSavings = (
  principal,
  currentMonthlyPayment,
  refiMonthlyPayment,
  closingCosts
) => {
  let current = parseFloat(currentMonthlyPayment)
  let refi = parseFloat(refiMonthlyPayment)
  let costs = (parseFloat(closingCosts) / 100) * principal
  let difference = current - refi
  let time = Math.ceil(costs / difference)
  return `It will take ${time} months for closing costs to be paid for with savings`
}
