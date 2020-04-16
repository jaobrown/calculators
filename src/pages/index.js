import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { motion } from "framer-motion"
// import "../styles/main.scss"

const Modal = props => {
  const [fName, setFName] = React.useState("")
  const [lName, setLName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  return (
    <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-30 px-4">
      <div className="bg-white rounded-md p-12 shadow-md mx-auto max-w-lg flex-grow">
        <h2>Your estimated mortgage</h2>
        <div className="text-gray-700 leading-tight text-sm mt-8">
          Mortgage Amount
          <br />
          <strong className="inline-block text-5xl">
            {" "}
            <span className="inline-block font-normal text-2xl transform -translate-y-3">
              $
            </span>
            {props.principal}
          </strong>
        </div>
        <div className="text-gray-700 leading-tight text-sm">
          Interest Rate
          <br />
          <strong className="inline-block text-5xl"> {props.interest}</strong>
          <span className="inline-block font-normal text-2xl transform -translate-y-3">
            %
          </span>
        </div>
        <div className="text-gray-700 leading-tight text-sm">
          Loan Term
          <br />
          <strong className="inline-block text-5xl">{props.loanTerm} </strong>
          <span className="inline-block font-normal text-2xl transform -translate-y-3">
            {" "}
            years
          </span>
        </div>
        <div className="text-gray-700 leading-tight text-sm">
          Estimated Monthly Payment
          <br />
          <strong className="inline-block text-5xl">
            {" "}
            <span className="inline-block font-normal text-2xl transform -translate-y-3">
              $
            </span>
            {props.monthlyPayment}
          </strong>
        </div>
        <form action="">
          <label className="block mt-4">
            <span className="text-gray-700 text-sm">First Name</span>
            <input
              type="text"
              className="form-input mt-1 block w-full"
              placeholder="John"
              value={fName}
              onChange={e => setFName(e.target.value)}
            />
          </label>
          <label className="block mt-4">
            <span className="text-gray-700 text-sm">Last Name</span>
            <input
              type="text"
              className="form-input mt-1 block w-full"
              placeholder="Smith"
              value={lName}
              onChange={e => setLName(e.target.value)}
            />
          </label>
          <label className="block mt-4">
            <span className="text-gray-700 text-sm">Phone Number</span>
            <input
              type="phone"
              className="form-input mt-1 block w-full"
              placeholder="(555) 555-5555"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </label>
          <button className="bg-blue-700 text-white font-bold px-5 py-3 rounded mt-8">
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
}

// todo: convert to useReducer
const IndexPage = () => {
  let monthlyPayment //monthly mortgage payment
  const [principal, setPrincipal] = React.useState(225000)
  const [interest, setInterest] = React.useState(3.86)
  const [loanTerm, setLoanTerm] = React.useState(30)
  const [clickCount, setClickCount] = React.useState(0)
  const [isFormOpen, setIsFormOpen] = React.useState(false)

  const moneyFormatter = new Intl.NumberFormat("en-US", {
    // style: "currency",
    // currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const percentFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })

  function calculateMonthlyPayment(p, n, i) {
    return moneyFormatter.format(
      (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
    )
  }

  //set monthly mortgage payment
  monthlyPayment = calculateMonthlyPayment(
    principal,
    loanTerm * 12,
    interest / 100 / 12
  )

  return (
    <Layout>
      <SEO title="Home" />
      {isFormOpen && (
        <Modal
          monthlyPayment={monthlyPayment}
          interest={interest}
          principal={principal}
          loanTerm={loanTerm}
        />
      )}
      <section className="bg-gray-300 h-screen w-full pt-24">
        <div className="container h-full flex items-start justify-center">
          {/* Start Calculator with inputs */}
          <div className="bg-white rounded-md p-12 shadow-md mx-auto max-w-lg flex-grow">
            <h1 className="font-semibold text-3xl text-gray-800 leading-tight">
              New Home Mortgage Payment Estimator
            </h1>
            <div className="mt-8 text-gray-700 leading-tight text-sm">
              Estimated Monthly Payment
              <br />
              <strong className="inline-block text-5xl">
                {" "}
                <span className="inline-block font-normal text-2xl transform -translate-y-3">
                  $
                </span>
                {monthlyPayment}
              </strong>
            </div>
            <form action="" className="mt-5">
              <label className="block">
                <span className="text-gray-700 text-sm">
                  Mortgage Amount $
                  <strong>{moneyFormatter.format(principal)}</strong>
                </span>
                {/* <input
                  className="form-input mt-1 block w-full"
                  placeholder="$225,000"
                  type="number"
                  min="25000"
                  max="450000"
                  value={principal}
                  onChange={e => setPrinciple(e.target.value)}
                  onBlur={() => setClickCount(clickCount => clickCount + 1)}
                /> */}
                <input
                  className="form-input mt-1 block w-full"
                  placeholder="$225,000"
                  type="range"
                  min="25000"
                  max="450000"
                  step="1000"
                  value={principal}
                  onChange={e => setPrincipal(e.target.value)}
                  onBlur={() => setClickCount(clickCount => clickCount + 1)}
                />
              </label>
              <label className="block mt-4">
                <span className="text-gray-700 text-sm">
                  Interest Rate{" "}
                  <strong>{percentFormatter.format(interest)}</strong>%
                </span>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step=".125"
                  className="form-input mt-1 block w-full"
                  placeholder="4.6%"
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                  onBlur={() => setClickCount(clickCount => clickCount + 1)}
                />
              </label>
              <label className="block mt-4">
                <span className="text-gray-700 text-sm">Loan Duration</span>
                <select
                  className="form-select mt-1 block w-full"
                  onChange={e => setLoanTerm(e.target.value)}
                  value={loanTerm}
                  onBlur={() => setClickCount(clickCount => clickCount + 1)}
                >
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                </select>
              </label>
              {clickCount >= 2 ? (
                <motion.div
                  className="mt-4"
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  // transition={{ ease: "easeIn", duration: 0.25 }}
                >
                  <div className="inline-block bg-teal-700 text-white font-bold px-5 py-3 rounded" onClick={() => setIsFormOpen(true)}>
                    Get Started
                  </div>
                </motion.div>
              ) : null}
              <p className="mx-auto max-w-lg flex-grow mt-8 text-xs text-gray-600 italic">
                Payments reflect principal and interest only and do not include
                taxes and insurance. Actual payment obligation will be higher.
              </p>
              <a
                href="https://royalunitedmortgage.com/disclosures/"
                rel="noopener noreferrer"
                target="_blank"
                className="underline block mx-auto max-w-lg flex-grow mt-2 text-xs text-gray-700"
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

export default IndexPage
