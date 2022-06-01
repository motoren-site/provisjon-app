import {React, useState} from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import axios from "axios";

export default function App() {


  function Appen() {
    const [lonnData, setLonnData] = useState({});

    const notValid = (req) => {
      console.log(req);
      return req.breakAugust === '' ||
      req.breakJuly == '' ||
      req.breakSeptember === '' ||
      req.fixedSalary === '' ||
      req.hourPrice === '' ||
      req.percentage === '';
    }

    const getFerielonn = async (lonnReq) => {
      if (notValid(lonnReq)) {
        return;
      }

      const resp = await axios.post('/lonn-api/ferielonn',lonnReq)
      .then(res => {
         setLonnData(res.data);
      })
     
    };
  
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = formData => {
      getFerielonn(formData);
    };

    return (    <div className="App">
    <header className="App-header">
      <div id="grid">
        
        <h1>{lonnData.sumLonn}</h1>
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleSubmit(onSubmit)}>
      <input type="number" placeholder="Timepris" {...register("hourPrice", {})} />
      <input type="number" placeholder="Fastlønn" {...register("fixedSalary", {})} />
      <input type="number" placeholder="Antall dager fri Juli" {...register("breakJuly", {})} />
      <input type="number" placeholder="Antall dager fri August" {...register("breakAugust", {})} />
      <input type="number" placeholder="Antall dager fri September" {...register("breakSeptember", {})} />
      <input type="text" placeholder="Provisjons prosent" {...register("percentage", {})} />

      <input title='Kalkuler' type="submit" />
    </form>
    </div>
    </header>
    </div>);

  }

  

  return (
      <Appen></Appen>
  );
}