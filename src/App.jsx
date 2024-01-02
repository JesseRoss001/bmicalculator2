import './App.css';
import myGif from '/Create.png';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faWalking, faHeartbeat, faExclamationTriangle, faWeight } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
const InfoBox = ({ bmi }) => {
  let content;
  if (bmi < 18.5) {
    content = (
      <ul className="info-list">
        <li><FontAwesomeIcon icon={faExclamationTriangle} /> Elevated risk of malnutrition.</li>
        <li><FontAwesomeIcon icon={faWalking} /> Possible immune system weakening.</li>
        <li><FontAwesomeIcon icon={faAppleAlt} /> Potential for bone density loss.</li>
      </ul>
    );
  } else if (bmi < 24.9) {
    content = (
      <ul className="info-list">
        <li><FontAwesomeIcon icon={faWalking} /> Lower health risk.</li>
        <li><FontAwesomeIcon icon={faHeartbeat} /> Maintain a balanced diet.</li>
        <li><FontAwesomeIcon icon={faAppleAlt} /> Regular exercise recommended.</li>
      </ul>
    );
  } else if (bmi < 29.9) {
    content = (
      <ul className="info-list">
        <li><FontAwesomeIcon icon={faHeartbeat} /> Increased risk for heart conditions.</li>
        <li><FontAwesomeIcon icon={faWeight} /> Higher likelihood of high blood pressure.</li>
        <li><FontAwesomeIcon icon={faExclamationTriangle} /> Potential for type 2 diabetes.</li>
      </ul>
    );
  } else if (bmi < 34.9) {
    content = (
      <ul className="info-list">
        <li><FontAwesomeIcon icon={faWeight} /> Higher risk of heart disease and stroke.</li>
        <li><FontAwesomeIcon icon={faExclamationTriangle} /> May lead to breathing problems and sleep apnea.</li>
        <li><FontAwesomeIcon icon={faExclamationTriangle} /> Increased chance of gallbladder disease.</li>
      </ul>
    );
  } else {
    content = (
      <ul className="info-list">
        <li><FontAwesomeIcon icon={faExclamationTriangle} /> Critical risk for cardiovascular diseases.</li>
        <li><FontAwesomeIcon icon={faWeight} /> Severe strain on joints and bones.</li>
        <li><FontAwesomeIcon icon={faHeartbeat} /> Elevated risk for certain cancers.</li>
      </ul>
    );
  }

  return <div className={`info-box ${bmi ? 'visible' : ''}`}>{content}</div>;
};

function App() {
  const appFadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });
  const [weight, setWeight] = useState('');
  const [extraWeight, setExtraWeight] = useState(''); // for pounds when weight is in stones
  const [height, setHeight] = useState('');
  const [extraHeight, setExtraHeight] = useState(''); // for inches when height is in feet
  const [bmi, setBmi] = useState(null);
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg', 'lbs', 'st'
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm', 'in', 'ft'
  const [sliderBmi, setSliderBmi] = useState(22); // Example starting point
  const handleUnitChange = (e, type) => {
    if (type === 'weight') {
      setWeightUnit(e.target.value);
      setWeight('');
      setExtraWeight('');
    } else if (type === 'height') {
      setHeightUnit(e.target.value);
      setHeight('');
      setExtraHeight('');
    }
  };

  const convertWeightToKg = (weight, extraWeight, unit) => {
    switch (unit) {
      case 'lbs':
        return weight * 0.453592;
      case 'st':
        return weight * 6.35029 + extraWeight * 0.453592;
      default:
        return weight; // kg
    }
  };

  const convertHeightToCm = (height, extraHeight, unit) => {
    switch (unit) {
      case 'in':
        return height * 2.54;
      case 'ft':
        return height * 30.48 + extraHeight * 2.54;
      default:
        return height; // cm
    }
  };

  const calculateBmi = (e) => {
    e.preventDefault();
    let convertedWeight = convertWeightToKg(weight, extraWeight, weightUnit);
    let convertedHeight = convertHeightToCm(height, extraHeight, heightUnit);
    let bmiValue = convertedWeight / (convertedHeight / 100) ** 2;
    setBmi(bmiValue.toFixed(2));
  };

  return (
    <animated.div style={appFadeIn} className="background-container pb-5 pt-4 row g-0">

          <div className="col-10 col-md-8 col-lg-6 container ms-3 me-3 mt-3 glass-card">
      <h1>BMI Slider</h1>
      <div className="bmi-slider-value">
  {`${sliderBmi}`}
</div>
      <Slider
  defaultValue={22}
  min={10}
  max={40}
  step={0.1}
  onChange={val => setSliderBmi(val)}
  className="slider"
  thumbClassName="thumb"
  trackClassName={(index, value) => index === 0 ? 'track0' : 'track'}
/>
      <InfoBox bmi={sliderBmi} />

      {/* Rest of your form goes here... */}
    </div>
    <div className="col-10 col-md-8 col-lg-6 container ms-3 me-3 mt-5  glass-card">
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBmi}>
        {/* Weight Input */}
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Weight</label>
          <input
            type="number"
            className="form-control"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          {weightUnit === 'st' && (
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Additional pounds (if weight in stones)"
              value={extraWeight}
              onChange={(e) => setExtraWeight(e.target.value)}
            />
          )}
          {/* Weight Unit Selection */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="weightUnit"
              id="kg"
              value="kg"
              checked={weightUnit === 'kg'}
              onChange={(e) => handleUnitChange(e, 'weight')}
            />
            <label className="form-check-label" htmlFor="kg">Kilograms</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="weightUnit"
              id="lbs"
              value="lbs"
              checked={weightUnit === 'lbs'}
              onChange={(e) => handleUnitChange(e, 'weight')}
            />
            <label className="form-check-label" htmlFor="lbs">Pounds</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="weightUnit"
              id="st"
              value="st"
              checked={weightUnit === 'st'}
              onChange={(e) => handleUnitChange(e, 'weight')}
            />
            <label className="form-check-label" htmlFor="st">Stones</label>
          </div>
        </div>

        {/* Height Input */}
        <div className="mb-3">
          <label htmlFor="height" className="form-label">Height</label>
          <input
            type="number"
            className="form-control"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
          {heightUnit === 'ft' && (
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Additional inches (if height in feet)"
              value={extraHeight}
              onChange={(e) => setExtraHeight(e.target.value)}
            />
          )}
          {/* Height Unit Selection */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="heightUnit"
              id="cm"
              value="cm"
              checked={heightUnit === 'cm'}
              onChange={(e) => handleUnitChange(e, 'height')}
            />
            <label className="form-check-label" htmlFor="cm">Centimeters</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="heightUnit"
              id="in"
              value="in"
              checked={heightUnit === 'in'}
              onChange={(e) => handleUnitChange(e, 'height')}
            />
            <label className="form-check-label" htmlFor="in">Inches</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="heightUnit"
              id="ft"
              value="ft"
              checked={heightUnit === 'ft'}
              onChange={(e) => handleUnitChange(e, 'height')}
            />
            <label className="form-check-label" htmlFor="ft">Feet</label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Calculate BMI</button>
      </form>

      {/* BMI Display */}
      {bmi && (
        <div className="mt-4">
          <h3>Your BMI: {bmi}</h3>
        </div>
      )}
    </div>
    <div className="col-10 col-md-8 col-lg-6 mt-3 glass-card d-flex justify-content-center align-items-center">
  <p className=' header mt-4 me-2 ms-1' > Copyright @ Create Nova </p>
  <a
        href="https://www.linkedin.com/in/jesseross001"
        className="btn btn-custom-linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
      </a>

      <a
        href="https://github.com/JesseRoss001"
        className="btn btn-custom-github me-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} /> GitHub
      </a>
      
</div>
</animated.div>
  );
}

export default App;