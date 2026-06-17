import React, { useState, useEffect } from "react";
import axios from "axios";
import "./static/contact.css";

function AddDetails() {
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    link: "",
  });

  const [errors, setErrors] = useState({});
  const [contacts, setContacts] = useState([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };


  const fetchContacts = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${API}/contact`);

      const data = response?.data?.data || [];

      setContacts(data);
      setShowList(data.length > 0);

    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchContacts();
  }, []);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const validateForm = () => {

    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    const postalRegex = /^[0-9]{5,6}$/;
    const textOnlyRegex = /^[A-Za-z\s]+$/;


    if (!formData.name.trim())
      newErrors.name = "Name is required";


    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email";


    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Phone must be 10-15 digits";


    if (formData.website && !isValidUrl(formData.website))
      newErrors.website = "Invalid website URL";


    if (formData.link && !isValidUrl(formData.link))
      newErrors.link = "Invalid social link";


    if (!formData.address.trim())
      newErrors.address = "Address is required";


    if (!formData.city.trim() || !textOnlyRegex.test(formData.city))
      newErrors.city = "City must contain only letters";


    if (!formData.state.trim() || !textOnlyRegex.test(formData.state))
      newErrors.state = "State must contain only letters";


    if (!formData.country.trim() || !textOnlyRegex.test(formData.country))
      newErrors.country = "Country must contain only letters";


    if (!postalRegex.test(formData.postalCode))
      newErrors.postalCode = "Invalid postal code";


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;


    try {

      await axios.post(`${API}/contact`, formData);


      await fetchContacts();


      setFormData({
        name:"",
        email:"",
        phone:"",
        website:"",
        address:"",
        city:"",
        state:"",
        country:"",
        postalCode:"",
        link:"",
      });


      setErrors({});

      alert("Contact Saved Successfully");


    } catch(error){

      console.error(error);
      alert("Something went wrong");

    }

  };



  return (

<div className="contact-container">


<div className="contact-form">

<h2>Contact Us</h2>


<form onSubmit={handleSubmit}>


<div className="form-row">

<input
type="text"
name="name"
placeholder="Person Name"
value={formData.name}
onChange={handleChange}
/>

<p className="error">{errors.name}</p>


<input
type="email"
name="email"
placeholder="Email Address"
value={formData.email}
onChange={handleChange}
/>

<p className="error">{errors.email}</p>


</div>



<div className="form-row">

<input
type="text"
name="phone"
placeholder="Phone Number"
value={formData.phone}
onChange={handleChange}
/>

<p className="error">{errors.phone}</p>



<input
type="url"
name="website"
placeholder="Website URL"
value={formData.website}
onChange={handleChange}
/>

<p className="error">{errors.website}</p>


</div>




<div className="form-row">


<input
type="text"
name="city"
placeholder="City"
value={formData.city}
onChange={handleChange}
/>

<p className="error">{errors.city}</p>



<input
type="text"
name="state"
placeholder="State"
value={formData.state}
onChange={handleChange}
/>

<p className="error">{errors.state}</p>




<input
type="text"
name="country"
placeholder="Country"
value={formData.country}
onChange={handleChange}
/>

<p className="error">{errors.country}</p>



</div>




<input
type="text"
name="postalCode"
placeholder="Postal Code"
value={formData.postalCode}
onChange={handleChange}
/>

<p className="error">{errors.postalCode}</p>




<textarea
name="address"
placeholder="Address"
rows="4"
value={formData.address}
onChange={handleChange}
/>

<p className="error">{errors.address}</p>




<input
type="url"
name="link"
placeholder="Social Media Link"
value={formData.link}
onChange={handleChange}
/>

<p className="error">{errors.link}</p>



<button type="submit">
Submit
</button>


</form>

</div>





{showList && (

<div className="contact-list">

<h2>Submitted Contacts</h2>


{
loading ?

<p>Loading...</p>


:

<>


{/* Desktop Table */}

<table>

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Website</th>
<th>Address</th>
<th>City</th>
<th>State</th>
<th>Country</th>
<th>Postal</th>
<th>Social</th>
</tr>

</thead>



<tbody>

{
contacts.map(item=>(

<tr key={item._id}>

<td>{item.name}</td>
<td>{item.email}</td>
<td>{item.phone}</td>

<td>
{
item.website &&
<a href={item.website.startsWith("http")?item.website:`https://${item.website}`}
target="_blank"
rel="noreferrer">
Visit
</a>
}
</td>


<td>{item.address}</td>
<td>{item.city}</td>
<td>{item.state}</td>
<td>{item.country}</td>
<td>{item.postalCode}</td>


<td>

{
item.link &&
<a href={item.link.startsWith("http")?item.link:`https://${item.link}`}
target="_blank"
rel="noreferrer">
Open
</a>
}

</td>


</tr>

))

}

</tbody>

</table>






{/* Mobile Cards */}

<div className="contact-cards">

{
contacts.map(item=>(

<div className="contact-card" key={item._id}>


<p><b>Name:</b> {item.name}</p>

<p><b>Email:</b> {item.email}</p>

<p><b>Phone:</b> {item.phone}</p>

<p><b>Address:</b> {item.address}</p>

<p><b>City:</b> {item.city}</p>

<p><b>State:</b> {item.state}</p>

<p><b>Country:</b> {item.country}</p>

<p><b>Postal:</b> {item.postalCode}</p>



{
item.website &&
<p>
<b>Website:</b>

<a href={item.website.startsWith("http")?item.website:`https://${item.website}`}
target="_blank"
rel="noreferrer">
 Visit
</a>

</p>
}



{
item.link &&
<p>
<b>Social:</b>

<a href={item.link.startsWith("http")?item.link:`https://${item.link}`}
target="_blank"
rel="noreferrer">
 Open
</a>

</p>
}



</div>

))

}


</div>


</>

}



</div>

)}



</div>

  );
}


export default AddDetails;