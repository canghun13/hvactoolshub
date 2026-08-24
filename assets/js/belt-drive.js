(() => {
  const number = (form, name) => Number(form.elements[name]?.value);
  const output = (form, name, value, digits = 2) => {
    const node = form.querySelector(`[data-result="${name}"]`);
    if (node) node.value = Number.isFinite(value) ? value.toLocaleString('en-US', { maximumFractionDigits: digits }) : '';
  };
  const message = (form, text) => {
    const node = form.querySelector('[data-note]');
    if (node) node.textContent = text;
  };
  const clear = form => form.querySelectorAll('[data-result]').forEach(node => { node.value = ''; });
  const validPositive = values => values.every(value => Number.isFinite(value) && value > 0);
  const setUnitText = (form, result, value) => {
    const unit = form.querySelector(`[data-result="${result}"]`)?.nextElementSibling;
    if (unit) unit.textContent = value;
  };

  const calculate = form => {
    clear(form);
    message(form, '');
    const kind = form.dataset.beltDrive;

    if (kind === 'fan-rpm') {
      const motorRpm = number(form, 'motorRpm');
      const motorSheave = number(form, 'motorSheave');
      const fanSheave = number(form, 'fanSheave');
      if (!validPositive([motorRpm, motorSheave, fanSheave])) return message(form, 'Enter positive motor RPM and pitch diameters.');
      if (motorRpm > 10000 || motorSheave > 2000 || fanSheave > 2000) return message(form, 'Check the entered range and units.');
      const fanRpm = motorRpm * motorSheave / fanSheave;
      const ratio = fanSheave / motorSheave;
      const beltSpeed = form.elements.unit.value === 'in'
        ? Math.PI * motorSheave * motorRpm / 12
        : Math.PI * motorSheave * motorRpm / 60000;
      output(form, 'fanRpm', fanRpm, 1);
      output(form, 'ratio', ratio, 3);
      output(form, 'beltSpeed', beltSpeed, 2);
      setUnitText(form, 'beltSpeed', form.elements.unit.value === 'in' ? 'ft/min' : 'm/s');
      message(form, 'Verify pitch diameters, maximum fan RPM, belt rating, alignment, and motor load before changing a drive.');
    }

    if (kind === 'motor-sheave') {
      const motorRpm = number(form, 'motorRpm');
      const targetFanRpm = number(form, 'targetFanRpm');
      const fanSheave = number(form, 'fanSheave');
      if (!validPositive([motorRpm, targetFanRpm, fanSheave])) return message(form, 'Enter positive motor RPM, target fan RPM, and fan-sheave pitch diameter.');
      if (motorRpm > 10000 || targetFanRpm > 10000 || fanSheave > 2000) return message(form, 'Check the entered range and units.');
      const motorSheave = fanSheave * targetFanRpm / motorRpm;
      const ratio = fanSheave / motorSheave;
      const beltSpeed = form.elements.unit.value === 'in'
        ? Math.PI * motorSheave * motorRpm / 12
        : Math.PI * motorSheave * motorRpm / 60000;
      output(form, 'motorSheave', motorSheave, 3);
      output(form, 'ratio', ratio, 3);
      output(form, 'beltSpeed', beltSpeed, 2);
      setUnitText(form, 'motorSheave', form.elements.unit.value === 'in' ? 'in' : 'mm');
      setUnitText(form, 'beltSpeed', form.elements.unit.value === 'in' ? 'ft/min' : 'm/s');
      message(form, 'Use the result as a pitch-diameter target, then select an available rated sheave and recalculate actual fan speed.');
    }

    if (kind === 'belt-length') {
      const small = number(form, 'smallSheave');
      const large = number(form, 'largeSheave');
      const center = number(form, 'centerDistance');
      if (!validPositive([small, large, center])) return message(form, 'Enter positive pitch diameters and center distance.');
      if (small > 2000 || large > 2000 || center > 10000) return message(form, 'Check the entered range and units.');
      const d = Math.min(small, large);
      const D = Math.max(small, large);
      if (center <= (D - d) / 2) return message(form, 'Center distance must be greater than half the pitch-diameter difference for an open-belt layout.');
      const length = 2 * center + Math.PI * (D + d) / 2 + ((D - d) ** 2) / (4 * center);
      const angle = Math.asin((D - d) / (2 * center)) * 180 / Math.PI;
      output(form, 'length', length, 2);
      setUnitText(form, 'length', form.elements.unit.value === 'in' ? 'in' : 'mm');
      output(form, 'smallWrap', 180 - 2 * angle, 1);
      output(form, 'largeWrap', 180 + 2 * angle, 1);
      output(form, 'ratio', D / d, 3);
      message(form, 'This is an approximate pitch length. Match the selected standard belt using the belt manufacturer’s datum/pitch-length convention and take-up range.');
    }

    if (kind === 'fan-law') {
      const rpm1 = number(form, 'rpm1');
      const rpm2 = number(form, 'rpm2');
      const airflow1 = number(form, 'airflow1');
      const pressure1 = number(form, 'pressure1');
      const power1 = number(form, 'power1');
      if (!validPositive([rpm1, rpm2, airflow1, pressure1, power1])) return message(form, 'Enter positive known and proposed operating values.');
      if (rpm1 > 10000 || rpm2 > 10000 || airflow1 > 10000000 || pressure1 > 100000 || power1 > 100000) return message(form, 'Check the entered range and units.');
      const ratio = rpm2 / rpm1;
      output(form, 'airflow2', airflow1 * ratio, 1);
      output(form, 'pressure2', pressure1 * ratio ** 2, 3);
      output(form, 'power2', power1 * ratio ** 3, 3);
      output(form, 'speedChange', (ratio - 1) * 100, 1);
      output(form, 'powerChange', (ratio ** 3 - 1) * 100, 1);
      const isUs = form.elements.unit.value === 'us';
      setUnitText(form, 'airflow2', isUs ? 'CFM' : 'm³/h');
      setUnitText(form, 'pressure2', isUs ? 'in. w.g.' : 'Pa');
      setUnitText(form, 'power2', isUs ? 'hp' : 'kW');
      message(form, 'Fan laws are a same-fan, same-system estimate. Check the fan curve, maximum RPM, motor nameplate/current, drive rating, and actual measured operating point.');
    }
  };

  document.querySelectorAll('form[data-belt-drive]').forEach(form => {
    form.addEventListener('submit', event => { event.preventDefault(); calculate(form); });
    form.addEventListener('input', () => {
      if (form.checkValidity()) return;
      clear(form);
      message(form, 'Enter positive values within the displayed input ranges.');
    });
    form.addEventListener('reset', () => window.setTimeout(() => { clear(form); message(form, 'Enter values and calculate.'); }, 0));
    form.querySelectorAll('select').forEach(select => select.addEventListener('change', () => calculate(form)));
    calculate(form);
  });
})();
