import React, { useReducer, useState, useEffect } from "react"
import { XYPlot, VerticalBarSeries } from "react-vis"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  calculateMonthlyPayment,
  calculateMonthlySavings,
  calculateTotalInterest,
} from "../functions/calculations"

const initialState = {
  principal: 189000,
  currentMonthlyPayment: 1242,
  currentInterest: 5.25,
  refiInterest: 3.16,
  refiLoanTerm: 30,
  refiCashOut: 10000,
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
    refiCashOut,
  } = state

  const onChange = e => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  useEffect(() => {
    var newMonthlyPayment = calculateMonthlyPayment(
      principal,
      refiLoanTerm,
      refiInterest
    )
    setRefiMonthlyPayment(newMonthlyPayment)
  }, [state, principal, refiLoanTerm, refiInterest])

  const handleInsights = () => {
    setShowInsights(true)
  }

  return (
    <Layout>
      <SEO title="Refinance" />
      <section className="bg-gray-300 min-h-screen w-full py-24">
        <div className="container h-full flex items-start justify-center">
          {/* Start Calculator with inputs */}
          <div className="bg-white p-12 shadow-md mx-auto flex-grow">
            <h2 className="font-medium text-3xl text-brand-royal-blue leading-tight">
              Refinance
            </h2>
            <form action="">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-2/3">
                  <h3 className="mt-5 font-bold">Current Mortgage</h3>
                  {/* Current principal balance */}
                  <div className="mt-2 flex flex-wrap">
                    <label className="block w-full md:w-1/2">
                      <span className="text-sm">Principal Balance</span>
                      <input
                        name="principal"
                        onChange={onChange}
                        value={principal}
                        type="number"
                        placeholder="$225,000"
                        className="form-input block"
                      />
                    </label>

                    {/* Current Interest Rate */}
                    <label className="block  w-full md:w-1/2">
                      <span className="text-sm">Years Remaining</span>
                      <input
                        name="currentInterest"
                        value={currentInterest}
                        onChange={onChange}
                        type="number"
                        placeholder="4.1%"
                        className="form-input block"
                      />
                    </label>

                    {/* Current Interest Rate */}
                    <label className="block  w-full md:w-1/2 mt-4">
                      <span className="text-sm">Interest Rate</span>
                      <input
                        name="currentInterest"
                        value={currentInterest}
                        onChange={onChange}
                        type="number"
                        placeholder="4.1%"
                        className="form-input block"
                      />
                    </label>

                    {/* Current monthly P&I Payment */}
                    <label className="block  w-full md:w-1/2 mt-4">
                      <span className="text-sm">Monthly Payment (P&amp;I)</span>
                      <input
                        name="currentMonthlyPayment"
                        onChange={onChange}
                        value={currentMonthlyPayment}
                        type="number"
                        placeholder="$701"
                        className="form-input block"
                      />
                    </label>
                  </div>

                  <h3 className="mt-8 font-bold">New Mortgage</h3>
                  {/* New interest rate: */}
                  <div className="flex flex-wrap">
                    <label className="block mt-2 w-full md:w-1/2">
                      <span className="text-sm">Interest rate</span>
                      <input
                        name="refiInterest"
                        value={refiInterest}
                        onChange={onChange}
                        type="number"
                        placeholder="3.79%"
                        className="form-input block"
                      />
                    </label>

                    {/* Desired cash out: */}
                    <label className="block mt-2 w-full md:w-1/2">
                      <span className="text-sm">Desired cash out</span>
                      <input
                        name="refiCashOut"
                        value={refiCashOut}
                        onChange={onChange}
                        type="number"
                        placeholder="$10,000"
                        className="form-input block"
                      />
                    </label>

                    {/* New Loan Term 	 */}
                    <label className="block mt-4 w-full md:w-1/2">
                      <span className="text-sm">Loan term</span>
                      <input
                        name="refiLoanTerm"
                        value={refiLoanTerm}
                        onChange={onChange}
                        type="number"
                        placeholder="30 Years"
                        className="form-input block"
                      />
                    </label>

                    <div className="mt-10">
                      <button
                        className="inline-block bg-brand-teal text-white font-normal px-10 py-3"
                        onClick={() => handleInsights()}
                        type="button"
                      >
                        {showInsights ? `Recalculate` : `See Insights`}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 w-full lg:w-1/3">
                  <div className="p-8 bg-gray-200 h-full">
                    <h3 className="font-bold">
                      {showInsights ? `Your Insights` : `Helpful Headline`}
                    </h3>
                    <ul
                      className={`mb-4 ${showInsights ? `ml-4 list-disc` : ``}`}
                    >
                      {/* New Monthly Payment */}
                      <li>
                        {showInsights ? (
                          `Your new monthly payment will be $${refiMonthlyPayment}`
                        ) : (
                          <span className="h-3 w-full inline-block bg-gray-400"></span>
                        )}
                      </li>

                      {/* Monthly savings */}
                      <li>
                        {showInsights ? (
                          calculateMonthlySavings(
                            currentMonthlyPayment,
                            refiMonthlyPayment
                          )
                        ) : (
                          <span className="h-3 w-full inline-block bg-gray-400"></span>
                        )}
                      </li>

                      {/* Interest cost savings over lifetime of loan */}
                      <li>
                        {showInsights ? (
                          calculateTotalInterest(
                            principal,
                            refiInterest,
                            refiLoanTerm,
                            currentInterest,
                            refiLoanTerm
                          )
                        ) : (
                          <span className="h-3 w-full inline-block bg-gray-400"></span>
                        )}
                      </li>
                    </ul>
                    {showInsights ? (
                      <XYPlot height={175} width={250}>
                        <VerticalBarSeries
                          data={[
                            {
                              x: 0,
                              y: currentMonthlyPayment,
                            },
                            {
                              x: 1,
                              y: refiMonthlyPayment,
                            },
                          ]}
                        />
                      </XYPlot>
                    ) : null}
                  </div>
                </div>
              </div>

              <p className="max-w-xl flex-grow mt-10 text-xs text-gray-600 italic">
                Payments reflect principal and interest only and do not include
                taxes and insurance. Actual payment obligation will be higher.
              </p>
              <a
                href="https://royalunitedmortgage.com/disclosures/"
                rel="noopener noreferrer"
                target="_blank"
                className="underline block mx-auto flex-grow mt-2 text-xs text-brand-gray-300"
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
