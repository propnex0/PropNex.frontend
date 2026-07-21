import { Link } from "react-router-dom";
import "./PaymentSuccess.css";


const PaymentSuccess = () => {


return (

<div className="success-page">

<div className="success-card">


<div className="success-icon">
✅
</div>


<h1>
Payment Successful
</h1>


<p>
Your listing package has been activated successfully.
</p>


<Link to="/dashboard">

<button>
Go To Dashboard
</button>

</Link>


</div>

</div>

);


};


export default PaymentSuccess;