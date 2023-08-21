import React, { useState } from 'react';
import './DataTable.css';
import infoContent from '../info.json';
import { factorOptions } from '../factorOptions';


const DataTable = ({ headings, data, onChange, onAddRow, onRemoveRow, setTableData }) => {
  const calculateTotalPoints = () => {
    return data.reduce(
      (acc, item) => ({
        currentCountryPoints: acc.currentCountryPoints + item.weights * item.currentcountry,
        foreignCountryPoints: acc.foreignCountryPoints + item.weights * item.foreigncountry,
      }),
      { currentCountryPoints: 0, foreignCountryPoints: 0 }
    );
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
                &#128712;
                <div className="tooltiptext">{infoContent['Factor']}</div>
              </span>
            </th>
            <th>
              Subfactor
              <span className="info-icon tooltip">
                &#128712;
                <div className="tooltiptext">{infoContent['Subfactor']}</div>
              </span>
            </th>
            {headings.map((heading, index) => (
              <th key={index}>
                {toTitleCase(heading)}
                <span className="info-icon tooltip">
                  &#128712;
                  <div className="tooltiptext">
                    {infoContent[heading]}
                    console.log(tooltipContent[heading])
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
                  value={item.subfactor}
                  onChange={(e) => handleSubfactorChange(index, e.target.value)}
                >
                  {(item.factor !== 'Select Factor' && selectedFactors[index]) ? (
                    selectedFactors[index].subOptions.map((subOption, subOptionIndex) => (
                      <option key={subOptionIndex} value={subOption}>{subOption}</option>
                    ))
                  ) : <option key={0} value={"Select Subfactor"}>{"select Subfactor"}</option>}
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
                    onChange={(e) => handleInputChange(index, 'currentcountry', e.target.value)}
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
                    onChange={(e) => handleInputChange(index, 'foreigncountry', e.target.value)}
                  />
                  <button className="inc" onClick={() => onChange(index, 'foreigncountry', Math.min(10, parseInt(item.foreigncountry) + 1))}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </td>

              <td>{item.weights * item.currentcountry}</td>
              <td>{item.weights * item.foreigncountry}</td>

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
            <td>{calculateTotalPoints().currentCountryPoints}</td>
            <td>{calculateTotalPoints().foreignCountryPoints}</td>

          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DataTable;