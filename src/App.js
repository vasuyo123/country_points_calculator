import React, { useState } from 'react';
import './App.css';
import DataTable from './Datatable/DataTable';
import Logo from './Logo.png';
import { factorOptions } from './factorOptions';
import ShowDetailsPageContent from './showdetails/showdetails';
import { Outlet, Link } from 'react-router-dom';





const App = () => {
  const initialRow = {
    factor: '',
    // preferedCountry: '',
    weights: 0,
    usPoints: 0,
    indiaPoints: 0,
    currentcountry: 0,
    foreigncountry: 0,
    canAddNew: false,
  };


  const [tableData, setTableData] = useState([
    { ...initialRow },
    { ...initialRow, factor: '', canAddNew: true },
    { ...initialRow, factor: '', canAddNew: true },
  ]);

  const [selectedFactors, setSelectedFactors] = useState(
    tableData.map(() => factorOptions[0])
  );

  const [selectedSubfactors, setSelectedSubfactors] = useState(
    tableData.map(() => factorOptions[0].subOptions[0])
  );


  const handleInputChange = (index, field, value) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value;
    setTableData(updatedData);
  };

  const handleAddRow = (index) => {
    const newRow = {
      factor: '',
      Subfactor: '',
      weights: 0,
      currentcountry: 0,
      foreigncountry: 0,
      usPoints: 0,
      indiaPoints: 0,
      canAddNew: true,
    };

    const newSelectedFactors = [...selectedFactors];
    const newSelectedSubfactors = [...selectedSubfactors];

    console.log(index)
    if (index >= 0 && index < newSelectedFactors.length - 1) {
      newSelectedFactors[index].canAddNew = false;
      newSelectedFactors.push({ value: 'Select Factor', subOptions: ['Select Subfactor'] });

      newSelectedSubfactors[index] = 'Select Subfactor';
      newSelectedSubfactors.push('Select Subfactor');
    }

    setSelectedFactors(newSelectedFactors);
    setSelectedSubfactors(newSelectedSubfactors);
    const updatedData = [...tableData];
    updatedData.push(newRow);

    if (index >= 0 && index < updatedData.length - 1) {
      updatedData[index].canAddNew = false;
    }

    setTableData(updatedData);
  };
  const getRecommendedCountry = () => {
    const currentCountryPoints = calculateTotalPoints('currentcountry');
    const foreignCountryPoints = calculateTotalPoints('foreigncountry');

    if (foreignCountryPoints > currentCountryPoints) {
      return 'Foreign Country';
    } else {
      return 'Current Country';
    }
  };

  const [showRecommendedCountry, setShowRecommendedCountry] = useState(false);




  const calculateTotalPoints = (field) => {
    return tableData.reduce((acc, item) => acc + parseInt(item[field]), 0);
  };


  const handleRemoveRow = (index) => {
    if (tableData.length === 1) {
      alert("Cannot remove the first row!");
      return;
    }

    const updatedData = [...tableData];
    updatedData.splice(index, 1);


    if (index - 1 >= 0) {
      updatedData[index - 1].canAddNew = true;
    }

    setTableData(updatedData);
  };




  const [showResetWarning, setShowResetWarning] = useState(false);

  const handleShowResetWarning = () => {
    setShowResetWarning(true);
  };

  const handleCancelReset = () => {
    setShowResetWarning(false);
  };

  const handleConfirmReset = () => {
    const resetData = tableData.map((item, index) => {
      if (index === 0) {
        return {
          ...item,
          factor: '',
          subfactor: '',
          weights: 0,
          currentcountry: 0,
          foreigncountry: 0,
          usPoints: 0,
          indiaPoints: 0,
        };
      } else {
        const selectedFactor = factorOptions[0]; 
        return {
          ...item,
          factor: selectedFactor.value,
          subfactor: selectedFactor.subOptions[0], 
          weights: 0,
          currentcountry: 0,
          foreigncountry: 0,
          usPoints: 0,
          indiaPoints: 0,
          canAddNew: index === tableData.length - 1,
        };
      }
    });

    setSelectedFactors(resetData.map(() => factorOptions[0])); 
    setSelectedSubfactors(resetData.map(() => factorOptions[0].subOptions[0])); 
    setTableData(resetData);
    setShowRecommendedCountry(false);
    setShowResetWarning(false); 
  };


  // const [isAtPageEnd, setIsAtPageEnd] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
  //     setIsAtPageEnd(scrolledToBottom);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


  const [showDetails, setShowDetails] = useState(false);

  const handleBackToMainPage = () => {
    setShowDetails(false);
  };

  const [showContactCard, setShowContactCard] = useState(false);

  const handleContactButtonClick = () => {
    setShowContactCard(!showContactCard);
  };

  const [showMessageModal, setShowMessageModal] = useState(false);


  const handleShowRecommendedCountry = () => {
    const totalCurrentCountryPoints = calculateTotalPoints('currentcountry');
    const totalForeignCountryPoints = calculateTotalPoints('foreigncountry');

    if (totalCurrentCountryPoints === 0 && totalForeignCountryPoints === 0) {
      setShowMessageModal(true);
      return;
    }

    setShowRecommendedCountry(true);
  };


  return (
    <div className="app" >
      <div className="logo-container" >
        <img className="logo-image" src={Logo} alt="Logo" />
      </div>
      <div className="main-content" style={{ marginTop: "50px" }}>
        <h1 className='heading'>Country Points Calculator</h1>
        {showDetails ? (
          <ShowDetailsPageContent className="details-page" handleBackToMainPage={handleBackToMainPage} />
        ) : (
          <div className="main-content">
            <p className="main-content-text">
              Struggling to decide whether to relocate or not? Don't worry; you're not alone.
              Trust the “Country Point Calculator” to help you make an informed decision that
              perfectly aligns with your needs and preferences. This powerful tool considers factors
              like safety, work opportunities, education, healthcare, and more, allowing you to
              customize your “Current” and “Preferred” country comparison based on your unique
              priorities.....<Link to="/details" className="detail-link">Click for more details</Link>
            </p>

          </div>
        )}
        <Outlet />
        <div>

          <button className="mainreset" onClick={handleShowResetWarning}>Reset</button>
          <div className="reset-warning" style={{ display: showResetWarning ? 'block' : 'none', zIndex: 1000 }}>
            {showResetWarning && (
              <div className="reset-warning-box">
                <button className="close-icon" onClick={handleCancelReset}>
                  X
                </button>
                <h4 className="warning-head">Warning:</h4>
                <p className="warning-text">Resetting the form will clear all the selections you have made.</p>
                <p className="warning-text">Are you sure you want to proceed with resetting the form?</p>
                <div className="button-container">
                  <button className="reset-button keep-button" onClick={handleCancelReset}>Keep Selections</button>
                  <button className="reset-button reset-form-button" onClick={handleConfirmReset}>Reset</button>
                </div>
              </div>
            )}
          </div>


        </div>
        <div className="table-container">
          <DataTable
            headings={[

              // 'Preferred Country',
              'Weights',
              'current country score',
              'Foreign country score',
              'Current Country Points',
              'Foreign Country Points',
              'Actions',
            ]}
            data={tableData}
            selectedFactors={selectedFactors}
            selectedSubfactors={selectedSubfactors}
            onChange={handleInputChange}
            onAddRow={handleAddRow}
            onRemoveRow={handleRemoveRow}
            setTableData={setTableData}
          />

        </div>
        <div className="recommend">
          <button
            className="recommend-button"
            onClick={handleShowRecommendedCountry}
          >
            Show Recommended Country
          </button>
          {showRecommendedCountry && (
            <div className="recommend-card">
              <p>The Country Points Calculator recommends your <span className="highlight">{getRecommendedCountry()}</span> as the best living destination
                based on your selected factors, weights, and scores. Please note that the tool provides a general comparison,
                and individual preferences may vary. It's essential to conduct thorough research and consider personal circumstances before making any decisions.</p>
            </div>
          )}
          {showMessageModal && (
            <div className="message-modal">
              <div className="message-modal-content">
                {/* <button className="close-icon-reccommend" onClick={() => setShowMessageModal(false)}>
                  X
                </button> */}
                <p>Please set values before trying to show the recommended country.</p>
                <button className='close-btn-recommend' onClick={() => setShowMessageModal(false)}>Close</button>
              </div>
            </div>
          )}
        </div>

        <div className={`footer`}>
          <button className="contact-button" onClick={handleContactButtonClick}>
            <i className="fa-regular fa-address-book" style={{ marginRight: '8px' }}></i>Contact Us
          </button>
          {showContactCard && (
            <div className="contact-card">
              <div className="card-header">
                <h3>Contact Us</h3>
                <button className="close-icon" onClick={handleContactButtonClick}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="card-content">
                <p>Email: <a href="mailto:avinash.paul2031@gmail.com">avinash.paul2031@gmail.com</a></p>
                <p>Phone: +1 (123) 456-7890</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;