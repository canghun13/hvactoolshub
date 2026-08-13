(() => {
  const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
  const isMeaningful = value => {
    const text = clean(value);
    return Boolean(text) && !/^(?:—|-|nan|infinity|undefined|null)$/i.test(text);
  };
  const isVisible = element => {
    if (!element || element.hidden || element.closest('[hidden]')) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  };
  const appendText = (parent, tagName, className, value) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = value;
    parent.append(element);
    return element;
  };
  const labelFor = control => {
    const label = control.id
      ? document.querySelector(`label[for="${CSS.escape(control.id)}"]`)
      : control.closest('label');
    if (label) {
      const copy = label.cloneNode(true);
      copy.querySelectorAll('input, select, textarea, button').forEach(element => element.remove());
      const text = clean(copy.textContent);
      if (text) return text;
    }
    return clean(control.name || control.id || 'Input').replace(/([A-Z])/g, ' $1');
  };
  const valueFor = control => {
    if (control.tagName === 'SELECT') return clean(control.selectedOptions?.[0]?.textContent || control.value);
    if (control.type === 'checkbox') return control.checked ? 'Yes' : 'No';
    if (control.type === 'radio') return control.checked ? 'Selected' : '';
    return clean(control.value);
  };
  const inputRows = form => [...form.querySelectorAll('input, select, textarea')]
    .filter(control => !['button', 'submit', 'reset', 'hidden', 'file'].includes(control.type))
    .filter(control => control.type !== 'radio' || control.checked)
    .filter(isVisible)
    .map(control => ({ label: labelFor(control), value: valueFor(control) }))
    .filter(row => isMeaningful(row.value));
  const resultBlocks = form => {
    const card = form.closest('.calculator-card') || form;
    return [...card.querySelectorAll('.result-panel, .cluster-result, .btu-results > div, .refrigeration-results > div, .heat-pump-results > div, .psychro-results__row')]
      .filter(isVisible);
  };
  const resultRows = form => resultBlocks(form).map(block => {
    const label = clean(block.querySelector('.psychro-results__label')?.textContent || block.querySelector(':scope > span')?.textContent || block.querySelector('span')?.textContent);
    const output = block.querySelector('output, strong, [data-result]');
    const value = clean(output?.value || output?.textContent);
    const unit = clean(block.querySelector('[data-psychro-unit]')?.textContent || block.querySelector('small')?.textContent);
    return { label, value, unit };
  }).filter(row => isMeaningful(row.label) && isMeaningful(row.value));
  const formTitle = form => clean(form.closest('.calculator-card')?.querySelector('h2')?.textContent || 'Calculator inputs');
  const noteFor = form => clean(form.querySelector('.form-message, [data-note], [data-message]')?.textContent);

  const ensureDocument = () => {
    let documentPanel = document.querySelector('[data-print-document]');
    if (documentPanel) return documentPanel;
    documentPanel = document.createElement('section');
    documentPanel.className = 'print-document';
    documentPanel.dataset.printDocument = '';
    documentPanel.setAttribute('aria-hidden', 'true');
    const main = document.querySelector('main');
    const intro = main?.querySelector('.tool-intro');
    if (intro) intro.after(documentPanel);
    else main?.prepend(documentPanel);
    return documentPanel;
  };
  const addRows = (section, rows, result) => {
    const list = document.createElement('dl');
    list.className = result ? 'print-document__results' : 'print-document__inputs';
    rows.forEach(row => {
      const item = document.createElement('div');
      appendText(item, 'dt', '', row.label);
      const value = appendText(item, 'dd', '', row.value);
      if (result && row.unit) appendText(value, 'span', 'print-document__unit', ` ${row.unit}`);
      list.append(item);
    });
    section.append(list);
  };
  const build = () => {
    const panel = ensureDocument();
    panel.replaceChildren();
    appendText(panel, 'p', 'print-document__brand', 'HVAC Tools Hub');
    appendText(panel, 'h1', '', clean(document.querySelector('h1')?.textContent || document.title));
    appendText(panel, 'p', 'print-document__url', window.location.href);
    appendText(panel, 'p', 'print-document__generated', `Printed ${new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())}`);

    const forms = [...document.querySelectorAll('.calculator-card form')].filter(form => !form.matches('[data-tool-form]'));
    forms.forEach(form => {
      const section = document.createElement('section');
      section.className = 'print-document__calculator';
      appendText(section, 'h2', '', formTitle(form));
      appendText(section, 'h3', '', 'Current inputs');
      const inputs = inputRows(form);
      if (inputs.length) addRows(section, inputs, false);
      else appendText(section, 'p', 'print-document__status', 'No printable input values are available.');
      appendText(section, 'h3', '', 'Calculated results');
      const results = resultRows(form);
      if (results.length) addRows(section, results, true);
      else appendText(section, 'p', 'print-document__status', 'No valid calculated result is available. Calculate with valid inputs before printing.');
      const note = noteFor(form);
      if (note) appendText(section, 'p', 'print-document__note', note);
      panel.append(section);
    });
    appendText(panel, 'p', 'print-document__scope', 'Planning and reference output only. Review the printed method, interpretation, and limitations below; confirm project-specific HVAC decisions with qualified professionals and applicable local requirements.');
    return { panel, valid: forms.some(form => resultRows(form).length > 0) };
  };
  const showMessage = (form, message) => {
    const target = form.querySelector('.form-message, [data-note], [data-message]');
    if (target) target.textContent = message;
  };
  const print = form => {
    const state = build();
    if (!state.valid) {
      showMessage(form, 'Calculate a valid result before printing.');
      return false;
    }
    window.requestAnimationFrame(() => window.print());
    return true;
  };
  window.HVACPrint = { build, print };

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-print-results]');
    if (!button) return;
    const form = button.closest('form');
    if (!form) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    print(form);
  }, true);

  document.querySelectorAll('.calculator-card form').forEach(form => {
    if (form.matches('[data-tool-form]')) return;
    const actions = form.querySelector('.form-actions');
    if (!actions || actions.querySelector('[data-tool-print], [data-print-results]')) return;
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'button button--secondary';
    copy.dataset.toolCopy = '';
    copy.textContent = 'Copy result';
    const printButton = document.createElement('button');
    printButton.type = 'button';
    printButton.className = 'button button--secondary';
    printButton.dataset.toolPrint = '';
    printButton.textContent = 'Print';
    copy.addEventListener('click', async () => {
      const rows = resultRows(form);
      if (!rows.length) return showMessage(form, 'Calculate a valid result before copying.');
      const text = rows.map(row => `${row.label}: ${row.value}${row.unit ? ` ${row.unit}` : ''}`).join('\n');
      try {
        await navigator.clipboard.writeText(text);
        showMessage(form, 'Results copied.');
      } catch {
        showMessage(form, 'Copy is unavailable in this browser.');
      }
    });
    printButton.addEventListener('click', () => print(form));
    actions.append(copy, printButton);
  });
})();
