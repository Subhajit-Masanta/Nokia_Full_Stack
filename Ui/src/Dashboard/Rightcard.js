import React, { useState, useEffect } from "react";
import "./Rightcard.css";
import hungryImage from "../utils/hungry.png";
import { API } from "../services/api";

function Rightcard() {
  const [monthlyWaste, setMonthlyWaste] = useState(0);
  const [todayWaste, setTodayWaste] = useState(0);
  const gramsPerPerson = 800; // 800g per person

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        // Fetch monthly waste
        const monthlyRes = await API.getMonthlyWaste();
        if (monthlyRes.data && monthlyRes.data.success && isMounted) {
          setMonthlyWaste((monthlyRes.data.data.total_quantity_kg || 0) * 1000);
        }
        // Fetch daily waste (from comparision API)
        const compRes = await API.getComparision();
        if (compRes.data && compRes.data.success && isMounted) {
          setTodayWaste(compRes.data.todayWeight || 0);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const peopleFedMonthly = Math.floor(monthlyWaste / gramsPerPerson);
  const peopleFedToday = Math.floor(todayWaste / gramsPerPerson);

  // Function to get color class based on people count
  const getColorClass = (peopleCount) => {
    if (peopleCount <= 50) return 'people-count-green';
    if (peopleCount <= 150) return 'people-count-yellow';
    return 'people-count-red';
  };

  // Function to get image CSS class based on threshold
  const getImageClass = () => {
    const maxPeople = Math.max(peopleFedMonthly, peopleFedToday);
    if (maxPeople <= 50) return 'impact-gif low-waste';
    if (maxPeople <= 150) return 'impact-gif moderate-waste';
    return 'impact-gif high-waste';
  };

  return (
    <div className="rightcard-custom" style={{ height: "100%" }}>
      <div className="gif-section">
        <img
          src={hungryImage}
          alt="People impact"
          className={getImageClass()}
        />
      </div>
      <div className="fed-section">
        <div className="fed-title">People could have been fed</div>
        <div className="fed-row">
          <div className="fed-col">
            <div className="fed-label">Today</div>
            <div className={`people-count ${getColorClass(peopleFedToday)}`}>
              {peopleFedToday}
            </div>
          </div>
          <div className="fed-col">
            <div className="fed-label">This month</div>
            <div className={`people-count ${getColorClass(peopleFedMonthly)}`}>
              {peopleFedMonthly}
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Rightcard;
