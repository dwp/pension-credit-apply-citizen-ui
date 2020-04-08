const { expect } = require('chai');
const escapeHtml = require('../../utils/escape-html.js');

describe('Utils: escape-html', () => {
  it('should export a function', () => {
    expect(escapeHtml).to.be.a('function');
  });

  it('should not throw error if input is a string', () => {
    expect(() => escapeHtml('Hello')).to.not.throw();
  });

  it('should throw error if input is not a string', () => {
    expect(() => escapeHtml(123)).to.throw(TypeError, 'Expected string got number: 123');
  });

  it('should escape < to &lt;', () => {
    expect(escapeHtml('<')).to.equal('&lt;');
  });

  it('should escape > to &gt;', () => {
    expect(escapeHtml('>')).to.equal('&gt;');
  });

  it('should escape & to &amp;', () => {
    expect(escapeHtml('&')).to.equal('&amp;');
  });

  it('should escape \' to &#39;', () => {
    expect(escapeHtml('\'')).to.equal('&#39;');
  });

  it('should escape " to &quot;', () => {
    expect(escapeHtml('"')).to.equal('&quot;');
  });

  it('should not escape other chacters', () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@£$%^*()_+-={}[]\\|;:,./`~';
    expect(escapeHtml(chars)).to.equal(chars);
  });

  it('should return empty string if passed undefined', () => {
    expect(escapeHtml()).to.equal('');
  });
});
