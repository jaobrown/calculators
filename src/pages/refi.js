import React, { useReducer, useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  calculateMonthlyPayment,
  calculateTimeToSavings,
  calculateMonthlySavings,
  calculateTotalInterest,
} from "../functions/calculations"

const initialState = {
  principal: 189000,
  currentMonthlyPayment: 1242,
  currentInterest: 5.25,
  refiInterest: 3.16,
  refiLoanTerm: 30,
  closingCosts: 2,
  financeClosingCosts: "Yes",
}

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value,
  }
}

const SecondPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [refiMonthlyPayment, setRefiMonthlyPayment] = useState(1056)
  const [showInsights, setShowInsights] = useState(false)

  const {
    principal,
    currentMonthlyPayment,
    currentInterest,
    refiInterest,
    refiLoanTerm,
    closingCosts,
    financeClosingCosts,
  } = state

  const onChange = e => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  useEffect(() => {
    if (financeClosingCosts === "Yes") {
      var newMonthlyPayment = calculateMonthlyPayment(
        principal + (parseFloat(closingCosts) / 100) * principal,
        refiLoanTerm,
        refiInterest
      )
    } else {
      var newMonthlyPayment = calculateMonthlyPayment(
        principal,
        refiLoanTerm,
        refiInterest
      )
    }
    setRefiMonthlyPayment(newMonthlyPayment)
  }, [state, principal, refiLoanTerm, refiInterest])

  const handleInsights = () => {
    setShowInsights(prevState => !prevState)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <section className="bg-gray-300 min-h-screen w-full py-24">
        <div className="container h-full flex items-start justify-center">
          {/* Start Calculator with inputs */}
          <div className="bg-white p-12 shadow-md mx-auto max-w-xl flex-grow">
            <h2 className="font-medium text-3xl text-brand-royal-blue leading-tight">
              Refinance
            </h2>
            <h3 className="mt-5 font-bold">Current Mortgage</h3>
            <form action="">
              {/* Current principal balance */}
              <label className="block mt-2">
                <span>principal balance of current mortgage</span>
                <input
                  name="principal"
                  onChange={onChange}
                  value={principal}
                  type="number"
                  placeholder="$225,000"
                  className="form-input block"
                />
              </label>

              {/* Current monthly P&I Payment */}
              <label className="block mt-4">
                <span>
                  Monthly mortgage payment (Principal & Interest Only)
                </span>
                <input
                  name="currentMonthlyPayment"
                  onChange={onChange}
                  value={currentMonthlyPayment}
                  type="number"
                  placeholder="$701"
                  className="form-input block"
                />
              </label>

              {/* Current Interest Rate */}
              <label className="block mt-4">
                <span>Your mortgage's current interest rate</span>
                <input
                  name="currentInterest"
                  value={currentInterest}
                  onChange={onChange}
                  type="number"
                  placeholder="4.1%"
                  className="form-input block"
                />
              </label>

              <h3 className="mt-5 font-bold">New Mortgage</h3>
              {/* New interest rate: */}
              <label className="block mt-2">
                <span>New interest rate (after refinancing)</span>
                <input
                  name="refiInterest"
                  value={refiInterest}
                  onChange={onChange}
                  type="number"
                  placeholder="3.79%"
                  className="form-input block"
                />
              </label>

              {/* New Loan Term 	 */}
              <label className="block mt-4">
                <span>New loan term</span>
                <input
                  name="refiLoanTerm"
                  value={refiLoanTerm}
                  onChange={onChange}
                  type="number"
                  placeholder="30 Years"
                  className="form-input block"
                />
              </label>

              {/* Closing costs (?) */}
              <label className="block mt-4">
                <span>Closing costs (% of principal)</span>
                <input
                  name="closingCosts"
                  value={closingCosts}
                  onChange={onChange}
                  type="number"
                  placeholder="2%"
                  className="form-input block"
                />
              </label>

              {/* Finance closing costs?  */}
              <label className="block mt-4">
                <span>Would you like to finance your closing costs?</span>
                <select
                  name="financeClosingCosts"
                  value={financeClosingCosts}
                  onChange={onChange}
                  type="text"
                  className="form-select mt-2 block"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </label>

              <div className="mt-4">
                <button
                  className="inline-block bg-brand-teal text-white font-normal px-10 py-3"
                  onClick={() => handleInsights()}
                  type="button"
                >
                  See Insights
                </button>
              </div>
              {showInsights && (
                <div className="p-8 bg-gray-200 mt-4">
                  <h3 className="font-bold">Insights</h3>
                  <ul className="list-disc ml-4">
                    {/* New Monthly Payment */}
                    <li>
                      Your new monthly payment will be ${refiMonthlyPayment}
                    </li>

                    {/* Monthly savings */}
                    <li>
                      {calculateMonthlySavings(
                        currentMonthlyPayment,
                        refiMonthlyPayment
                      )}
                    </li>

                    {/* When will the interest savings pay for the closing costs? */}
                    <li>
                      {calculateTimeToSavings(
                        principal,
                        currentMonthlyPayment,
                        refiMonthlyPayment,
                        closingCosts
                      )}
                    </li>

                    {/* Interest cost savings over lifetime of loan */}
                    <li>
                      {calculateTotalInterest(
                        principal,
                        refiInterest,
                        refiLoanTerm,
                        currentInterest,
                        refiLoanTerm,
                        closingCosts,
                        financeClosingCosts
                      )}
                    </li>
                  </ul>
                </div>
              )}

              <p className="mx-auto max-w-lg flex-grow mt-10 text-xs text-gray-600 italic">
                Payments reflect principal and interest only and do not include
                taxes and insurance. Actual payment obligation will be higher.
              </p>
              <a
                href="https://royalunitedmortgage.com/disclosures/"
                rel="noopener noreferrer"
                target="_blank"
                className="underline block mx-auto max-w-lg flex-grow mt-2 text-xs text-brand-gray-300"
              >
                Disclosures
              </a>
            </form>
          </div>
          {/* End Calculator */}
        </div>
      </section>
    </Layout>
  )
}

export default SecondPage
