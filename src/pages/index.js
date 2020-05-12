import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { moneyFormatter, percentFormatter } from "../functions/calculations"
import { motion } from "framer-motion"
// import "../styles/main.scss"

export const calculateMonthlyPayment = (p, n, i) => {
  return moneyFormatter.format(
    (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
  )
}

// const Modal = props => {
//   const [fName, setFName] = useState("")
//   const [lName, setLName] = useState("")
//   const [phone, setPhone] = useState("")
//   return (
//     <div className="fixed inset-0 overflow-y-scroll bg-gray-900 z-30 px-4">
//       <div className="my-8 bg-white rounded-md p-12 shadow-md mx-auto max-w-lg flex-grow">
//         <h2>Your estimated mortgage</h2>
//         <div className="text-gray-700 leading-tight text-sm mt-8">
//           Mortgage Amount
//           <br />
//           <strong className="inline-block text-5xl">
//             {" "}
//             <span className="inline-block font-normal text-2xl transform -translate-y-3">
//               $
//             </span>
//             {moneyFormatter.format(props.principal)}
//           </strong>
//         </div>
//         <div className="text-gray-700 leading-tight text-sm">
//           Interest Rate
//           <br />
//           <strong className="inline-block text-5xl"> {props.interest}</strong>
//           <span className="inline-block font-normal text-2xl transform -translate-y-3 translate-x-1">
//             %
//           </span>
//         </div>
//         <div className="text-gray-700 leading-tight text-sm">
//           Loan Term
//           <br />
//           <strong className="inline-block text-5xl">{props.loanTerm} </strong>
//           <span className="inline-block font-normal text-2xl transform -translate-y-3 translate-x-1">
//             years
//           </span>
//         </div>
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
//         <form action="">
//           <label className="block mt-4">
//             <span className="text-gray-700 text-sm">First Name</span>
//             <input
//               type="text"
//               className="form-input mt-1 block w-full"
//               placeholder="John"
//               value={fName}
//               onChange={e => setFName(e.target.value)}
//             />
//           </label>
//           <label className="block mt-4">
//             <span className="text-gray-700 text-sm">Last Name</span>
//             <input
//               type="text"
//               className="form-input mt-1 block w-full"
//               placeholder="Smith"
//               value={lName}
//               onChange={e => setLName(e.target.value)}
//             />
//           </label>
//           <label className="block mt-4">
//             <span className="text-gray-700 text-sm">Phone Number</span>
//             <input
//               type="phone"
//               className="form-input mt-1 block w-full"
//               placeholder="(555) 555-5555"
//               value={phone}
//               onChange={e => setPhone(e.target.value)}
//             />
//           </label>
//           <button className="bg-blue-700 text-white font-bold px-5 py-3 rounded mt-8">
//             Get Started
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// todo: convert to useReducer
const IndexPage = () => {
  let monthlyPayment //monthly mortgage payment
  const [principal, setPrincipal] = useState(225000)
  const [interest, setInterest] = useState(3.86)
  const [loanTerm, setLoanTerm] = useState("30 years")
  const [clickCount, setClickCount] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)

  let strippedLoanTerm = +loanTerm.split(" ")[0]

  //set monthly mortgage payment
  monthlyPayment = calculateMonthlyPayment(
    principal,
    strippedLoanTerm * 12,
    interest / 100 / 12
  )

  return (
    <Layout>
      <SEO title="New Loan" />
      {/* {isFormOpen && (
        <Modal
          monthlyPayment={monthlyPayment}
          interest={interest}
          principal={principal}
          loanTerm={loanTerm}
        />
      )} */}
      <section className="bg-gray-300 min-h-screen w-full py-24">
        <div className="container h-full flex items-start justify-center">
          {/* Start Calculator with inputs */}
          <div className="bg-white p-12 shadow-md mx-auto flex-grow max-w-4xl">
            <h2 className="font-medium text-3xl text-brand-royal-blue leading-tight">
              Mortgage Payment Calculator
            </h2>
            <div className="flex flex-wrap -mx-8">
              <div className="w-full sm:w-1/2 px-8">
                <form action="" className="mt-5">
                  <label className="block">
                    <span className="text-brand-gray-300 text-sm leading-tight">
                      Home Loan Amount <br />
                      <strong className="font-medium inline-block text-4xl text-brand-royal-blue">
                        {" "}
                        <span className="inline-block font-normal text-lg transform -translate-y-2">
                          $
                        </span>
                        {moneyFormatter.format(principal)}
                      </strong>
                    </span>
                    <input
                      className="form-input mt-2 block w-full border-none p-0"
                      placeholder="$225,000"
                      type="range"
                      min="25000"
                      max="725000"
                      step="1000"
                      value={principal}
                      onChange={e => setPrincipal(e.target.value)}
                      onClick={() =>
                        setClickCount(clickCount => clickCount + 1)
                      }
                    />
                  </label>
                  <label className="block mt-4">
                    <span className="text-brand-gray-300 text-sm leading-tight">
                      Interest Rate <br />
                      <strong className="font-medium inline-block text-4xl text-brand-royal-blue">
                        {percentFormatter.format(interest)}
                        <span className="inline-block font-normal text-lg transform -translate-y-2 translate-x-1">
                          %
                        </span>
                      </strong>
                    </span>
                    <input
                      type="range"
                      min="2.5"
                      max="6.5"
                      step=".125"
                      className="form-input mt-2 block w-full border-none p-0"
                      placeholder="4.125%"
                      value={interest}
                      onChange={e => setInterest(e.target.value)}
                      onClick={() =>
                        setClickCount(clickCount => clickCount + 1)
                      }
                    />
                  </label>
                  <label className="block mt-4">
                    <span className="text-brand-gray-300 text-sm">
                      Loan Duration
                    </span>
                    <select
                      className="form-select mt-2 block w-1/2 rounded-none border-4 border-brand-royal-blue text-brand-royal-blue font-semibold"
                      value={loanTerm}
                      onChange={e => setLoanTerm(e.target.value)}
                      onClick={() =>
                        setClickCount(clickCount => clickCount + 1)
                      }
                    >
                      <option>10 years</option>
                      <option>15 years</option>
                      <option>20 years</option>
                      <option>25 years</option>
                      <option>30 years</option>
                    </select>
                  </label>
                </form>
                <div className="sm:hidden">
                  <p className="mx-auto flex-grow mt-10 text-xs text-gray-600 italic">
                    This Calculator is for demonstrational purposes only and
                    does not reflect any rate or payment you may qualify for.
                  </p>
                  <a
                    href="https://royalunitedmortgage.com/disclosures/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="underline block mx-auto flex-grow mt-2 text-xs text-brand-gray-300"
                  >
                    Disclosures
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-8 order-first sm:order-none">
                <div className="mt-8 sm:mt-5 text-brand-gray-300 leading-tight text-sm">
                  Estimated Monthly Payment
                  <br />
                  <strong className="font-medium inline-block text-6xl text-brand-teal">
                    {" "}
                    <span className="inline-block font-normal text-2xl transform -translate-y-4">
                      $
                    </span>
                    {monthlyPayment}
                  </strong>
                </div>
                {clickCount >= 2 ? (
                  <motion.div
                    className="mt-4 sm:mt-10"
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    // transition={{ ease: "easeIn", duration: 0.25 }}
                  >
                    <button
                      className="inline-block bg-brand-teal text-white font-normal px-10 py-3"
                      onClick={() => setIsFormOpen(true)}
                      type="button"
                    >
                      Get Started
                    </button>
                  </motion.div>
                ) : null}
                <div className="hidden sm:block">
                  <p className="mx-auto flex-grow mt-10 text-xs text-gray-600 italic">
                    This Calculator is for demonstrational purposes only and
                    does not reflect any rate or payment you may qualify for.
                  </p>
                  <a
                    href="https://royalunitedmortgage.com/disclosures/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="underline block mx-auto flex-grow mt-2 text-xs text-brand-gray-300"
                  >
                    Disclosures
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* End Calculator */}
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
