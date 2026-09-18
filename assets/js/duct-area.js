(() => {
  const metresPerUnit = { in: 0.0254, ft: 0.3048, mm: 0.001, cm: 0.01, m: 1 };
  const format = value => {
    const absolute = Math.abs(value);
    const maximumFractionDigits = absolute >= 100000 ? 0 : absolute >= 1000 ? 2 : absolute >= 1 ? 4 : absolute >= 0.01 ? 6 : 8;
    return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(value);
  };

  const forms = [...document.querySelectorAll('[data-duct-area]')];

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-tool-print]');
    const form = button?.closest('[data-duct-area]');
    if (!form) return;
    const allResultsValid = forms.every(candidate => [...candidate.querySelectorAll('[data-area-result]')]
      .every(output => output.value && Number.isFinite(Number(output.value.replaceAll(',', '')))));
    if (allResultsValid) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    form.querySelector('[data-note]').textContent = 'Resolve invalid dimensions in both calculators before printing.';
  }, true);

  forms.forEach(form => {
    const shape = form.dataset.ductArea;
    const unitSelect = form.querySelector('[data-area-unit]');
    const dimensions = [...form.querySelectorAll('[data-area-dimension]')];
    const unitLabels = [...form.querySelectorAll('[data-dimension-unit]')];
    const outputs = Object.fromEntries([...form.querySelectorAll('[data-area-result]')].map(output => [output.dataset.areaResult, output]));
    const note = form.querySelector('[data-note]');
    let previousUnit = unitSelect.value;

    const updateUnitLabels = () => unitLabels.forEach(label => { label.textContent = unitSelect.value; });
    const clear = message => {
      Object.values(outputs).forEach(output => { output.value = ''; });
      note.textContent = message;
    };
    const calculate = () => {
      const factor = metresPerUnit[unitSelect.value];
      const values = dimensions.map(input => Number(input.value));
      if (!factor || values.some(value => !Number.isFinite(value) || value <= 0)) {
        clear('Enter inside dimensions greater than zero.');
        return false;
      }
      const dimensionsInMetres = values.map(value => value * factor);
      if (dimensionsInMetres.some(value => value < 0.0001 || value > 30)) {
        clear('Enter each inside dimension from 0.1 mm to 30 m.');
        return false;
      }

      const areaM2 = shape === 'round'
        ? Math.PI * dimensionsInMetres[0] ** 2 / 4
        : dimensionsInMetres[0] * dimensionsInMetres[1];
      outputs.ft2.value = format(areaM2 / 0.09290304);
      outputs.in2.value = format(areaM2 / 0.00064516);
      outputs.m2.value = format(areaM2);
      outputs.mm2.value = format(areaM2 * 1e6);

      const description = shape === 'round'
        ? `${format(values[0])} ${unitSelect.value} inside diameter`
        : `${format(values[0])} × ${format(values[1])} ${unitSelect.value} inside dimensions`;
      note.textContent = `Area calculated from ${description}. Use clear inside dimensions; area alone does not establish friction loss or airflow.`;
      return true;
    };
    const convertDimensions = () => {
      const previousFactor = metresPerUnit[previousUnit];
      const nextFactor = metresPerUnit[unitSelect.value];
      if (previousFactor && nextFactor) {
        dimensions.forEach(input => {
          const value = Number(input.value);
          if (Number.isFinite(value)) input.value = Number((value * previousFactor / nextFactor).toPrecision(10));
        });
      }
      previousUnit = unitSelect.value;
      updateUnitLabels();
      calculate();
    };

    form.addEventListener('submit', event => {
      event.preventDefault();
      calculate();
    });
    form.addEventListener('reset', () => setTimeout(() => {
      previousUnit = unitSelect.value;
      updateUnitLabels();
      calculate();
    }, 0));
    unitSelect.addEventListener('change', convertDimensions);
    dimensions.forEach(input => input.addEventListener('input', calculate));

    updateUnitLabels();
    calculate();
  });
})();
