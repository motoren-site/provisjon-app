import { React, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";

export default function App() {

  function Sum(prop) {

    const [sum, setSum] = useState(0);

    useEffect(()=> {
      if(prop.lonn !== undefined) {
        setSum(prop.lonn);
      } else {
        setSum(0);
      }
     
    });
    if(sum > -1) {
        return ( <h1 className='title is-1'>{Math.round(sum).toLocaleString()} kr</h1>);
    }

  }

  function Appen() {
    const [lonnData, setLonnData] = useState(0);

    const notValid = (req) => {
      return req.hours === '' ||
        req.fixedSalary === '' ||
        req.hourPrice === '' ||
        req.percentage === '';
    }

    const getFerielonn = (lonnReq) => {
      if (notValid(lonnReq)) {
        return;
      }

      axios.post('/lonn-api/lonn', lonnReq)
        .then(res => {
          setLonnData(res.data);
        })

    };

    useEffect(() => {
      console.log("heiheihie")
      if (lonnData === undefined) {
        return;
      }
      document.title = `${Math.round(lonnData)}`;
    });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = formData => {
      getFerielonn(formData);
    };

    return (<div>
       <div className='field'>
       <form onSubmit={handleSubmit(onSubmit)} onChange={handleSubmit(onSubmit)}>

         <label className='label'>Timepris</label>
          <input className='input' type="number"  {...register("hourPrice", {})} />
          <label className='label'>Fastlønn</label>
          <input className='input' type="number" {...register("fixedSalary", {})} />
          <label className='label'>Antall timer</label>

          <input className='input' type="number" {...register("hours", {})} />
        
          <label className='label'>Provisjons prosent</label>

          <input className='input' type="number"  {...register("percentage", {})} />

      </form>
       </div>
       <Sum lonn={lonnData}></Sum>

    </div>);

  }


  return (
    <section className="section">
      <div className="container">

        <div className="columns">
          <div className="column is-4 is-offset-4">
            <Appen></Appen>
          </div>

        </div>
      </div>
    </section>
  );
}