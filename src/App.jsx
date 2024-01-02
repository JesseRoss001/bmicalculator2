import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // State for weight, height, and BMI
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  // State for unit selection
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg', 'lbs', 'st'
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm', 'in', 'ft'

  // Function to handle unit change
  const handleUnitChange = (e, type) => {
    if (type === 'weight') {
      setWeightUnit(e.target.value);
    } else if (type === 'height') {
      setHeightUnit(e.target.value);
    }
  };

  // Function to convert weight to kilograms
  const convertWeightToKg = (weight, unit) => {
    switch (unit) {
      case 'lbs': return weight * 0.453592;
      case 'st': return weight * 6.35029;
      default: return weight; // kg
    }
  };

  // Function to convert height to centimeters
  const convertHeightToCm = (height, unit) => {
    switch (unit) {
      case 'in': return height * 2.54;
      case 'ft': return height * 30.48;
      default: return height; // cm
    }
  };

  // Function to calculate BMI
  const calculateBmi = (e) => {
    e.preventDefault();

    let convertedWeight = convertWeightToKg(weight, weightUnit);
    let convertedHeight = convertHeightToCm(height, heightUnit);

    // BMI calculation formula
    let bmiValue = convertedWeight / (convertedHeight / 100) ** 2;
    setBmi(bmiValue.toFixed(2));
  };

  // BMI Form
  return (
    <div className="container mt-5">
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
  );
}

export default App;