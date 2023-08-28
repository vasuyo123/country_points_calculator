import React ,{ useState}  from 'react';
import { Link } from 'react-router-dom';
import './showdetails.css';
import Logo from '../Logo.png';

const ShowDetailsPage = ({ handleBackToMainPage }) => {

  const [showContactCard, setShowContactCard] = useState(false);

  const handleContactButtonClick = () => {
    setShowContactCard(!showContactCard);
  };
  return (
    <div style={{ color: 'white' }}>
      <div className="paragraph-container">
        <div className='header'>
          <div className="back-button">
            <Link to="/" className="back-link">Go Back</Link>
          </div>
          <div className="logo-container" >
            <img className="logo-image" src={Logo} alt="Logo" />
          </div>
        </div>
        <div style={{marginTop:'80px'}}>
          <h2>Country Points Calculator</h2>
          <p>Struggling to decide whether to relocate or not? Don't worry; you're not alone. Trust the “Country Point Calculator” to help you make an informed decision that perfectly aligns with your needs and preferences. This powerful tool considers factors like safety, work opportunities, education, healthcare, and more, allowing you to customize your “Current” and “Preferred” country comparison based on your unique priorities.

            The process is simple and user-friendly. First, you choose the critical aspects that will shape your relocation decision from a list of key factors. Next, you assign numerical weights (0 to 100) to each factor based on its importance to you. Higher weights indicate greater significance in your decision-making process.

            Once you've selected your factors and assigned weights, you can score your “Current” (where you presently residing) and “Preferred” (where you desire to move) countries, from 1 to 10 for each factor, indicating how well each country meets your preferences for that specific aspect.

            The “Country Points Calculator” then generates points for both countries (Current and Preferred) based on your assigned weights and scores for each factor. The points are calculated by multiplying the score by the assigned weight for each factor, enabling the calculator to assess the significance of each factor in determining the best living destination that aligns with your unique priorities and preferences.

            The tool offers flexibility and customization, allowing you to add or remove factors, adjust weights, and score each country for each factor based on your personal preferences. This ensures that your country comparison reflects your individual circumstances and aspirations accurately. With the power to personalize your choices, you can confidently make an informed decision about the best living destination that aligns perfectly with your unique needs and priorities.

            Consider making the relocation decision-making process a family activity by involving your kids and spouse. Share the “Country Point Calculator” tool with them and encourage them to weigh and score each factor based on their preferences. This allows everyone to explore the options and calculate points for both the "Current" and "Preferred" countries. It can be a fun and engaging way to include everyone's input in the decision-making process. Afterward, gather and analyze all the scores together to make an informed and well-rounded decision as a family. This way, everyone's perspectives and priorities are considered, ensuring that the chosen country is the best fit for your entire family's needs and aspirations.

            Should you wish to start fresh, the "Reset" button allows you to clear all selections and data, providing a clean slate for making new choices or adjustments.

            Whether you're considering a move for personal, education, or retirement reasons, the “Country Points Calculator” empowers you to make a well-informed decision that resonates with your values and objectives. By using this tool, you can gain valuable insights into the pros and cons of your “Current” and “Preferred” countries, making it easier to choose the best place to live based on your unique needs and preferences.
          </p>
          <h2>How To Use Country Points Calculator</h2>
          <p><h4>1.	Factors:</h4> Choose critical aspects influencing your relocation decision from a list of key factors like safety, work opportunities, education, healthcare, and more. clicking on this link would take the user to Factors description page. The Country Points Calculator offers predefined set of Factors; however, you also have the flexibility to add and customize additional factors by clicking the "Add" button and editing them to suit your preferences.
            <h4> 2.	Weights:</h4> Prioritize each factor by assigning a numerical weight from 0 to 100. Higher weight signifies greater importance. You can also assign the same weight to multiple factors if they hold equal significance for you. A weight of 0 indicates that the factor has no significance, effectively removing it from consideration. In such cases, the scores assigned to the countries become irrelevant, and the calculated points for the countries will be 0.
            <h4> 3.	Current Country Score:</h4> Evaluate your "Current" country, where you are presently residing, regardless of your nationality or citizenship, on a scale of 1 to 10 for each factor. Indicate how well the country currently meets your preferences for the given aspect. Assign a score of 1 to represent a low fit, while a score of 10 signifies a high fit with your preferences in your current place of residence.
            <h4> 4.	Preferred Country Score:</h4> Evaluate your "Preferred" country, where you desire to move or relocate, regardless of your nationality or citizenship, on a scale of 1 to 10 for each factor. Indicate how well this country meets your preferences for the given aspect. Assign a score of 1 to represent a low fit, while a score of 10 signifies a high fit with your preferences for your ideal or desired country.
            <h4> 5.	Current Country Points:</h4> The calculator generates points for the “Current” country based on your assigned weight and score for each factor. To calculate the points for each factor, the tool multiplies the score (on a scale of 1 to 10) by the weight (0 to 100) you assigned to that specific factor.
            <h4> 6.	Preferred Country Points: </h4>Similarly, it calculates points for the “Preferred” Country based on your assigned score and weight for each factor. To calculate the points for each factor, the tool multiplies the score (on a scale of 1 to 10) by the weight (0 to 100) you assigned to that specific factor.
            <h4> 7.	Total Points: </h4>The tool calculates the total points for both the "Current" and "Preferred" countries by adding up the individual points assigned to each factor for each country.
            <h4> 8.	Personalize:</h4> Add or remove factors, adjust weights, scores and make personalized choices for a tailored country comparison.
            <h4>9.	Recommended Country:</h4> Based on your individual priorities and preferences, the “Country Point Calculator” automatically calculates the total points for each country. By comparing the cumulative totals of your "Current" and "Preferred" countries, the tool recommends the best fit, known as the “Recommended Country”, that aligns with your needs and aspirations. It's worth noting that your "Current" country may emerge as a better fit than your "Preferred" country, depending on your selections. Please keep in mind that this tool provides a general comparison, and individual preferences may vary. To make well-informed decisions, we strongly advise conducting thorough research and considering your personal circumstances before finalizing any choices.
            <h4>10.	Reset:</h4> Start fresh by clicking the "Reset" button to clear all selections and data in the Country Points Calculator. A warning will be displayed before resetting the form.
          </p>
          <h2>Factor Description</h2>
          <p>The following text will be displayed when corresponding hyperlink clicked.
            Factor descriptions will be presented in a clear and organized tabular form, as outlined below.
            Below are the key factors supported by the “Country Points Calculator”, along with their descriptions. To customize your “Current” (where you are presently residing, regardless of your nationality or citizenship,) and “Preferred” country (where you desire to move or relocate, regardless of your nationality or citizenship) comparison, assign weights (0 to 100) to each factor based on its significance to you, and then score each country from 1 to 10. By doing so, the tool calculates points for both your "Current" and "Preferred" countries, helping you discover the best living destination that aligns with your individual priorities and preferences. The recommended country will be based on the points calculated, offering valuable insights for your relocation decision-making process.
          </p>

          <h2>Work</h2>

          <table className="sample-table">
            <tbody>
              <tr>
                <td>Work opportunities</td>
                <td>Availability of job openings and career prospects in your field of expertise.</td>
              </tr>
              <tr>
                <td>Career growth potential</td>
                <td>The possibility of advancing professionally and achieving higher positions in your career.</td>
              </tr>
              <tr>
                <td>Work-life balance</td>
                <td>The ability to maintain a healthy balance between your work and personal life.</td>
              </tr>
              <tr>
                <td>Commute to work</td>
                <td>The convenience and time taken to travel from your home to your workplace.</td>
              </tr>
              <tr>
                <td>Income from work</td>
                <td>The earnings and financial rewards derived from your employment.</td>
              </tr>
              <tr>
                <td>Financial stability</td>
                <td>Financial stability	The overall financial security and stability provided by your current or potential job.</td>
              </tr>
              <tr>
                <td>Income from work</td>
                <td>The earnings and financial rewards derived from your employment.</td>
              </tr>
              <tr>
                <td>Savings for retirement</td>
                <td>Savings for retirement	The ability to save and plan for your retirement through various financial instruments like Provident Fund (PF) or 401K.</td>
              </tr>
              <tr>
                <td>Taxation</td>
                <td>The taxation policies and implications on your income and savings.</td>
              </tr>
            </tbody>
          </table>

          <h3>Kids and Family</h3>

          <table className="sample-table">
            <tbody>
              <tr>
                <td>Kid’s education (K-12)</td>
                <td>The quality and accessibility of education for children in primary and secondary schools.</td>
              </tr>
              <tr>
                <td>Kid’s education (Bachelors)</td>
                <td>The availability and standards of undergraduate education for your children.</td>
              </tr>
              <tr>
                <td>Kid’s education (Masters)</td>
                <td>The availability and quality of postgraduate education options for your children.</td>
              </tr>
              <tr>
                <td>Availability of extracurricular activities</td>
                <td>The range of additional learning and recreational activities offered for children.</td>
              </tr>
              <tr>
                <td>Kid’s social life</td>
                <td>The opportunities for your children to engage and interact with peers and friends.</td>
              </tr>
              <tr>
                <td>Family social life</td>
                <td>The availability of social and community activities for the entire family.</td>
              </tr>
              <tr>
                <td>Cultural life</td>
                <td>The exposure to cultural events and opportunities to explore, embrace, and celebrate traditions in your culture.</td>
              </tr>
            </tbody>
          </table>

          <h3>Parents, In-Laws, and Extended Family</h3>

          <table className="sample-table">
            <tbody>
              <tr>
                <td>Parental care</td>
                <td>Parental care	The level of support and care you believe you could provide for your elderly parents if you were living in the same country compared to living abroad.</td>
              </tr>
              <tr>
                <td>In-Laws care</td>
                <td>In-Laws care	The level of support and care you believe you could provide for your elderly in-laws if you were living in the same country compared to living abroad.</td>
              </tr>
              <tr>
                <td>Parental compatibility</td>
                <td>The potential to maintain close connections and a fulfilling relationship with your parents.</td>
              </tr>
              <tr>
                <td>In-laws’ compatibility</td>
                <td>The potential to maintain close connections and a fulfilling relationship with your in-laws.</td>
              </tr>
              <tr>
                <td>Extended family compatibility</td>
                <td>The potential to maintain close connections and a fulfilling relationship with extended family members.</td>
              </tr>
            </tbody>
          </table>

          <h3>Healthcare</h3>

          <table className="sample-table">
            <tbody>
              <tr>
                <td>Quality health care facilities</td>
                <td>The availability and standard of medical facilities and services.</td>
              </tr>
              <tr>
                <td>Health insurance coverage	</td>
                <td>The accessibility and scope of health insurance plans.</td>
              </tr>
              <tr>
                <td>Health care affordability and medical expenses</td>
                <td>The cost of medical treatments and healthcare services.</td>
              </tr>
            </tbody>
          </table>

          <h3>Lifestyle</h3>
          <table className="sample-table">
            <tbody>
              <tr>
                <td>Cost of living</td>
                <td>The overall expense of living, including housing, food, utilities, and other essentials.</td>
              </tr>


              <tr>
                <td>Availability of food options</td>
                <td>	The range and accessibility of preferred food choices.</td>
              </tr>
              <tr>
                <td>Affordability of domestic help</td>
                <td>The cost of hiring and managing domestic help like maids, drivers, etc.</td>
              </tr>
              <tr>
                <td>Affordability of luxury living</td>
                <td>	The cost of maintaining a higher standard of living and luxurious amenities.</td>
              </tr>
              <tr>
                <td>Recreation and leisure activities	</td>
                <td>The sense of pride and satisfaction in your living environment.</td>
              </tr>
              <tr>
                <td>Living with pride</td>
                <td>	The availability of enjoyable and recreational activities.</td>
              </tr>
              <tr>
                <td>Autonomy and personal space	</td>
                <td>The ability to live life with privacy and independence.</td>
              </tr>
              <tr>
                <td>Personal fulfillment</td>
                <td>	The degree of fulfillment and contentment you experience in your lifestyle choices.</td>
              </tr>
              <tr>
                <td>Personal preference	</td>
                <td>A customizable factor to accommodate any additional personal preferences.</td>
              </tr>
            </tbody>
          </table>

          <h3>Women</h3>
          <table className="sample-table">
            <tbody>
              <tr>
                <td>Gender equality	</td>
                <td>The level of gender equality and empowerment for women in society.</td>
              </tr>
              <tr>
                <td>Women safety	</td>
                <td>The safety and security measures in place for women.</td>
              </tr>
              <tr>
                <td>Women healthcare	</td>
                <td>The accessibility and quality of healthcare services catering to women's specific needs.</td>
              </tr>
              <tr>
                <td>Maternity and parental leave policies	</td>
                <td>The policies and support for maternity and parental leave for women.</td>
              </tr>
              <tr>
                <td>Professional growth for women.</td>
                <td>The opportunities and support for women's career advancement</td>
              </tr>
            </tbody>
          </table>

          <h3>Retirement</h3>
          <table className="sample-table">
            <tbody>
              <tr>
                <td>Government benefits</td>
                <td>The range of government benefits and support tailored for retirees, encompassing various aspects such as senior ticket reservations in public transport and other exclusive privileges.</td>
              </tr>
              <tr>
                <td>Health insurance coverage	</td>
                <td>The accessibility and scope of health insurance plans for retirees.</td>
              </tr>
              <tr>
                <td>Access to senior care services</td>
                <td>	The availability of care and services for senior citizens.</td>
              </tr>
              <tr>
                <td>Health care affordability and medical expenses</td>
                <td>The cost of medical treatments and healthcare services for retirees.</td>
              </tr>
              <tr>
                <td>Cost of living for retirees</td>
                <td>The overall expense of living for retired individuals.</td>
              </tr>
              <tr>
                <td>Recreational and leisure activities for seniors</td>
                <td>The availability of enjoyable and recreational activities for seniors.</td>
              </tr>
              <tr>
                <td>Taxation for retirees</td>
                <td>The taxation policies and implications for retirees' income and savings.</td>
              </tr>
              <tr>
                <td>Proximity to family and friends</td>
                <td>The proximity to loved ones and support networks for retirees.</td>
              </tr>
            </tbody>
          </table>

          <h3>Governance</h3>

          <table className="sample-table">
            <tbody>
              <tr>
                <td>Political stability and governance</td>
                <td>The stability of the political environment and the effectiveness of governance.</td>
              </tr>
              <tr>
                <td>Public transportation1</td>
                <td>The availability and efficiency of public transportation systems.</td>
              </tr>
              <tr>
                <td>Quality of infrastructure</td>
                <td>The standard and reliability of roads, utilities, and other infrastructure.</td>
              </tr>
              <tr>
                <td>Personal safety and security</td>
                <td>The level of safety and security provided by law enforcement and societal factors.</td>
              </tr>
              <tr>
                <td>Pollution</td>
                <td>Pollution	The level of pollution and environmental concerns in the area.</td>
              </tr>
              <tr>
                <td>Climate and weather conditions	</td>
                <td>The prevailing climate and weather patterns in the region.</td>
              </tr>
            </tbody>
          </table>

          <h3>Other Income and Savings</h3>
          <table className="sample-table">
            <tbody>
              <tr>
                <td>Investment opportunities</td>
                <td>The potential for profitable investments and financial growth.</td>
              </tr>
              <tr>
                <td>Other income potential</td>
                <td>The prospects of additional income sources beyond regular work.</td>
              </tr>
              <tr>
                <td>Property/investment management</td>
                <td>The efficiency of managing property or other investments.</td>
              </tr>
              <tr>
                <td>Overall savings</td>
                <td>Overall savings	The ability to save and accumulate wealth through various means.</td>
              </tr>
            </tbody>
          </table>
          <div className={`footer`}>
          <button className="contact-button" onClick={handleContactButtonClick}>
            <i className="fa-regular fa-address-book" style={{ marginRight: '8px' }}></i>Contact Us
          </button>
          {showContactCard && (
            <div className="contact-card">
              <div className="card-header">
                <h3 style={{color:'black'}}>Contact Us</h3>
                <button className="close-icon" onClick={handleContactButtonClick}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="card-content">
                <p style={{color:'black'}}>Email: <a href="mailto:pickopia.help@gmail.com">pickopia.help@gmail.com</a></p>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailsPage;