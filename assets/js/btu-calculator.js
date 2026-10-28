(() => {
  const form = document.querySelector('[data-btu-form]');
  if (!form) return;
  const value = document.querySelector('#capacity-value');
  const unit = document.querySelector('#capacity-unit');
  const message = document.querySelector('[data-btu-message]');
  const results = {
    btu: document.querySelector('[data-result="btu"]'),
    watt: document.querySelector('[data-result="watt"]'),
    kw: document.querySelector('[data-result="kw"]'),
    ton: document.querySelector('[data-result="ton"]')
  };
  const factors = { btu: 1, watt: 1 / 0.2930710702, kw: 3412.141633, ton: 12000 };
  const format = (number, maximumFractionDigits) => new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(number);
  const fail = text => {
    Object.values(results).forEach(output => { output.value = ''; });
    message.textContent = text;
  };
  const convert = () => {
    const entered = Number(value.value);
    if (!value.checkValidity() || !Number.isFinite(entered) || entered <= 0) {
      return fail('Enter a positive capacity within the displayed input range.');
    }
    if (!Object.prototype.hasOwnProperty.call(factors, unit.value)) {
      return fail('Select a supported capacity unit.');
    }
    const btu = entered * factors[unit.value];
    const converted = { btu, watt: btu * .2930710702, kw: btu / 3412.141633, ton: btu / 12000 };
    if (Object.values(converted).some(number => !Number.isFinite(number) || number <= 0)) {
      return fail('This value is outside the supported calculation range. Enter a smaller capacity.');
    }
    results.btu.value = format(converted.btu, 2);
    results.watt.value = format(converted.watt, 2);
    results.kw.value = format(converted.kw, 3);
    results.ton.value = format(converted.ton, 3);
    message.textContent = 'Results describe thermal capacity, not electrical power draw.';
  };
  form.addEventListener('submit', event => { event.preventDefault(); convert(); });
  form.addEventListener('reset', () => setTimeout(convert, 0));
  value.addEventListener('input', convert);
  unit.addEventListener('change', convert);
  convert();
})();
