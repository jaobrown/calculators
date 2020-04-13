import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { motion, useAnimatedState } from "framer-motion"
// import "../styles/main.scss"

const IndexPage = () => {
  let monthlyPayment //monthly mortgage payment
  const [principle, setPrinciple] = React.useState(225000)
  const [interest, setInterest] = React.useState(4.15)
  const [loanTerm, setLoanTerm] = React.useState(20)

  const moneyFormatter = new Intl.NumberFormat("en-US", {
    // style: "currency",
    // currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  const percentageFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  })

  function calculateMonthlyPayment(p, n, i) {
    return moneyFormatter.format(
      (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
    )
  }

  //set monthly mortgage payment
  monthlyPayment = calculateMonthlyPayment(
    principle,
    loanTerm * 12,
    interest / 100 / 12
  )

  return (
    <Layout>
      <SEO title="Home" />
      <section className="bg-gray-300 h-screen w-screen">
        <div className="container h-full flex items-center justify-center">
          {/* Start Calculator with sliders */}
          <div className="hidden sm:block bg-white rounded-md p-12 shadow-md mx-auto max-w-lg flex-grow">
            <h1 className="font-extrabold text-3xl text-gray-800">
              Monthly Payment Calculator
            </h1>
            <form action="" className="mt-8">
              <label className="block">
                <span className="text-gray-700">
                  Principle Amount: $
                  <strong className="inline-block">
                    {moneyFormatter.format(principle)}
                  </strong>
                </span>
                <input
                  className="form-input mt-1 block w-full"
                  placeholder="$225,000"
                  type="range"
                  min="25000"
                  max="450000"
                  step="5000"
                  value={principle}
                  onChange={e => setPrinciple(e.target.value)}
                />
              </label>
              <label className="block mt-4">
                <span className="text-gray-700">
                  Interest Rate:{" "}
                  <strong className="inline-block">
                    {percentageFormatter.format(interest)}
                  </strong>{" "}
                  %
                </span>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step=".05"
                  className="form-input mt-1 block w-full"
                  placeholder="4.6%"
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                />
              </label>
              <label className="block mt-4">
                <span className="text-gray-700">
                  Loan Term:{" "}
                  <strong className="inline-block">{loanTerm}</strong> years
                </span>
                <input
                  className="form-select mt-1 block w-full"
                  type="range"
                  min="10"
                  max="30"
                  step="5"
                  onChange={e => setLoanTerm(e.target.value)}
                  value={loanTerm}
                >
                  {/* <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option> */}
                </input>
              </label>
            </form>
            <div className="mt-8 text-gray-700">
              Estimated Monthly Payment: $
              <strong className="inline-block">{monthlyPayment}</strong>
            </div>
          </div>
          {/* End Calculator */}
          {/* Start Calculator with inputs */}
          <div className="block sm:hidden bg-white rounded-md p-12 shadow-md mx-auto max-w-lg flex-grow">
            <h1 className="font-extrabold text-3xl text-gray-800 leading-tight">
              Monthly Payment Calculator
            </h1>
            <div className="mt-8 text-gray-700">
              Estimated Monthly Payment: $
              <strong className="inline-block">{monthlyPayment}</strong>
            </div>
            <form action="" className="mt-8">
              <label className="block">
                <span className="text-gray-700">Principle Amount</span>
                <input
                  className="form-input mt-1 block w-full"
                  placeholder="$225,000"
                  type="number"
                  min="25000"
                  max="450000"
                  value={principle}
                  onChange={e => setPrinciple(e.target.value)}
                />
              </label>
              <label className="block mt-4">
                <span className="text-gray-700">Interest Rate</span>
                <input
                  type="integer"
                  min="2"
                  max="10"
                  className="form-input mt-1 block w-full"
                  placeholder="4.6%"
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                />
              </label>
              <label className="block mt-4">
                <span className="text-gray-700">Loan Term</span>
                <select
                  className="form-select mt-1 block w-full"
                  onChange={e => setLoanTerm(e.target.value)}
                  value={loanTerm}
                >
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                </select>
              </label>
            </form>
          </div>
          {/* End Calculator */}
        </div>
      </section>
    </Layout>
  )
}
export default IndexPage
