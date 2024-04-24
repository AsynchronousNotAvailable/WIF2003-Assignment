import React, {useState} from "react"; 
import DatePicker from "react-datepicker";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import "react-datepicker/dist/react-datepicker.css";

function TableDatePicker({column}){
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   function handleStartDateChange(date){
      setFilter(() => date);
   }
   function handleEndDateChange(date){
      setFilter(() => date);
   }
   const {filterValue, setFilter} = column
   return(
    <>
    <span>
    <DatePicker selected={filterValue} onChange={handleStartDateChange} dateFormat="dd/MM/YYYY"/>
        </span>
    
    </>
   ) 
}

export default TableDatePicker; 