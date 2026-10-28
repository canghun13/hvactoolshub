(() => {
  const format = (value, digits = 2) => new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);
  document.querySelectorAll('[data-btu-cluster]').forEach(form => {
    const mode = form.dataset.btuCluster;
    const inputs = [...form.querySelectorAll('input')];
    const message = form.querySelector('[data-message]');
    const output = form.querySelector('[data-output]');
    const secondary = form.querySelector('[data-secondary]');
    const fail = text => {
      output.value = '';
      if (secondary) secondary.textContent = '';
      message.textContent = text;
    };
    const calculate = () => {
      const values = inputs.map(input => Number(input.value));
      if (inputs.some(input => !input.checkValidity()) || values.some(value => !Number.isFinite(value) || value <= 0)) {
        return fail('Enter positive values within the displayed input ranges.');
      }
      let result, extraValue, extraUnit;
      if (mode === 'btu-to-tons') {
        result = values[0] / 12000;
        extraValue = values[0] / 3412.141633;
        extraUnit = 'kW of capacity';
      } else if (mode === 'tons-to-btu') {
        result = values[0] * 12000;
        extraValue = result / 3412.141633;
        extraUnit = 'kW of capacity';
      } else if (mode === 'per-square-foot') {
        result = values[0] / values[1];
        extraValue = values[0] / 12000;
        extraUnit = 'refrigeration tons';
      } else if (mode === 'room') {
        result = values[0] * values[1];
        extraValue = result / 12000;
        extraUnit = 'refrigeration tons';
      } else return fail('Unsupported BTU calculation.');
      if (![result, extraValue].every(value => Number.isFinite(value) && value > 0)) {
        return fail('These values are outside the supported calculation range. Adjust the inputs.');
      }
      output.value = format(result, mode === 'btu-to-tons' || mode === 'per-square-foot' ? 3 : 0);
      if (secondary) secondary.textContent = `${format(extraValue, 3)} ${extraUnit}`;
      message.textContent = 'Results are planning or conversion values; they are not a complete equipment selection.';
    };
    form.addEventListener('submit', event => { event.preventDefault(); calculate(); });
    form.addEventListener('reset', () => setTimeout(calculate, 0));
    inputs.forEach(input => input.addEventListener('input', calculate));
    calculate();
  });
})();
