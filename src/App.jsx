import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slider';

const InfoBox = ({ bmi }) => {
  let content;
  if (bmi < 18.5) content = 'Underweight info...';
  else if (bmi < 24.9) content = 'Normal weight info...';
  else if (bmi < 29.9) content = 'Overweight info...';
  else content = 'Obesity info...';

  return (
    <div className={`info-box ${bmi ? 'visible' : ''}`}>
      {content}
    </div>
  );
};

function App() {
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
    <div className="background-container row g-0">
          <div className="col-10 col-md-8 col-lg-6 container ms-3 me-3 mt-5 glass-card">
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
    </div>
  );
}

export default App;