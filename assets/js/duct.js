(() => {
  const n = (value, digits = 2) => new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits
  }).format(value);
  const positiveFinite = value => Number.isFinite(value) && value > 0;

  document.querySelectorAll('[data-duct]').forEach(form => {
    const mode = form.dataset.duct;
    const inputs = [...form.querySelectorAll('input')];
    const out = form.querySelector('[data-output]');
    const note = form.querySelector('[data-note]');
    const fail = text => {
      out.value = out.textContent = '';
      note.textContent = text;
    };
    const calculate = () => {
      const v = inputs.map(input => Number(input.value));
      if (inputs.some(input => !input.checkValidity()) || !v.every(positiveFinite)) {
        return fail('Enter valid numbers greater than zero within the stated input constraints.');
      }
      let result, detail = '', calculated = [];
      if (mode === 'size' || mode === 'round') {
        const area = v[0] / v[1];
        result = 12 * Math.sqrt(4 * area / Math.PI);
        calculated = [area, result];
        detail = `Required area: ${n(area, 3)} ft\u00b2.`;
      } else if (mode === 'rectangular') {
        const area = 144 * v[0] / v[1];
        const height = Math.sqrt(area / v[2]);
        const width = v[2] * height;
        calculated = [area, height, width];
        result = `${n(width, 1)} \u00d7 ${n(height, 1)}`;
        detail = `Required area: ${n(area, 1)} in\u00b2.`;
      } else if (mode === 'equivalent') {
        result = 1.30 * Math.pow(v[0] * v[1], .625) / Math.pow(v[0] + v[1], .25);
        calculated = [result];
        detail = 'Equal-friction approximation; verify with a duct design method.';
      } else if (mode === 'velocity-round') {
        const area = Math.PI * Math.pow(v[1] / 12, 2) / 4;
        result = v[0] / area;
        calculated = [area, result];
        detail = 'Velocity is based on the nominal round duct area.';
      } else if (mode === 'velocity-rect') {
        const area = v[1] * v[2] / 144;
        result = v[0] / area;
        calculated = [area, result];
        detail = 'Velocity is based on the rectangular face area.';
      } else if (mode === 'area-round' || mode === 'area-rect') {
        result = mode === 'area-round' ? Math.PI * Math.pow(v[0] / 12, 2) / 4 : v[0] * v[1] / 144;
        calculated = [result, result * 144];
        detail = `Face area: ${n(result * 144, 1)} in\u00b2.`;
      } else if (mode === 'friction') {
        const q = v[0] * 0.00047194745, d = v[1] * 0.0254, l = v[2] * .3048;
        const rho = v[3], f = v[4], area = Math.PI * d * d / 4;
        const velocity = q / area, pa = f * (l / d) * (rho * velocity * velocity / 2);
        result = pa / 249.0889;
        calculated = [q, d, l, area, velocity, velocity * 196.850394, pa, result];
        detail = `Air velocity: ${n(velocity * 196.850394, 0)} FPM; pressure loss: ${n(pa, 1)} Pa.`;
      } else {
        return fail('Unsupported duct calculation.');
      }
      if (!calculated.every(positiveFinite)) {
        return fail('The entered values produce an unsupported result.');
      }
      out.value = typeof result === 'number' ? n(result, 2) : result;
      note.textContent = `${detail} Use as a preliminary calculation and confirm final duct design, noise, fittings, and code requirements.`;
    };
    form.addEventListener('submit', event => { event.preventDefault(); calculate(); });
    form.addEventListener('reset', () => setTimeout(calculate, 0));
    inputs.forEach(input => input.addEventListener('input', calculate));
    calculate();
  });
})();
