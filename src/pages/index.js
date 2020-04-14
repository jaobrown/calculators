import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { motion } from "framer-motion"
// import "../styles/main.scss"

// const Modal = (props) => {
//   return (
//     <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-30 px-4">
//       <div className="bg-white rounded-md p-12 shadow-md mx-auto max-w-lg flex-grow">
//         <div className="text-gray-700 leading-tight text-sm">
//           Estimated Monthly Payment
//           <br />
//           <strong className="inline-block text-5xl">
//             {" "}
//             <span className="inline-block font-normal text-2xl transform -translate-y-3">
//               $
//             </span>
//             {props.monthlyPayment}
//           </strong>
//         </div>
//       </div>
//     </div>
//   )
// }

// todo: convert to useReducer
const IndexPage = () => {
  let monthlyPayment //monthly mortgage payment
  const [principle, setPrinciple] = React.useState(225000)
  const [interest, setInterest] = React.useState(3.86)
  const [loanTerm, setLoanTerm] = React.useState(30)
  const [clickCount, setClickCount] = React.useState(0)

  const moneyFormatter = new Intl.NumberFormat("en-US", {
    // style: "currency",
    // currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
      {/* <Modal monthlyPayment={monthlyPayment}/> */}
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
                <span className="text-gray-700 text-sm">Mortgage Amount</span>
                <input
                  className="form-input mt-1 block w-full"
                  placeholder="$225,000"
                  type="number"
                  min="25000"
                  max="450000"
                  value={principle}
                  onChange={e => setPrinciple(e.target.value)}
                  onBlur={() => setClickCount(clickCount => clickCount + 1)}
                />
              </label>
              <label className="block mt-4">
                <span className="text-gray-700 text-sm">Interest Rate</span>
                <input
                  type="integer"
                  min="2"
                  max="10"
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
                  <button className="bg-teal-700 text-white font-bold px-5 py-3 rounded">
                    Get Started
                  </button>
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
