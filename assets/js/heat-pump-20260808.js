(() => {
  const form = document.querySelector('[data-heat-pump-form]');
  if (!form) return;
  const format = (value, digits = 2) => new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);
  const output = (name, value, digits = 2) => {
    const element = form.querySelector(`[data-result="${name}"]`);
    if (element) element.value = Number.isFinite(value) ? format(value, digits) : '';
  };
  const clear = () => form.querySelectorAll('[data-result]').forEach(element => { element.value = ''; });
  let previousUnit = form.elements.unit.value;
  const calculate = () => {
    const unit = form.elements.unit.value;
    const mode = form.elements.mode.value;
    const load = Number(form.elements.load.value);
    const hours = Number(form.elements.hours.value);
    const cop = Number(form.elements.cop.value);
    const rate = Number(form.elements.rate.value);
    const message = form.querySelector('[data-heat-pump-message]');
    form.querySelector('[data-load-unit]').textContent = unit === 'si' ? 'kW thermal' : 'BTU/h';
    form.querySelector('[data-thermal-unit]').textContent = unit === 'si' ? 'kWh thermal' : 'BTU thermal';
    form.querySelectorAll('[data-heating-only]').forEach(element => { element.hidden = mode !== 'heating'; });
    if (![load, hours, cop, rate].every(Number.isFinite) || load <= 0 || hours <= 0 || cop <= 0 || rate < 0 || cop > 20) {
      clear();
      message.textContent = 'Enter a positive load, runtime, and COP from 0 to 20, plus a non-negative electricity rate.';
      return;
    }
    const thermalKwh = unit === 'si' ? load * hours : load * hours / 3412.141633;
    const electricalKwh = thermalKwh / cop;
    const cost = electricalKwh * rate;
    output('thermal', unit === 'si' ? thermalKwh : load * hours, 1);
    output('electricity', electricalKwh, 2);
    output('cost', cost, 2);
    output('hourlyCost', cost / hours, 3);
    if (mode === 'heating') {
      const resistanceCost = thermalKwh * rate;
      output('resistanceCost', resistanceCost, 2);
      output('savings', resistanceCost - cost, 2);
    }
    message.textContent = mode === 'heating' ? 'Estimated electricity use and cost at the stated heating load and COP. The comparison assumes resistance heat at COP 1.' : 'Estimated electricity use and cost at the stated cooling load and COP.';
  };
  form.addEventListener('submit', event => { event.preventDefault(); calculate(); });
  form.addEventListener('reset', () => { previousUnit = 'us'; setTimeout(calculate, 0); });
  form.querySelectorAll('input,select').forEach(element => element.addEventListener(element.tagName === 'SELECT' ? 'change' : 'input', () => {
    if (element.name === 'unit') {
      const nextUnit = form.elements.unit.value;
      const load = Number(form.elements.load.value);
      if (Number.isFinite(load) && load > 0 && nextUnit !== previousUnit) form.elements.load.value = nextUnit === 'si' ? (load * 0.0002930710702).toFixed(4) : (load / 0.0002930710702).toFixed(2);
      previousUnit = nextUnit;
    }
    calculate();
  }));
  calculate();
})();
