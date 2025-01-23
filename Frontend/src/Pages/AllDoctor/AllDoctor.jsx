import React, { useEffect, useState } from 'react';
import './AllDoctor.css';
import Doctorcard from '../../Components/doctorcard/doctorcard';
import axios from 'axios';
import { IoSearch } from 'react-icons/io5';

const AllDoctor = () => {
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [activeCategory, setActiveCategory] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctor/getAllDoctors');
      setData(response.data.doctors); 
      setFilteredData(response.data.doctors); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const filterByCategory = (category) => {
    setActiveCategory(category); 
    if (category === '') {
      setFilteredData(data); 
    } else {
      const filtered = data.filter((doctor) => doctor.specialization === category);
      setFilteredData(filtered);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const searched = data.filter((doctor) =>
      doctor.firstName.toLowerCase().includes(query)
    );
    setFilteredData(searched);
  };

  return (
    <div className="continer">
      <div className="all-doctors-div">
        <div className="center-heading">
          <h1>Top Doctors To Book</h1>
          <p>Simply Browse Through the list of all Doctors</p>
          <div className="search-div">
            <input
              className="search-box"
              type="text"
              placeholder="Search Doctor By Name"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button>
              <IoSearch />
            </button>
          </div>
          <div className="category-buttons">
            <button
              className={activeCategory === '' ? 'active' : ''}
              onClick={() => filterByCategory('')}
            >
              All
            </button>
            <button
              className={activeCategory === 'Cardiology' ? 'active' : ''}
              onClick={() => filterByCategory('Cardiology')}
            >
              Cardiologist
            </button>
            <button
              className={activeCategory === 'Dermatologist' ? 'active' : ''}
              onClick={() => filterByCategory('Dermatologist')}
            >
              Dermatologist
            </button>
            <button
              className={activeCategory === 'Neurologist' ? 'active' : ''}
              onClick={() => filterByCategory('Neurologist')}
            >
              Neurologist
            </button>
            <button
              className={activeCategory === 'Gynecologist' ? 'active' : ''}
              onClick={() => filterByCategory('Gynecologist')}
            >
              Gynecologist
            </button>
            <button
              className={activeCategory === 'Pediatricians' ? 'active' : ''}
              onClick={() => filterByCategory('Pediatricians')}
            >
              Pediatricians
            </button>
            <button
              className={activeCategory === 'Gastroenterologist' ? 'active' : ''}
              onClick={() => filterByCategory('Gastroenterologist')}
            >
              Gastroenterologist
            </button>
          </div>
        </div>
        <div className="doctor-section">
          {filteredData.length > 0 ? (
            filteredData.map((item) => <Doctorcard key={item.id} item={item} />)
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDoctor;
