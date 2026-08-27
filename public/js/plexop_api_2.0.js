/*
Plexop API
v2.0 | 20221115
 */
function PlexopAPIclass() {

    if ( typeof LZString === 'undefined' ) {
		LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);
	}

    var self = this;
    var urlVars = {},
        pxlVars = {},
        pixelsent = false,
        plxdrg = null,
        plxll = null,
        plxreg = null,
        isInternalPage = null;
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi, function(m, key, value) {
        urlVars[key.toLowerCase()] = value;
    });
    var esd = (function () {
        if (typeof urlVars["esd"] !== "undefined") {
            try {
                var sd = JSON.parse(LZString.decompressFromBase64(urlVars["esd"]));

                Object.keys(sd).forEach(function (sd_key) {
                    urlVars[sd_key.toLowerCase()] = sd[sd_key];
                });
            } catch (error) {
                console.log('Cannot parse esd.');
            }
        }
    }());

	var countries = { countries: [{ value: '', classname: '', text: 'Select' }, { value: 'AF', classname: '93', text: 'Afghanistan' }, { value: 'AL', classname: '355', text: 'Albania' }, { value: 'DZ', classname: '213', text: 'Algeria' }, { value: 'AS', classname: '1684', text: 'American Samoa' }, { value: 'AD', classname: '376', text: 'Andorra' }, { value: 'AO', classname: '244', text: 'Angola' }, { value: 'AI', classname: '1264', text: 'Anguilla' }, { value: 'AQ', classname: '672', text: 'Antarctica' }, { value: 'AG', classname: '1268', text: 'Antigua and Barbuda' }, { value: 'AR', classname: '54', text: 'Argentina' }, { value: 'AM', classname: '374', text: 'Armenia' }, { value: 'AW', classname: '297', text: 'Aruba' }, { value: 'AU', classname: '61', text: 'Australia' }, { value: 'AT', classname: '43', text: 'Austria' }, { value: 'AZ', classname: '994', text: 'Azerbaijan' }, { value: 'BS', classname: '1242', text: 'Bahamas' }, { value: 'BH', classname: '973', text: 'Bahrain' }, { value: 'BD', classname: '880', text: 'Bangladesh' }, { value: 'BB', classname: '1246', text: 'Barbados' }, { value: 'BY', classname: '375', text: 'Belarus' }, { value: 'BE', classname: '32', text: 'Belgium' }, { value: 'BZ', classname: '501', text: 'Belize' }, { value: 'BJ', classname: '229', text: 'Benin' }, { value: 'BM', classname: '1441', text: 'Bermuda' }, { value: 'BT', classname: '975', text: 'Bhutan' }, { value: 'BO', classname: '591', text: 'Bolivia' }, { value: 'BA', classname: '387', text: 'Bosnia and Herzegovina' }, { value: 'BW', classname: '267', text: 'Botswana' }, { value: 'BR', classname: '55', text: 'Brazil' }, { value: 'VG', classname: '1284', text: 'British Virgin Islands' }, { value: 'BN', classname: '673', text: 'Brunei' }, { value: 'BG', classname: '359', text: 'Bulgaria' }, { value: 'BF', classname: '226', text: 'Burkina Faso' }, { value: 'MM', classname: '95', text: 'Burma (Myanmar)' }, { value: 'BI', classname: '257', text: 'Burundi' }, { value: 'KH', classname: '855', text: 'Cambodia' }, { value: 'CM', classname: '237', text: 'Cameroon' }, { value: 'CA', classname: '1', text: 'Canada' }, { value: 'CV', classname: '238', text: 'Cape Verde' }, { value: 'KY', classname: '1345', text: 'Cayman Islands' }, { value: 'CF', classname: '236', text: 'Central African Republic' }, { value: 'TD', classname: '235', text: 'Chad' }, { value: 'CL', classname: '56', text: 'Chile' }, { value: 'CN', classname: '86', text: 'China' }, { value: 'CX', classname: '61', text: 'Christmas Island' }, { value: 'CC', classname: '61', text: 'Cocos (Keeling) Islands' }, { value: 'CO', classname: '57', text: 'Colombia' }, { value: 'KM', classname: '269', text: 'Comoros' }, { value: 'CK', classname: '682', text: 'Cook Islands' }, { value: 'CR', classname: '506', text: 'Costa Rica' }, { value: 'HR', classname: '385', text: 'Croatia' }, { value: 'CU', classname: '53', text: 'Cuba' }, { value: 'CY', classname: '357', text: 'Cyprus' }, { value: 'CZ', classname: '420', text: 'Czech Republic' }, { value: 'CD', classname: '243', text: 'Democratic Republic of the Congo' }, { value: 'DK', classname: '45', text: 'Denmark' }, { value: 'DJ', classname: '253', text: 'Djibouti' }, { value: 'DM', classname: '1767', text: 'Dominica' }, { value: 'DO', classname: '1809', text: 'Dominican Republic' }, { value: 'EC', classname: '593', text: 'Ecuador' }, { value: 'EG', classname: '20', text: 'Egypt' }, { value: 'SV', classname: '503', text: 'El Salvador' }, { value: 'GQ', classname: '240', text: 'Equatorial Guinea' }, { value: 'ER', classname: '291', text: 'Eritrea' }, { value: 'EE', classname: '372', text: 'Estonia' }, { value: 'ET', classname: '251', text: 'Ethiopia' }, { value: 'FK', classname: '500', text: 'Falkland Islands' }, { value: 'FO', classname: '298', text: 'Faroe Islands' }, { value: 'FJ', classname: '679', text: 'Fiji' }, { value: 'FI', classname: '358', text: 'Finland' }, { value: 'FR', classname: '33', text: 'France' }, { value: 'PF', classname: '689', text: 'French Polynesia' }, { value: 'GA', classname: '241', text: 'Gabon' }, { value: 'GM', classname: '220', text: 'Gambia' }, { value: 'GE', classname: '995', text: 'Georgia' }, { value: 'DE', classname: '49', text: 'Germany' }, { value: 'GH', classname: '233', text: 'Ghana' }, { value: 'GI', classname: '350', text: 'Gibraltar' }, { value: 'GR', classname: '30', text: 'Greece' }, { value: 'GL', classname: '299', text: 'Greenland' }, { value: 'GD', classname: '1473', text: 'Grenada' }, { value: 'GU', classname: '1671', text: 'Guam' }, { value: 'GT', classname: '502', text: 'Guatemala' }, { value: 'GN', classname: '224', text: 'Guinea' }, { value: 'GW', classname: '245', text: 'Guinea-Bissau' }, { value: 'GY', classname: '592', text: 'Guyana' }, { value: 'HT', classname: '509', text: 'Haiti' }, { value: 'VA', classname: '39', text: 'Holy See (Vatican City)' }, { value: 'HN', classname: '504', text: 'Honduras' }, { value: 'HK', classname: '852', text: 'Hong Kong' }, { value: 'HU', classname: '36', text: 'Hungary' }, { value: 'IS', classname: '354', text: 'Iceland' }, { value: 'IN', classname: '91', text: 'India' }, { value: 'ID', classname: '62', text: 'Indonesia' }, { value: 'IR', classname: '98', text: 'Iran' }, { value: 'IQ', classname: '964', text: 'Iraq' }, { value: 'IE', classname: '353', text: 'Ireland' }, { value: 'IM', classname: '44', text: 'Isle of Man' }, { value: 'IL', classname: '972', text: 'Israel' }, { value: 'IT', classname: '39', text: 'Italy' }, { value: 'CI', classname: '225', text: 'Ivory Coast' }, { value: 'JM', classname: '1876', text: 'Jamaica' }, { value: 'JP', classname: '81', text: 'Japan' }, { value: 'JO', classname: '962', text: 'Jordan' }, { value: 'KZ', classname: '7', text: 'Kazakhstan' }, { value: 'KE', classname: '254', text: 'Kenya' }, { value: 'KI', classname: '686', text: 'Kiribati' }, { value: 'KW', classname: '965', text: 'Kuwait' }, { value: 'KG', classname: '996', text: 'Kyrgyzstan' }, { value: 'LA', classname: '856', text: 'Laos' }, { value: 'LV', classname: '371', text: 'Latvia' }, { value: 'LB', classname: '961', text: 'Lebanon' }, { value: 'LS', classname: '266', text: 'Lesotho' }, { value: 'LR', classname: '231', text: 'Liberia' }, { value: 'LY', classname: '218', text: 'Libya' }, { value: 'LI', classname: '423', text: 'Liechtenstein' }, { value: 'LT', classname: '370', text: 'Lithuania' }, { value: 'LU', classname: '352', text: 'Luxembourg' }, { value: 'MO', classname: '853', text: 'Macau' }, { value: 'MK', classname: '389', text: 'Macedonia' }, { value: 'MG', classname: '261', text: 'Madagascar' }, { value: 'MW', classname: '265', text: 'Malawi' }, { value: 'MY', classname: '60', text: 'Malaysia' }, { value: 'MV', classname: '960', text: 'Maldives' }, { value: 'ML', classname: '223', text: 'Mali' }, { value: 'MT', classname: '356', text: 'Malta' }, { value: 'MH', classname: '692', text: 'Marshall Islands' }, { value: 'MR', classname: '222', text: 'Mauritania' }, { value: 'MU', classname: '230', text: 'Mauritius' }, { value: 'YT', classname: '262', text: 'Mayotte' }, { value: 'MX', classname: '52', text: 'Mexico' }, { value: 'FM', classname: '691', text: 'Micronesia' }, { value: 'MD', classname: '373', text: 'Moldova' }, { value: 'MC', classname: '377', text: 'Monaco' }, { value: 'MN', classname: '976', text: 'Mongolia' }, { value: 'ME', classname: '382', text: 'Montenegro' }, { value: 'MS', classname: '1664', text: 'Montserrat' }, { value: 'MA', classname: '212', text: 'Morocco' }, { value: 'MZ', classname: '258', text: 'Mozambique' }, { value: 'NA', classname: '264', text: 'Namibia' }, { value: 'NR', classname: '674', text: 'Nauru' }, { value: 'NP', classname: '977', text: 'Nepal' }, { value: 'NL', classname: '31', text: 'Netherlands' }, { value: 'AN', classname: '599', text: 'Netherlands Antilles' }, { value: 'NC', classname: '687', text: 'New Caledonia' }, { value: 'NZ', classname: '64', text: 'New Zealand' }, { value: 'NI', classname: '505', text: 'Nicaragua' }, { value: 'NE', classname: '227', text: 'Niger' }, { value: 'NG', classname: '234', text: 'Nigeria' }, { value: 'NU', classname: '683', text: 'Niue' }, { value: 'KP', classname: '850', text: 'North Korea' }, { value: 'MP', classname: '1670', text: 'Northern Mariana Islands' }, { value: 'NO', classname: '47', text: 'Norway' }, { value: 'OM', classname: '968', text: 'Oman' }, { value: 'PK', classname: '92', text: 'Pakistan' }, { value: 'PW', classname: '680', text: 'Palau' }, { value: 'PA', classname: '507', text: 'Panama' }, { value: 'PG', classname: '675', text: 'Papua New Guinea' }, { value: 'PY', classname: '595', text: 'Paraguay' }, { value: 'PE', classname: '51', text: 'Peru' }, { value: 'PH', classname: '63', text: 'Philippines' }, { value: 'PN', classname: '870', text: 'Pitcairn Islands' }, { value: 'PL', classname: '48', text: 'Poland' }, { value: 'PT', classname: '351', text: 'Portugal' }, { value: 'PR', classname: '1', text: 'Puerto Rico' }, { value: 'QA', classname: '974', text: 'Qatar' }, { value: 'CG', classname: '242', text: 'Republic of the Congo' }, { value: 'RO', classname: '40', text: 'Romania' }, { value: 'RU', classname: '7', text: 'Russia' }, { value: 'RW', classname: '250', text: 'Rwanda' }, { value: 'BL', classname: '590', text: 'Saint Barthelemy' }, { value: 'SH', classname: '290', text: 'Saint Helena' }, { value: 'KN', classname: '1869', text: 'Saint Kitts and Nevis' }, { value: 'LC', classname: '1758', text: 'Saint Lucia' }, { value: 'MF', classname: '1599', text: 'Saint Martin' }, { value: 'PM', classname: '508', text: 'Saint Pierre and Miquelon' }, { value: 'VC', classname: '1784', text: 'Saint Vincent and the Grenadines' }, { value: 'WS', classname: '685', text: 'Samoa' }, { value: 'SM', classname: '378', text: 'San Marino' }, { value: 'ST', classname: '239', text: 'Sao Tome and Principe' }, { value: 'SA', classname: '966', text: 'Saudi Arabia' }, { value: 'SN', classname: '221', text: 'Senegal' }, { value: 'RS', classname: '381', text: 'Serbia' }, { value: 'SC', classname: '248', text: 'Seychelles' }, { value: 'SL', classname: '232', text: 'Sierra Leone' }, { value: 'SG', classname: '65', text: 'Singapore' }, { value: 'SK', classname: '421', text: 'Slovakia' }, { value: 'SI', classname: '386', text: 'Slovenia' }, { value: 'SB', classname: '677', text: 'Solomon Islands' }, { value: 'SO', classname: '252', text: 'Somalia' }, { value: 'ZA', classname: '27', text: 'South Africa' }, { value: 'KR', classname: '82', text: 'South Korea' }, { value: 'ES', classname: '34', text: 'Spain' }, { value: 'LK', classname: '94', text: 'Sri Lanka' }, { value: 'SD', classname: '249', text: 'Sudan' }, { value: 'SR', classname: '597', text: 'Suriname' }, { value: 'SZ', classname: '268', text: 'Swaziland' }, { value: 'SE', classname: '46', text: 'Sweden' }, { value: 'CH', classname: '41', text: 'Switzerland' }, { value: 'SY', classname: '963', text: 'Syria' }, { value: 'TW', classname: '886', text: 'Taiwan' }, { value: 'TJ', classname: '992', text: 'Tajikistan' }, { value: 'TZ', classname: '255', text: 'Tanzania' }, { value: 'TH', classname: '66', text: 'Thailand' }, { value: 'TL', classname: '670', text: 'Timor-Leste' }, { value: 'TG', classname: '228', text: 'Togo' }, { value: 'TK', classname: '690', text: 'Tokelau' }, { value: 'TO', classname: '676', text: 'Tonga' }, { value: 'TT', classname: '1868', text: 'Trinidad and Tobago' }, { value: 'TN', classname: '216', text: 'Tunisia' }, { value: 'TR', classname: '90', text: 'Turkey' }, { value: 'TM', classname: '993', text: 'Turkmenistan' }, { value: 'TC', classname: '1649', text: 'Turks and Caicos Islands' }, { value: 'TV', classname: '688', text: 'Tuvalu' }, { value: 'UG', classname: '256', text: 'Uganda' }, { value: 'UA', classname: '380', text: 'Ukraine' }, { value: 'AE', classname: '971', text: 'United Arab Emirates' }, { value: 'GB', classname: '44', text: 'United Kingdom' }, { value: 'US', classname: '1', text: 'United States' }, { value: 'UY', classname: '598', text: 'Uruguay' }, { value: 'VI', classname: '1340', text: 'US Virgin Islands' }, { value: 'UZ', classname: '998', text: 'Uzbekistan' }, { value: 'VU', classname: '678', text: 'Vanuatu' }, { value: 'VE', classname: '58', text: 'Venezuela' }, { value: 'VN', classname: '84', text: 'Vietnam' }, { value: 'WF', classname: '681', text: 'Wallis and Futuna' }, { value: 'YE', classname: '967', text: 'Yemen' }, { value: 'ZM', classname: '260', text: 'Zambia' }, { value: 'ZW', classname: '263', text: 'Zimbabwe' }] };
    
    /**
     * plexopFields keeps a list of parameters that will be appended to the lead URL
     * plexopExtraFields keeps a list of parameters that will be appended to 'ext' parameter
     * @type {Object}
     */
    this.formId = "";
    this.plexopFields = {};
    this.plexopExtraFields = {};

    // Prod configuration
    plexop.cdn_host = "serving.visionsage.com/";
    plexop.loggerURL = "logger.visionsage.com";
    plexop.loggerBURL = "logger.poxlep.com";
    plexop.aservingUrl = "//serving.visionsage.com/aserving/";
    plexop.set_logger_url(plexop.loggerURL);
    plexop.set_cdn_host(plexop.cdn_host);    


    PlexopAPIclass.a = '';
    PlexopAPIclass.adv = '';
    PlexopAPIclass.unknown = '';
	PlexopAPIclass.funnel = '';
    PlexopAPIclass.bdomain = '';
    PlexopAPIclass.basicFields = '';
    PlexopAPIclass.extraFields = '';
    PlexopAPIclass.compressExtraDataBool = true;
    PlexopAPIclass.isNativeClient = false;
    /**
     * isFunction checks if the parameter is a function
     * @param {function} name 
     * @return {Boolean} 
     */
    var isFunction = function(name) {
        if (name && typeof name == 'function') {
            return true;
        }
    }
    
    
    

    PlexopAPIclass.prototype.setIsNativeClient = function(aValue) {
        PlexopAPIclass.isNativeClient = aValue;
    }

    PlexopAPIclass.prototype.setA = function(aValue) {
        PlexopAPIclass.a = aValue;
        isInternalPage = null;
    }

    PlexopAPIclass.prototype.getA = function() {
        return PlexopAPIclass.a;
    }

    PlexopAPIclass.prototype.setAdvertiser = function(advValue) {
        PlexopAPIclass.adv = advValue;
    }

    PlexopAPIclass.prototype.getAdvertiser = function() {
        return PlexopAPIclass.adv;
    }

    PlexopAPIclass.prototype.setUnknown = function(unknownValue) {
        PlexopAPIclass.unknown = unknownValue;
    }

    PlexopAPIclass.prototype.getUnknown = function() {
        return PlexopAPIclass.unknown;
    }

    PlexopAPIclass.prototype.getFunnel = function () {
        var _f = plexop.get_current_dsp(PlexopAPI.getUnknown()).split(",")[0];
        PlexopAPIclass.funnel = (_f != "undefined") ? _f : PlexopAPI.getUnknown();
        return PlexopAPIclass.funnel;
    }
    
    PlexopAPIclass.prototype.setBdomain = function(bdomainValue) {
		if (bdomainValue && typeof bdomainValue === 'string' && bdomainValue !== 'auto') {
            PlexopAPIclass.bdomain = bdomainValue;
        } else {
            PlexopAPIclass.bdomain = this.getTopDomain();
        }
    }

    PlexopAPIclass.prototype.getBdomain = function() {
        return PlexopAPIclass.bdomain;
    }

    PlexopAPIclass.prototype.setCallback = function(funcName) {
        PlexopAPIclass.callbackFuncName = funcName;
    }

    PlexopAPIclass.prototype.getCallback = function() {
        return PlexopAPIclass.callbackFuncName;
    }

    PlexopAPIclass.prototype.getUrlVars = function() {
        return urlVars;
    }

    PlexopAPIclass.prototype.getLeadPixel = function(newLeadPixel) {
        var a = PlexopAPIclass.a,
            adv = PlexopAPIclass.adv,
            unknown = PlexopAPIclass.unknown;

        if(typeof newLeadPixel !== 'undefined' && newLeadPixel == true){
          plxll = plexop.get_lead_log(a, adv, unknown);
        }
        return plxll;
    }

    PlexopAPIclass.prototype.setVisitCallback = function(callbackFuncName) {
        PlexopAPIclass.visitCallback = callbackFuncName;
    }    

    PlexopAPIclass.prototype.getVisitCallback = function() {
        return PlexopAPIclass.visitCallback;
    }

    /**
     * addPixelData adds data to the pixed and if 
     * key exist replace its value with new one
     *
     * @param Object data;
     *       Ex:  var data = { KEY : VALUE }
     */
    PlexopAPIclass.prototype.addPixelData = function(data) {

        if( typeof data === 'object' ) {

            for(var key in data) {
                if (data.hasOwnProperty(key)) {

                    if(plxll.indexOf('&' + key + '=') > -1) { 
                        // if given key exist in the pixel replace its value
                        // with the new one

                        var replace = '(&' + key + '=)(.+?)(&)';
                        var regExp = new RegExp(replace, "g");

                        plxll = plxll.replace(regExp, '&' + key + '=' + data[key] + '&');

                    } else {

                        plxll = plxll + '&' + key + '=' + data[key];
                    
                    }

                }
            }
        }

    }

    /**
     * extendLead changes "e"
     */
    PlexopAPIclass.prototype.extendLead = function(eParam, keepEid) {

        var e = 21;
        if (eParam) {
            e = eParam;
        }
        var obj = {"e":e};
        if (typeof keepEid === "undefined" || !keepEid){
            obj.eid = plexop.generate_uuid();
        }
      
        self.addPixelData(obj);
        self.SendLead();
    }


    /**
     * sendVisit sends the visit pixel with the basic plexop parameters
     */
    PlexopAPIclass.prototype.sendVisit = function(url) {
        var a = PlexopAPIclass.a,
        adv = PlexopAPIclass.adv,
            unknown = PlexopAPIclass.unknown,
            bdomain = PlexopAPIclass.bdomain;

        
        if (url) {
            plexop.log_visit(a, adv, unknown, null, null, null, null, null, bdomain, isInternalPage, url);
        }
        else {
            plexop.log_visit(a, adv, unknown, null, null, null, null, null, bdomain, isInternalPage);
        }
        isInternalPage = true;
        plxll = plexop.get_lead_log(a, adv, unknown);
        plxreg = plexop.get_registration_log(a, adv, unknown);
        plxdrg = plexop.get_demo_registration_log(a, adv, unknown);
        
        if (plexop.get_Cookie('__ppx')) {
            var ppx = decodeURIComponent(plexop.get_Cookie('__ppx'));
            plexop.add_iframe(ppx);
            plexop.delete_Cookie('__ppx', '/', bdomain);

            setTimeout(function () {
                var ppx_iframe = document.querySelector('[src="' + ppx + '"]');
                ppx_iframe.remove();
            }, 15000);
        }

        if (PlexopAPIclass.isNativeClient && !plexop.get_Cookie('instid') )
        {
            if (typeof urlVars['instid'] == 'undefined' || urlVars['instid'] ==undefined || urlVars['instid']=="" || !urlVars['instid']) {
                urlVars['instid']=plexop.generate_uuid();
            }
            plexop.log_install(a, adv, null, null, null, unknown, null,urlVars['instid']);
            plexop.set_Cookie('instid',urlVars['instid'],plexop.cookie_expiery,"/",bdomain,false);
        }
        if (isFunction(self.getVisitCallback())) {
            self.getVisitCallback()();
        }
    }

    /**
     * setPlexopField adds a parameter to the plexopFields object
     * @param {string} fieldName is the name of the parameter
     * @param {string} fieldValue can be a DOM element id, a static value or a callback function
     */
    PlexopAPIclass.prototype.setPlexopField = function(fieldName, fieldValue) {
        this.plexopFields[fieldName] = fieldValue;
        try {
            if (typeof urlVars[fieldName] !== 'undefined') {
                this.setVal(fieldValue, decodeURIComponent(urlVars[fieldName]));
            }
        } catch (e) {}
    }

    /**
     * setPlexopExtraField adds a parameter to the plexopExtraFields object
     * @param {string} fieldName is the name of the parameter
     * @param {string} fieldValue can be a DOM element id, a static value or a callback function
     */
    PlexopAPIclass.prototype.setPlexopExtraField = function(fieldName, fieldValue) {
        this.plexopExtraFields[fieldName] = fieldValue;
    }

    /**
     * setCountryList loads the countries in the country select field
     */
    PlexopAPIclass.prototype.setCountryList = function() {
        var selectCountryList = document.getElementById(this.plexopFields['country']);
        for (var k in countries['countries']) {
            if(countries['countries'].hasOwnProperty(k)) {
                var country_option = document.createElement('option');
                country_option.value = countries['countries'][k].value;
                country_option.text = countries['countries'][k].text;
                country_option.className = countries['countries'][k].classname;
                selectCountryList.add(country_option);
            }
        }
        if ('country' in urlVars && urlVars.country) {
            var ss = {
                country: urlVars['country'].toUpperCase(),
                ip: ''
            };
            self.chooseCountry(ss);
        } else {
            self.loadFile('//apps.visionsage.com/gc.js', 'js');
        }
    }

    PlexopAPIclass.prototype.chooseCountry = function(ss) {
        try {
            var elmnt = document.getElementById(this.plexopFields['country']);
            if (elmnt.selectedIndex > 0) {
                return;
            }
            if (ss.country != '') {
                for (var i = 0; i < elmnt.options.length; i++) {
                    if (elmnt.options[i].value == ss.country) {
                        elmnt.selectedIndex = i;
                        try {
                            if (typeof elmnt.onchange == "function")
                                elmnt.onchange();
                        } catch (e) {}
                        break;
                    }
                }
            }
        } catch (e) { console.log(e.message); }
    }

    /**
     * loadFile loads a css or js file in the head of the document
     * @param  {string} filename 
     * @param  {string} filetype 
     */
    PlexopAPIclass.prototype.loadFile = function(filename, filetype) {
        if (filetype == 'js') {
            var fileref = document.createElement('script')
            fileref.setAttribute('type', 'text/javascript')
            fileref.setAttribute('src', filename)
        } else if (filetype == 'css') {
            var fileref = document.createElement('link')
            fileref.setAttribute('rel', 'stylesheet')
            fileref.setAttribute('type', 'text/css')
            fileref.setAttribute('href', filename)
        }
        if (typeof fileref != 'undefined')
            document.getElementsByTagName('head')[0].appendChild(fileref)
    }


    /**
     * setVal returns the calculated value of a parameter in the plexopField list
     * @param  {string} formFieldID 
     * @param  {string} fieldValue 
     */
    PlexopAPIclass.prototype.setVal = function(formFieldID, fieldValue) {
        //found element by id
        if (isFunction(formFieldID)) {
            return;
        } else {
            /*find by id*/
            var field = document.getElementById(formFieldID)
            if (field) {
                if (field.tagName === 'INPUT') {
                    field.value = fieldValue;
                } else if (field.tagName === 'SELECT') {
                    for (var i = 0; i < field.options.length; i++) {
                        if (field.options[i].value.toUpperCase() == fieldValue.toUpperCase()) { // case INsensitive 
                            field.selectedIndex = i;
                        }
                    }
                } else {
                    /*find by name*/
                    field = document.getElementsByName(formFieldID);
                    if (field.length > 0 && field[0].type === "radio") {
                        for (var i = 0; i < field.length; i++) {
                            if (fieldValue = field[i].value) {
                                field[i].checked = "checked";
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * getVal returns the calculated value of a parameter in the plexopField list
     * @param  {string} formFieldID 
     * @param  {string} plexopParameterName 
     * @return {string} 
     */
    PlexopAPIclass.prototype.getVal = function(formFieldID, plexopParameterName) {
        var fieldValue = "";
        var answer = "";
        //found element by id
        if (isFunction(formFieldID)) {
            fieldValue = formFieldID();
        } else {
            /*find by id*/
            var field = document.getElementById(formFieldID)
            if (field) {
                if (field.tagName === 'INPUT') {
                    fieldValue = field.value;
                } else if (field.tagName === 'SELECT') {
                    fieldValue = field.options[field.selectedIndex].value;
                }
            } else {
                /*find by name*/
                field = document.getElementsByName(formFieldID);
                if (field.length > 0 && field[0].type === "radio") {
                    for (var i = 0; i < field.length; i++) {
                        if (field[i].checked) {
                            fieldValue = field[i].value;
                        }
                    }
                } else if (formFieldID != undefined)
                    fieldValue = formFieldID;
                else
                    fieldValue = "";
            }
        }
        if (plexopParameterName != undefined) {
            answer = plexopParameterName + "=";
			answer += fieldValue;
        }
        else
			answer = fieldValue;
        return answer;
    }

    /**
     * getPlexopExtraFields gets the plexopExtraFields object as a JSON string and compresses it to Base64
     * @return {string} 
     */
    PlexopAPIclass.prototype.getPlexopExtraFields = function() {
        var obj = this.plexopExtraFields,
            objToCompress = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                objToCompress[prop] = this.getVal(obj[prop]);
            }
        }
        if (Object.keys(objToCompress).length > 0) {
            PlexopAPIclass.extraFields = JSON.stringify(objToCompress);
            if (PlexopAPIclass.compressExtraDataBool) {
                PlexopAPIclass.extraFields = LZString.compressToBase64(PlexopAPIclass.extraFields);
            }
        }
        return PlexopAPIclass.extraFields;
    }

    /**
     * getPlexopFieldsAsUrlParams returns the plexopFields object as a url string
     * @return {string} 
     */
    PlexopAPIclass.prototype.getPlexopFieldsAsUrlParams = function() {
        var pairs = [],
            obj = this.plexopFields,
            fullname = obj['fullname'],
            firstname = '',
            lastname = '',
            mobile = obj['mobile'],
            mobileCountryPhone = obj['mobilecountryphone'],
            mobileVal = this.getVal(mobile),
            mobileCountryPhoneVal = this.getVal(mobileCountryPhone),
            selectField = document.getElementById(obj['country']);
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (obj[prop] == fullname) {
                    fullname = this.getVal(fullname).replace(/^\s+|\s+$/g, '').split(' ');
                    firstname = fullname.shift();
                    lastname = fullname.join(' ');
                    pairs.push('name=' + firstname);
                    pairs.push('lastname=' + lastname);
                } else if (obj[prop] == mobile) {
                    if (mobileVal.substring(0, 1) == '+') {
                        mobileVal = mobileVal.substring(1);
                    }
                    if (mobileVal.substring(0, 2) == '00') {
                        mobileVal = mobileVal.substring(2);
                    }
                    if (mobileVal.substring(0, mobileCountryPhoneVal.length) == mobileCountryPhoneVal) {
                        mobileVal = mobileVal;
                    } else {
                        mobileVal = mobileCountryPhoneVal + mobileVal;
                    }
                    pairs.push('mobile=' + mobileVal);
                } else {
                    pairs.push(this.getVal(obj[prop], prop));
                }
            }
        }
        PlexopAPIclass.basicFields = pairs.join('&');
        return PlexopAPIclass.basicFields;
    }

    /**
     * addSendLeadCallbackFunction checks if there's a callback function and 
     * if true it calls it after the lead pixels have been sent, and submits the form
     */
    PlexopAPIclass.prototype.addSendLeadCallbackFunction = function() {

        if (isFunction(self.getCallback())) {
            self.getCallback()();
        } else {
            pixelsent = true;
        }
        if (typeof formId != 'undefined') {
            setTimeout(function(formId) {
                try {
                    document.getElementById(formId).submit();
                } catch (err) {}
            }, 1500, self.formId);
        }
    }


    /**
     * setLoggerURL sets the lead pixel domain and returns the built URL
     * @param {string} logger can be 'plexop' or 'poxlep'
     */
    PlexopAPIclass.prototype.setLoggerURL = function(logger) {
        var loggerURL = '',
            myUrl;
        if (logger == 'plexop') {
            loggerURL = '//logger.visionsage.com/';
            if (plexop.loggerURL) {
                loggerURL = plexop.protocol + plexop.loggerURL;
            }
        } else {
            loggerURL = '//logger.poxlep.com';
            if (plexop.loggerBURL) {
                loggerURL = plexop.protocol + plexop.loggerBURL;
            }
        }

        urlEncodedExtraFields = encodeURIComponent(PlexopAPIclass.extraFields);
        myUrl = loggerURL + plxll + '&' + PlexopAPIclass.basicFields + '&ext=' + urlEncodedExtraFields;
        return myUrl;
    }

    /**
     * Returns EID
     */
    PlexopAPIclass.prototype.getEID = function() {

        var pxlParts = plxll.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            pxlVars[key.toLowerCase()] = value;
        });

        return pxlVars['eid'];
    }

    /**
     * SendLead sends the lead pixels to the loggers and calls a callback function after that
     */
    PlexopAPIclass.prototype.SendLead = function() {
        this.getPlexopFieldsAsUrlParams();
        this.getPlexopExtraFields();
        var leadUrl1 = this.setLoggerURL('plexop'),
            leadUrl2 = this.setLoggerURL('poxlep');
        plexop.send(leadUrl1, self.getCallback());
        plexop.send(leadUrl2, self.getCallback());
        plexop.sendPublishLeadPixel(PlexopAPIclass.a, PlexopAPIclass.adv, plexop.get_current_uuid());


    }

    /**
     * 
     * @param  {boolean} compress extra data (true by default)
     */
    PlexopAPIclass.prototype.compressExtraData = function(bool) {
        PlexopAPIclass.compressExtraDataBool = bool;
    }

    PlexopAPIclass.prototype.startPlexopAction = function() {
        self.SendLead();
    }

    /**
     * getForm calls the startPlexopAction function on form submit
     */
    PlexopAPIclass.prototype.getForm = function() {
        var form = document.getElementById(this.formId);
        form.addEventListener('submit', this.startPlexopAction, false);
    }


    PlexopAPIclass.prototype.setForm = function(formId) {
        this.formId = formId;
        document.getElementById(this.formId).addEventListener('submit', this.startPlexopAction, false);
    }

	PlexopAPIclass.prototype.getTopDomain = function () {
        var i, h,
            test_cookie = 'test_top_level_domain=cookie',
            hostname = document.location.hostname.split('.');
        for (i = hostname.length - 1; i >= 0; i--) {
            h = hostname.slice(i).join('.');
            document.cookie = test_cookie + ';domain=.' + h + ';';
            if (document.cookie.indexOf(test_cookie) > -1) {
                document.cookie = test_cookie.split('=')[0] + '=;domain=.' + h + ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                return h;
            }
        }
    }

}

var PlexopAPI = new PlexopAPIclass();

var isNativeClient = function isNativeClient() {
    var userAgent = window.navigator.userAgent;
    return (
        userAgent.indexOf("TT-WRAPPER-ANDROID") != -1 ||
        userAgent.indexOf("TT-WRAPPER-IOS") != -1
    );
};

if (isNativeClient()) {
    PlexopAPI.setIsNativeClient(true);
}

function chooseCountry(ss) {
    PlexopAPI.chooseCountry(ss);
}