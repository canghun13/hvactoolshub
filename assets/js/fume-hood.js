(() => {
  const CFM_TO_M3H = 1.69901082;
  const IN_TO_MM = 25.4;
  const FPM_TO_MS = 0.00508;
  const LBFT3_TO_KGM3 = 16.0184634;
  const BTULB_TO_KJKG = 2.326;
  const BTUH_TO_KW = 0.00029307107;

  const value = (form, name) => Number(form.elements[name]?.value);
  const setValue = (form, name, next, digits = 4) => {
    if (form.elements[name]) form.elements[name].value = Number(next.toFixed(digits));
  };
  const note = (form, text) => {
    const target = form.querySelector('[data-note]');
    if (target) target.textContent = text;
  };
  const clear = form => form.querySelectorAll('[data-result]').forEach(output => { output.value = ''; output.textContent = ''; });
  const show = (form, name, number, digits = 2) => {
    const output = form.querySelector(`[data-result="${name}"]`);
    if (!output) return;
    const text = Number(number).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits });
    output.value = text;
    output.textContent = text;
  };
  const unit = (form, name, text) => {
    const target = form.querySelector(`[data-unit="${name}"]`);
    if (target) target.textContent = text;
  };
  const positive = numbers => numbers.every(number => Number.isFinite(number) && number > 0);
  const nonnegative = numbers => numbers.every(number => Number.isFinite(number) && number >= 0);

  const calculateFace = form => {
    clear(form);
    const flow = value(form, 'flow');
    const width = value(form, 'width');
    const height = value(form, 'height');
    if (!positive([flow, width, height])) return note(form, 'Enter positive airflow, width, and sash-opening height values.');
    const isUs = form.elements.unit.value === 'us';
    const area = isUs ? width * height / 144 : width * height / 1000000;
    const velocity = isUs ? flow / area : (flow / 3600) / area;
    if (!Number.isFinite(velocity) || velocity > (isUs ? 5000 : 25)) return note(form, 'Check the entered opening dimensions and airflow range.');
    show(form, 'area', area, 3);
    show(form, 'velocity', velocity, 2);
    show(form, 'otherVelocity', isUs ? velocity * FPM_TO_MS : velocity / FPM_TO_MS, 2);
    unit(form, 'area', isUs ? 'ft²' : 'm²');
    unit(form, 'velocity', isUs ? 'ft/min' : 'm/s');
    unit(form, 'otherVelocity', isUs ? 'm/s' : 'ft/min');
    note(form, 'This is an opening-average calculation. It does not replace a traverse, smoke visualization, tracer-gas test, or the owner’s acceptance criteria.');
  };

  const calculateTraverse = form => {
    clear(form);
    const readings = form.elements.readings.value.split(/[\s,;]+/).filter(Boolean).map(Number);
    const isUs = form.elements.unit.value === 'us';
    if (readings.length < 3 || !positive(readings) || readings.some(number => number > (isUs ? 5000 : 25))) return note(form, 'Enter at least three positive velocity readings separated by commas, spaces, or new lines.');
    const average = readings.reduce((sum, number) => sum + number, 0) / readings.length;
    const minimum = Math.min(...readings);
    const maximum = Math.max(...readings);
    const range = maximum - minimum;
    const maximumDeviation = Math.max(...readings.map(number => Math.abs(number - average))) / average * 100;
    show(form, 'count', readings.length, 0);
    show(form, 'average', average, 2);
    show(form, 'minimum', minimum, 2);
    show(form, 'maximum', maximum, 2);
    show(form, 'range', range, 2);
    show(form, 'deviation', maximumDeviation, 1);
    ['average', 'minimum', 'maximum', 'range'].forEach(name => unit(form, name, isUs ? 'ft/min' : 'm/s'));
    note(form, 'Compare the recorded traverse with the project test plan and owner criteria. The calculator does not assign pass/fail status.');
  };

  const calculatePlanner = form => {
    clear(form);
    const groups = ['A', 'B'].map(letter => ({
      quantity: value(form, `quantity${letter}`),
      active: value(form, `active${letter}`),
      full: value(form, `full${letter}`),
      standby: value(form, `standby${letter}`)
    }));
    const makeup = value(form, 'makeup');
    if (!nonnegative(groups.flatMap(group => [group.quantity, group.active, group.full, group.standby])) || !Number.isFinite(makeup) || makeup < 0 || makeup > 100) return note(form, 'Use nonnegative group values and a makeup-air fraction from 0% to 100%.');
    if (groups.every(group => group.quantity === 0)) return note(form, 'Enter at least one hood in either group.');
    if (groups.some(group => !Number.isInteger(group.quantity) || !Number.isInteger(group.active) || group.active > group.quantity || group.full < group.standby)) return note(form, 'Use whole hood counts, keep active hoods at or below group quantity, and keep full-open airflow at or above standby airflow.');
    const connected = groups.reduce((sum, group) => sum + group.quantity * group.full, 0);
    const scenario = groups.reduce((sum, group) => sum + group.active * group.full + (group.quantity - group.active) * group.standby, 0);
    if (!positive([connected, scenario])) return note(form, 'The connected and scenario airflow must be greater than zero.');
    const unitText = form.elements.unit.value === 'us' ? 'CFM' : 'm³/h';
    show(form, 'totalHoods', groups.reduce((sum, group) => sum + group.quantity, 0), 0);
    show(form, 'connected', connected, 1);
    show(form, 'scenario', scenario, 1);
    show(form, 'ratio', scenario / connected * 100, 1);
    show(form, 'makeupFlow', scenario * makeup / 100, 1);
    ['connected', 'scenario', 'makeupFlow'].forEach(name => unit(form, name, unitText));
    note(form, 'This is a user-defined airflow scenario, not a universal diversity or room-pressure rule. Check controls, minimum flows, makeup-air strategy, and the project sequence.');
  };

  const calculateLoad = form => {
    clear(form);
    const flow = value(form, 'flow');
    const density = value(form, 'density');
    const enthalpy = value(form, 'enthalpy');
    const recovery = value(form, 'recovery');
    const hours = value(form, 'hours');
    if (!positive([flow, density, enthalpy]) || !nonnegative([hours]) || !Number.isFinite(recovery) || recovery < 0 || recovery > 100) return note(form, 'Enter positive airflow, density, and absolute enthalpy difference; use 0–100% recovery and nonnegative annual hours.');
    const effectiveEnthalpy = enthalpy * (1 - recovery / 100);
    const isUs = form.elements.unit.value === 'us';
    const loadKw = isUs
      ? flow * 60 * density * effectiveEnthalpy * BTUH_TO_KW
      : flow * density * effectiveEnthalpy / 3600;
    const loadBtuh = loadKw / BTUH_TO_KW;
    const annualKwh = loadKw * hours;
    if (!Number.isFinite(loadKw) || loadKw > 100000) return note(form, 'Check the airflow, density, and enthalpy-difference range.');
    show(form, 'effectiveEnthalpy', effectiveEnthalpy, 2);
    show(form, 'loadKw', loadKw, 2);
    show(form, 'loadBtuh', loadBtuh, 0);
    show(form, 'annual', annualKwh, 0);
    unit(form, 'effectiveEnthalpy', isUs ? 'Btu/lb dry air' : 'kJ/kg dry air');
    note(form, 'Thermal-load estimate only. It excludes fan power, controls, simultaneous sensible/latent plant constraints, reheat, humidification, and equipment efficiency.');
  };

  const calculators = { face: calculateFace, traverse: calculateTraverse, planner: calculatePlanner, load: calculateLoad };
  const convertUnit = form => {
    const previous = form.dataset.currentUnit;
    const next = form.elements.unit.value;
    if (!previous || previous === next) { form.dataset.currentUnit = next; return; }
    const toSi = next === 'si';
    if (form.dataset.fumeHood === 'face') {
      setValue(form, 'flow', value(form, 'flow') * (toSi ? CFM_TO_M3H : 1 / CFM_TO_M3H), 2);
      ['width', 'height'].forEach(name => setValue(form, name, value(form, name) * (toSi ? IN_TO_MM : 1 / IN_TO_MM), 2));
    }
    if (form.dataset.fumeHood === 'traverse') {
      const factor = toSi ? FPM_TO_MS : 1 / FPM_TO_MS;
      form.elements.readings.value = form.elements.readings.value.split(/[\s,;]+/).filter(Boolean).map(Number).filter(Number.isFinite).map(number => Number((number * factor).toFixed(toSi ? 3 : 1))).join(', ');
    }
    if (form.dataset.fumeHood === 'planner') ['fullA', 'standbyA', 'fullB', 'standbyB'].forEach(name => setValue(form, name, value(form, name) * (toSi ? CFM_TO_M3H : 1 / CFM_TO_M3H), 2));
    if (form.dataset.fumeHood === 'load') {
      setValue(form, 'flow', value(form, 'flow') * (toSi ? CFM_TO_M3H : 1 / CFM_TO_M3H), 2);
      setValue(form, 'density', value(form, 'density') * (toSi ? LBFT3_TO_KGM3 : 1 / LBFT3_TO_KGM3), 4);
      setValue(form, 'enthalpy', value(form, 'enthalpy') * (toSi ? BTULB_TO_KJKG : 1 / BTULB_TO_KJKG), 3);
    }
    form.dataset.currentUnit = next;
  };

  document.querySelectorAll('form[data-fume-hood]').forEach(form => {
    form.dataset.currentUnit = form.elements.unit.value;
    const run = () => calculators[form.dataset.fumeHood](form);
    form.addEventListener('submit', event => { event.preventDefault(); run(); });
    form.addEventListener('input', () => {
      if (form.checkValidity()) return;
      clear(form);
      note(form, 'Enter values within the displayed range before calculating.');
    });
    form.elements.unit.addEventListener('change', () => { convertUnit(form); run(); });
    form.addEventListener('reset', () => window.setTimeout(() => { form.dataset.currentUnit = form.elements.unit.value; clear(form); note(form, 'Enter values and calculate.'); }, 0));
    run();
  });
})();
