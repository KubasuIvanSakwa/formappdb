// c:\Users\ADMIN\Desktop\Node js\formapp_db\models\Client.js
import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  // Core Identifiers
  clientID: { type: String, required: true, unique: true },
  clientType: String,
  segmentType: String,
  subSegment: String,
  appID: String,
  clientClass: String,
  clientName: String,
  baseID: String,

  // Business Details
  companyName: String,
  lineOfBusiness: String,
  lobInfo: String,
  natureOfBusiness: String,
  idType: String,
  regNo: String,
  regDate: String,
  registeredAt: String,
  registeredOffice: String,
  businessStarted: String,
  employees: String,
  comments: String,
  website: String,

  // Account Info
  openedBy: String,
  relationManager: String,
  openedOn: String,
  tinNumber: String,

  // Addresses
  resAddress: String,
  busAddress: String,
  offAddress: String,
  mailAddress: String,
  homeCountryAddress: String,
  address2: String,
  region1: String,
  street: String,
  country: String,
  zipCode: String,
  region2: String,
  ward: String,
  district: String,

  // Contact Info
  phoneHome: String,
  phoneWork: String,
  mobile: String,
  fax: String,
  email: String,
  landMark: String,

  // Booleans / Switches
  canSendGreetings: { type: Boolean, default: false },
  canSendAssocOffers: { type: Boolean, default: false },
  canSendOurOffers: { type: Boolean, default: false },
  statementOnline: { type: Boolean, default: false },
  mobileAlert: { type: Boolean, default: false },

  // BTS Status Fields
  btsStatus: String,
  btsOpenDate: String,
  btsClosedDate: String,
  btsCreatedBy: String,
  btsModifiedBy: String,
  btsSupervisedBy: String,
  btsCreatedOn: String,
  btsModifiedOn: String,
  btsSupervisedOn: String

}, { timestamps: true });

const Client = mongoose.model('client', clientSchema);

export default Client;