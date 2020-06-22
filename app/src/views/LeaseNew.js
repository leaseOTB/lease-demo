import React, {useState, useEffect} from 'react'



const LeaseNew = () => {
  // ON_CHAIN
  const [tenantAddress, setTenant] = useState() //ETH ADDRESS
  // IPFS Object 
  const [tenantName, setName] = useState() // Full Name of Tenant
  const [DOB, setDOB] = useState() // Tenant Date of Birth, vaildate only 18+
  const [picture, setPicture] = useState() // Hashed Image of Unit
  const [streetAddress, setStreet] = useState() // Street Address: 123 E 5th Street, Brooklyn NYC 20402 etc..  maybe validate with USPS/Google maps?
  const [unitNumber, setUnit] = useState() // Unit number max 999
  const [BIN, setBIN] = useState() // Buidling ID Number 

  return (
    <div>
      FORM
    </div>
  )

}

export default LeaseNew