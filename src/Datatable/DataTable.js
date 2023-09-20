import React, { useState } from 'react';
import './DataTable.css';
import infoContent from '../info.json';
import { factorOptions } from '../factorOptions';


const DataTable = ({ headings, data, onChange, onAddRow, onRemoveRow, setTableData ,setShowRecommendedCountry}) => {
  const calculateTotalPoints = () => {
    let indiaPoints = 0;
    let usPoints = 0;
    data.forEach((item) => {
      const weights = parseFloat(item.weights) || 0;
      const currentCountryScore = parseInt(item.currentcountry) || 0;
      const preferredCountryScore = parseInt(item.foreigncountry) || 0;
  
      indiaPoints += weights * currentCountryScore;
      usPoints += weights * preferredCountryScore;
    });
  
    return { indiaPoints, usPoints };
  };
  
  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    if (field === 'weights') {
      updatedData[index][field] = parseFloat(value);
    } else {
      updatedData[index][field] = parseInt(value);
    }
    setTableData(updatedData);
  };
  
  const [selectedFactors, setSelectedFactors] = useState(data.map(() => factorOptions[0]));

  const handleFactorChange = (index, value) => {
    const selectedOption = factorOptions.find((option) => option.value === value);

    setSelectedFactors((prevSelectedFactors) => {
      const newSelectedFactors = [...prevSelectedFactors];
      newSelectedFactors[index] = selectedOption;
      return newSelectedFactors;
    });

    onChange(index, 'factor', value);
    onChange(index, 'subfactor', selectedOption.subOptions[0]);
    setShowRecommendedCountry(false)
  };

  const handleSubfactorChange = (index, value) => {
    onChange(index, 'subfactor', value);
  };

  function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s|-)\S/g, function (match) {
      return match.toUpperCase();
    });
  }


  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>
              Factor
              <span className="info-icon tooltip">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="White" strokeWidth="2" fill="none" />
                  <text x="50%" y="75%" textAnchor="middle" fontSize="16" fill="White">
                    i
                  </text>
                </svg>
                <div className="tooltiptext">{infoContent['Factor']}</div>
              </span>
            </th>
            <th>
              Subfactor
              <span className="info-icon tooltip">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="White" strokeWidth="2" fill="none" />
                  <text x="50%" y="75%" textAnchor="middle" fontSize="16" fill="White">
                    i
                  </text>
                </svg>
                <div className="tooltiptext">{infoContent['Subfactor']}</div>
              </span>
            </th>
            {headings.map((heading, index) => (
              <th key={index}>
                {toTitleCase(heading)}
                <span className="info-icon tooltip">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="White" strokeWidth="2" fill="none" />
                    <text x="50%" y="75%" textAnchor="middle" fontSize="16" fill="White">
                      i
                    </text>
                  </svg>
                  <div className="tooltiptext">
                    {infoContent[heading]}
                  </div>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <select
                  value={item.factor}
                  onChange={(e) => handleFactorChange(index, e.target.value)}
                  className="dropdown-select"
                >
                  {factorOptions.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>{option.value}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className='subfactor-dropdown dropdown-select'
                  defaultValue={item.subfactor}
                  onChange={(e) => handleSubfactorChange(index, e.target.value)}
                >
                  {(item.factor !== 'Select Factor' && selectedFactors[selectedFactors.findIndex(x => x.value ===item.factor)]) ? (
                    selectedFactors[selectedFactors.findIndex(x => x.value ===item.factor)].subOptions.map((subOption, subOptionIndex) => (
                      <option  selected={subOption == item.subfactor} key={subOptionIndex} value={subOption}>{subOption}</option>
                    ))
                  ) : <option key={0} value={"Select Subfactor"}>{"Select Subfactor"}</option>}
                </select>
              </td>
              <td>
                <div className="inc-dec-container">
                  <button className="dec" onClick={() => onChange(index, 'weights', Math.max(0, parseInt(item.weights) - 1))}>
                    <i className="fas fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    value={item.weights}
                    min={1}
                    max={100}
                    step={1}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
                        onChange(index, 'weights', newValue);
                      }
                    }}
                  />
                  <button className="inc" onClick={() => onChange(index, 'weights', Math.min(100, parseInt(item.weights) + 1))}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </td>
              <td>
                <div className="inc-dec-container">
                  <button className="dec" onClick={() => onChange(index, 'currentcountry', Math.max(1, parseInt(item.currentcountry) - 1))}>
                    <i className="fas fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    value={item.currentcountry}
                    min={1}
                    max={10}
                    step={1}
                    onChange={(e) => onChange(index, 'currentcountry', e.target.value)}
                  />
                  <button className="inc" onClick={() => onChange(index, 'currentcountry', Math.min(10, parseInt(item.currentcountry) + 1))}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </td>
              <td>
                <div className="inc-dec-container">
                  <button className="dec" onClick={() => onChange(index, 'foreigncountry', Math.max(1, parseInt(item.foreigncountry) - 1))}>
                    <i className="fas fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    value={item.foreigncountry}
                    min={1}
                    max={10}
                    step={1}
                    onChange={(e) => onChange(index, 'foreigncountry', e.target.value)}
                  />
                  <button className="inc" onClick={() => onChange(index, 'foreigncountry', Math.min(10, parseInt(item.foreigncountry) + 1))}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </td>

              <td>{(parseInt(item.weights) || 0) * (parseInt(item.currentcountry) || 0)}</td>
              <td>{(parseInt(item.weights) || 0) * (parseInt(item.foreigncountry) || 0)}</td>


              <td>
                {index === data.length - 1 ? (
                  <>
                    <button className="add" onClick={() => onAddRow(index)}>
                      Add New
                    </button>
                    <button className="remove" onClick={() => onRemoveRow(index)}>
                      Remove
                    </button>
                  </>
                ) : (
                  <button className="remove" onClick={() => onRemoveRow(index)}>
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ textAlign: 'end' }}><b>Total Points</b></td>
            <td>{calculateTotalPoints().indiaPoints}</td>
            <td>{calculateTotalPoints().usPoints}</td>

          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DataTable;