const sinon = require('sinon');
const { expect } = require('chai').use(require('sinon-chai'));
const Request = require('../helpers/fake-request.js');
const Response = require('../helpers/fake-response.js');
const removeGTMCookies = require('../../utils/remove-gtm-cookies.js');

describe('Utils: remove-gtm-cookies', () => {
  it('should export a function', () => {
    expect(removeGTMCookies).to.be.a('function');
  });

  it('should remove _ga cookie', () => {
    const req = new Request();
    const res = new Response(req);
    res.clearCookie = sinon.stub();
    req.headers.cookie = 'test';
    removeGTMCookies(req, res);
    expect(res.clearCookie).to.be.calledWith('_ga', { path: '/' });
  });

  it('should remove _gid cookie', () => {
    const req = new Request();
    const res = new Response(req);
    res.clearCookie = sinon.stub();
    req.headers.cookie = 'test';
    removeGTMCookies(req, res);
    expect(res.clearCookie).to.be.calledWith('_gid', { path: '/' });
  });

  it('should remove any cookie starting with _gat', () => {
    const req = new Request();
    const res = new Response(req);
    res.clearCookie = sinon.stub();
    req.headers.cookie = 'test=test; _gat_UA-345678-1=1; egg=egg';
    removeGTMCookies(req, res);
    expect(res.clearCookie).to.be.calledWith('_gat_UA-345678-1', { path: '/' });
  });

  it('should add domain param to clearCookie() options', () => {
    const req = new Request();
    const res = new Response(req);
    res.clearCookie = sinon.stub();
    req.headers.cookie = 'test=test; _gat_UA-345678-1=1; egg=egg';
    removeGTMCookies(req, res, '.test');
    expect(res.clearCookie).to.be.calledWith('_ga', { path: '/', domain: '.test' });
    expect(res.clearCookie).to.be.calledWith('_gid', { path: '/', domain: '.test' });
    expect(res.clearCookie).to.be.calledWith('_gat_UA-345678-1', { path: '/', domain: '.test' });
  });
});
