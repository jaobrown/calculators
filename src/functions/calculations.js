import LoanCalc from "loan-calc"

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

export const calculateTotalInterest = (
  principal,
  refiInterest,
  refiLoanTerm,
  currentInterest
) => {
  var refiInterestCost = LoanCalc.totalInterest({
    amount: principal,
    rate: refiInterest,
    termMonths: refiLoanTerm * 12,
  })
  let currentInterestCost = LoanCalc.totalInterest({
    amount: principal,
    rate: currentInterest,
    termMonths: refiLoanTerm * 12,
  })
  let difference = currentInterestCost - refiInterestCost
  if (difference > 0) {
    return `You will save $${moneyFormatter.format(
      difference
    )} in interest over the loan's lifetime`
  } else if (difference <= 0) {
    return `You will spend $${moneyFormatter.format(
      difference
    )} more on interest over the loan's lifetime`
  }
}
