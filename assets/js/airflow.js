(() => {
  const CUBIC_METRES_PER_CUBIC_FOOT = 0.028316846592;
  const CUBIC_METRES_PER_HOUR_PER_CFM = 1.69901082;
  const format = (number, digits = 2) => new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits
  }).format(number);
  const formatFixed = (number, digits = 2) => new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(number);

  const positiveValue = (control, maximum = Number.POSITIVE_INFINITY) => {
    const value = Number(control?.value);
    return Number.isFinite(value) && value > 0 && value <= maximum ? value : null;
  };

  const setOutput = (form, name, value) => {
    const output = form.querySelector(`[data-result="${name}"]`);
    if (output) output.value = output.textContent = value;
  };

  const clearEnhancedResults = form => {
    form.querySelectorAll('[data-result]').forEach(output => {
      output.value = '';
      output.textContent = '';
    });
  };

  const bindEnhancedCfm = form => {
    const controls = form.elements;
    const note = form.querySelector('[data-note]');
    const dimensions = form.querySelector('[data-room-dimensions]');
    const knownVolume = form.querySelector('[data-room-volume]');
    const dimensionUnits = [...form.querySelectorAll('[data-dimension-unit]')];
    const volumeUnits = [...form.querySelectorAll('[data-volume-unit]')];
    const primaryUnit = form.querySelector('[data-primary-unit]');
    const secondaryUnit = form.querySelector('[data-secondary-unit]');

    const syncInterface = () => {
      const useDimensions = controls.roomInput.value === 'dimensions';
      dimensions.hidden = !useDimensions;
      knownVolume.hidden = useDimensions;
      dimensions.style.display = useDimensions ? '' : 'none';
      knownVolume.style.display = useDimensions ? 'none' : '';
      [...dimensions.querySelectorAll('input')].forEach(input => { input.disabled = !useDimensions; });
      [...knownVolume.querySelectorAll('input')].forEach(input => { input.disabled = useDimensions; });
      const metric = controls.unit.value === 'si';
      dimensionUnits.forEach(unit => { unit.textContent = metric ? 'm' : 'ft'; });
      volumeUnits.forEach(unit => { unit.textContent = metric ? 'm³' : 'ft³'; });
      primaryUnit.textContent = metric ? 'm³/h' : 'CFM';
      secondaryUnit.textContent = metric ? 'CFM' : 'm³/h';
    };

    const fail = message => {
      clearEnhancedResults(form);
      note.textContent = message;
    };

    const calculate = () => {
      const metric = controls.unit.value === 'si';
      const ach = positiveValue(controls.ach, 1000);
      if (ach === null) return fail('Enter an ACH value greater than zero and no more than 1,000.');

      let selectedVolume;
      if (controls.roomInput.value === 'dimensions') {
        const length = positiveValue(controls.roomLength, 10000);
        const width = positiveValue(controls.roomWidth, 10000);
        const height = positiveValue(controls.roomHeight, 10000);
        if ([length, width, height].some(value => value === null)) {
          return fail('Enter positive room dimensions within the stated range.');
        }
        selectedVolume = length * width * height;
      } else {
        selectedVolume = positiveValue(controls.roomVolume, 1e12);
        if (selectedVolume === null) return fail('Enter a positive room volume within the stated range.');
      }

      const volumeFt3 = metric ? selectedVolume / CUBIC_METRES_PER_CUBIC_FOOT : selectedVolume;
      const cfm = volumeFt3 * ach / 60;
      const m3h = cfm * CUBIC_METRES_PER_HOUR_PER_CFM;
      if (![selectedVolume, cfm, m3h].every(Number.isFinite)) return fail('The entered values produce an unsupported result.');

      setOutput(form, 'primary', formatFixed(metric ? m3h : cfm));
      setOutput(form, 'volume', formatFixed(selectedVolume));
      setOutput(form, 'secondary', formatFixed(metric ? cfm : m3h));
      note.textContent = `Required airflow: ${formatFixed(metric ? m3h : cfm)} ${metric ? 'm³/h' : 'CFM'} for ${formatFixed(selectedVolume)} ${metric ? 'm³' : 'ft³'} at ${formatFixed(ach)} ACH. Label the airflow stream before using the result.`;
    };

    const convertUnitInputs = nextUnit => {
      const previousUnit = form.dataset.currentUnit || 'us';
      if (previousUnit === nextUnit) return;
      const lengthFactor = nextUnit === 'si' ? 0.3048 : 1 / 0.3048;
      const volumeFactor = nextUnit === 'si' ? CUBIC_METRES_PER_CUBIC_FOOT : 1 / CUBIC_METRES_PER_CUBIC_FOOT;
      ['roomLength', 'roomWidth', 'roomHeight'].forEach(name => {
        const value = Number(controls[name].value);
        if (Number.isFinite(value)) controls[name].value = Number((value * lengthFactor).toPrecision(8));
      });
      const volume = Number(controls.roomVolume.value);
      if (Number.isFinite(volume)) controls.roomVolume.value = Number((volume * volumeFactor).toPrecision(8));
      form.dataset.currentUnit = nextUnit;
    };

    form.dataset.currentUnit = controls.unit.value;
    form.addEventListener('submit', event => {
      event.preventDefault();
      calculate();
    });
    controls.unit.addEventListener('change', () => {
      convertUnitInputs(controls.unit.value);
      syncInterface();
      calculate();
    });
    controls.roomInput.addEventListener('change', () => {
      syncInterface();
      calculate();
    });
    form.querySelectorAll('input').forEach(input => input.addEventListener('input', calculate));
    form.addEventListener('reset', () => setTimeout(() => {
      form.dataset.currentUnit = controls.unit.value;
      syncInterface();
      clearEnhancedResults(form);
      note.textContent = 'Enter values and calculate.';
    }, 0));

    syncInterface();
    calculate();
  };

  const bindLegacyAirflow = form => {
    const mode = form.dataset.airflow;
    const inputs = [...form.querySelectorAll('input')];
    const output = form.querySelector('[data-output]');
    const note = form.querySelector('[data-note]');
    const fail = text => {
      output.value = '';
      output.textContent = '';
      note.textContent = text;
    };
    const calculate = () => {
      const values = inputs.map(input => Number(input.value));
      if (values.some(value => !Number.isFinite(value) || value <= 0)) return fail('Enter values greater than zero.');
      let result;
      let unit = '';
      if (mode === 'cfm' || mode === 'airflow' || mode === 'room') {
        result = values[0] * values[1] * values[2] * values[3] / 60;
        unit = 'CFM';
      } else if (mode === 'ach') {
        result = values[3] * 60 / (values[0] * values[1] * values[2]);
        unit = 'ACH';
      } else if (mode === 'per-square-foot') {
        result = values[1] / values[0];
        unit = 'CFM per sq ft';
      } else if (mode === 'cfm-to-m3h') {
        result = values[0] * CUBIC_METRES_PER_HOUR_PER_CFM;
        unit = 'm3/h';
      } else if (mode === 'm3h-to-cfm') {
        result = values[0] / CUBIC_METRES_PER_HOUR_PER_CFM;
        unit = 'CFM';
      } else {
        return fail('Unsupported airflow calculation.');
      }
      output.value = output.textContent = format(result);
      note.textContent = `Result: ${format(result)} ${unit}. Planning and conversion value only; verify design and code requirements.`;
    };
    form.addEventListener('submit', event => {
      event.preventDefault();
      calculate();
    });
    form.addEventListener('reset', () => setTimeout(calculate, 0));
    inputs.forEach(input => input.addEventListener('input', calculate));
    calculate();
  };

  document.querySelectorAll('form[data-airflow]').forEach(form => {
    if (form.matches('[data-cfm-enhanced]')) bindEnhancedCfm(form);
    else bindLegacyAirflow(form);
  });
})();
