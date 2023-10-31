import React, { useState , useEffect } from 'react';
import './App.css';
import DataTable from './Datatable/DataTable';
import Logo from './Logo.png';
import { factorOptions } from './factorOptions';
import ShowDetailsPageContent from './showdetails/showdetails';
import { Outlet, Link } from 'react-router-dom';
import RemoveRowAlert from './RemoveRowAlert';
import ModalWrapper from './ModalWrapper';


const App = () => {
  const initialRow = {
    factor: '',
    subfactor:'',
    weights: 0,
    currentcountry: 0,
    foreigncountry: 0,
    usPoints: 0,
    indiaPoints: 0,
    canAddNew: false,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  const [tableData, setTableData] = useState([
        { ...initialRow },
         { ...initialRow, factor: '',subfactor:'', canAddNew: true },
       ]);
 
  const handleSaveDataToStorage = () => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  };

  useEffect(() => {
    handleSaveDataToStorage();
  }, [tableData]);

  useEffect(() => {
    setSelectedSubfactors(tableData.map(() => factorOptions[0].subOptions[0]));
  }, [tableData]);
  
  

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
    setShowRecommendedCountry(false)
    setAlertContent(false)
    setShowAlertBox(false)
  };
  
  const handleAddRow = (index) => {
    setShowRecommendedCountry(false)
    const newRow = {
      factor: '',
      subfactor: '',
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
    setSelectedSubfactors((prevSubfactors) => {
      const newSubfactors = [...prevSubfactors];
      newSubfactors.splice(index + 1, 0, 0); 
      return newSubfactors;
    });

    if (index >= 0 && index < updatedData.length - 1) {
      updatedData[index].canAddNew = false;
    }

    setTableData(updatedData);
  };
  
  const getRecommendedCountry = () => {
  const totalPoints = calculateTotalPoints();
  const totalindiaPoints = calculateTotalPoints('currentcountry');
  const totalusPoints = calculateTotalPoints('foreigncountry');
  if (totalPoints.indiaPoints < totalPoints.usPoints) {
    
    return 'Preferred Country';
  } else {
    return 'Current Country';
  }
};

  

  const [showRecommendedCountry, setShowRecommendedCountry] = useState(false);

  
  const calculateTotalPoints = () => {
    let indiaPoints = 0;
    let usPoints = 0;
    tableData.forEach((item) => {
      const weights = parseFloat(item.weights) || 0;
      const currentCountryScore = parseInt(item.currentcountry) || 0;
      const preferredCountryScore = parseInt(item.foreigncountry) || 0;
  
      indiaPoints += weights * currentCountryScore;
      usPoints += weights * preferredCountryScore;
    });
  
    return { indiaPoints, usPoints };
  };
  

  const [showRemoveRowAlert, setShowRemoveRowAlert] = useState(false);

  const handleRemoveRow = (index) => {
    if (tableData.length === 1) {
      setShowRemoveRowAlert(true);
      return;
    }
  
       const updatedData = [...tableData];
    updatedData.splice(index, 1);
    console.log(tableData,'tableData')
   
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
    setShowAlertBox(false);
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleBackToMainPage = () => {
    setShowDetails(false);
  };

  const [showContactCard, setShowContactCard] = useState(false);

  const handleContactButtonClick = () => {
    setShowContactCard(!showContactCard);
  };

  const [showMessageModal, setShowMessageModal] = useState(false);


  const [showAlertBox, setShowAlertBox] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const handleShowRecommendedCountry = () => {
    const hasUnselectedFactors = tableData.some(
      item => item.factor === 'Select Factor' || item.subfactor === 'Select Subfactor' || item.factor === '' || item.subfactor === ''
    );  
    console.log(tableData);
    if (hasUnselectedFactors) {
      setShowMessageModal(true);
      return;
    }
  
  
    const total = calculateTotalPoints();
    console.log(total);
  
    if (total.indiaPoints === 0 && total.usPoints === 0) {
      setShowMessageModal(true);
      return;
    }
    
  
    if (total.indiaPoints === total.usPoints) {
      const alertContent = `The “Country Points Calculator” recommends either country (Current/Preferred) as the best living destination based on your selected factors, weights, and scores.
      Please note that the tool provides a general comparison, and individual preferences may vary.
      It's essential to conduct thorough research and consider personal circumstances before making any decisions.`;
      setShowAlertBox(true);
      setAlertContent(alertContent);
      setShowRecommendedCountry(false); 
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
              priorities.The process is simple and user-friendly.&nbsp;<Link  onClick={openModal} className="detail-link">Click for more details</Link>
            </p>

            {isModalOpen && (
        <ModalWrapper>
          <ShowDetailsPageContent onClose={closeModal} />
        </ModalWrapper>
      )}

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
              'Weights',
              'Current country score',
              'Preferred country score',
              'Current Country Points',
              'Preferred Country Points',
              'Actions',
            ]}
            data={tableData}
            selectedFactors={selectedFactors}
            selectedSubfactors={selectedSubfactors}
            onChange={handleInputChange}
            onAddRow={handleAddRow}
            onRemoveRow={handleRemoveRow}
            setTableData={setTableData}
            setShowRecommendedCountry={setShowRecommendedCountry}
                      />

        </div>
        <div className="recommend">
          <button
            className="recommend-button"
            onClick={handleShowRecommendedCountry}
          >
            Show Recommended Country
          </button>
          { showRecommendedCountry && !showAlertBox && (
            <div className="recommend-card">
              <p>The “Country Points Calculator” recommends your <span className="highlight">{getRecommendedCountry()}</span> as the best living destination
                based on your selected factors, weights, and scores. <br></br>Please note that the tool provides a general comparison,
                and individual preferences may vary. <br></br> It's essential to conduct thorough research and consider personal circumstances before making any decisions.</p>
            </div>
          )}
          {showAlertBox && (
            <div className="alert-box">
              <div className="alert-content">
                {alertContent}<br></br><br></br>
              </div>
            </div>
          )}
          {showMessageModal && (
            <div className="message-modal">
              <div className="message-modal-content">
                <p>Please make selections.</p>
                <button className='close-btn-recommend' onClick={() => setShowMessageModal(false)}>Close</button>
              </div>
            </div>
          )}
        </div>


        <div className={`footer`}>
          <button className="contact-button" onClick={handleContactButtonClick}>
            <i className="fa-regular fa-address-book"></i>Contact Us
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
                <p>Email: <a href="mailto:pickopia.help@gmail.com">pickopia.help@gmail.com</a></p>
              </div>
            </div>
          )}
        </div>

      </div>
      {showRemoveRowAlert && (
        <RemoveRowAlert
          message="Cannot remove the first row!"
          onClose={() => setShowRemoveRowAlert(false)}
        />
      )}
    </div>
  );
};

export default App;