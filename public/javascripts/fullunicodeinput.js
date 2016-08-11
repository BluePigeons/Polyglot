
//////read the udata file properly
var udata = document.getElementById("udata").text;

alert(udata);

var uD = [];
var lines = udata.split('\n');
for(var i=0; i < lines.length; i++) {
      var entry = lines[i].split(';');
      entry[14] = entry[14].replace('\n', '');
      var code = parseInt(entry[0],16);
      uD[code] = {
		   na: entry[1],
		   gc: entry[2],
		   cc: entry[3],
		   bc: entry[4],
		   dt: entry[5],
		   nv1: entry[6],
		   nv: entry[7],
		   nv3: entry[8],
		   bi: entry[9],
		   na1: entry[10],
		   is: entry[11],
		   suc: entry[12],
		   sl: entry[13],
		   stc: entry[14]
      };
}
fixRange(0x3400, 0x4DB5);
fixRange(0x4E00, 0x9FCC);
fixRange(0xAC00, 0xD7A3);
fixRange(0xD800, 0xDB7F);
fixRange(0xDB80, 0xDBFF);
fixRange(0xDC00, 0xDFFF);
fixRange(0xE000, 0xF8FF);
fixRange(0x20000, 0x2A6D6);
fixRange(0x2A700, 0x2B734);
fixRange(0x2B740, 0x2B81D);
fixRange(0xF0000, 0xFFFFD);
fixRange(0x100000, 0x10FFFD);

function fixRange(first, last) {
  var i;
  var desc = uD[first].na.replace(/, First/, '');
  var cat = uD[first].gc;
  for(i = first; i <= last; i++) {
      uD[i] = {
		   na: desc,
		   gc: cat
              }
    }
}

var startPosition;

var cgName = {
  Cc: 'Other, control',
  Cf: 'Other, format',
  Cs: 'Other, surrogate',
  Co: 'Other, private use',
  Cn: 'Other, not assigned'
};

var hexMax = 0x10FFFF;
var theData = document.getElementById('testingKeys');
var instr = document.getElementById('instr');

function addstr(addition) {
  theData.value += addition;
}

function add(code) {
  addstr(fixedFromCharCode(code)); 
}

function fixedFromCharCode (codePt) {
    if (codePt > 0xFFFF) {
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 +
(codePt & 0x3FF));
    }
    else {
        return String.fromCharCode(codePt);
    }
}

function addByCode() {
  var val = parseInt(document.getElementById('hexcode').value, 16);
  if(!isNaN(val) && val >= 0 && val <= 0x10FFFF) {
    add(val);
  } else {
    alert('Incorrect hexadecimal value');
  }    
}

function handleKeyPress(e, func){
var key = e.keyCode || e.which;
if (key == 13){
  func();
  }
}

function clicked(elem, code) {
  elem.style.borderStyle = 'inset';
  add(code);
  setTimeout(function() { elem.style.borderStyle = 'outset';}, 300);
}

function addnewline() {
  addstr("\n");
}

function clearthem() {
  if(confirm("Really erase everything?")) {
    theData.value = '';
  }
}

function delchar() {
  var len = theData.value.length;
  if(lowSurrogate(theData.value.charCodeAt(len-1)) &&
     highSurrogate(theData.value.charCodeAt(len-2))) {
    theData.value = theData.value.substr(0, len - 2); }
  else {
    theData.value = theData.value.substr(0, len - 1); }
}

function showInstr() {
  instr.style.display = 'block';
  instrCtrl.innerHTML = 'Hide instructions';
  instrCtrl.onclick = hideInstr;
}

function hideInstr() {
  instr.style.display = 'none';
  instrCtrl.onclick = showInstr;
  instrCtrl.innerHTML = 'Instructions';
}

function htmlChar(num) {
  if(num == 0) {
    return ' ';
  } else if(num >= 0x7F && num <= 0x9F) {
    return '\xA0';
  } else if(num < 0x10000) {
    return String.fromCharCode(num);
  } else {
    return '&#' + thisPos + ';'; 
  }
}

function buildTheMap() {
  buildMap(document.getElementById('ucode').value);
  document.getElementById('blockMenu').selectedIndex = 0;
}

function buildMap(startPos, endPos) {

var nRows = 16;
if(endPos) {
  nRows = (endPos - startPos) / 16;
  }

startPosition = parseInt(startPos, 16);
document.getElementById('next').disabled = startPosition > 0x10FF00;
document.getElementById('prev').disabled = startPosition <= 0x000F;

var startRow = startPos.substr(0, startPos.length - 1);
var basePos = parseInt(startRow, 16);
if(isNaN(basePos) || basePos < 0 || basePos > 0x10FFF) {
  alert('Incorrect hexadecimal value');
  return;
}

var categ, categ1, annotation, chClass;
var rows = document.getElementById('mapPopupBody').children;

for(row=0; row < nRows; row++) {
  var rowno = row.toString(16);
  rowno = rowno.toUpperCase();
  var start = basePos + row;
  rows[row].children[0].innerHTML = pad(start.toString(16).toUpperCase(), 3) + '.';
  for(col = 0; col < 0x10; col++) {
    thisPos = (basePos-0)*16 + (row*16-0) + (col-0);
    alert("the pos is "+thisPos);
    categ = uD[thisPos] ? uD[thisPos].gc : 'Cn';
    categ1 = categ.charAt(0);
    annotation = (categ1 !== 'C') ? '' : ' (' + cgName[categ] + ')';
    chClass =
      thisPos > 0x10FFFF ? 'outside' :
      categ === 'Cn' ? 'unassigned' : categ1 === 'C' ? 'control' : 'normal';
    rows[row].children[col+1].innerHTML =
thisPos > 0x10FFFF ? 
  '<div class=outside> </div>'  
:
  '<div class="c ' + chClass + '"' +
  'data-info="' + uName(thisPos) + annotation + '" ' +
  'onclick="clicked(this,' + thisPos + ')"' +
  '>' +
  htmlChar(thisPos) + '</div>';
    }
  }
}     
            
buildMap('0000');
setSelect();
document.getElementById('blockMenu').selectedIndex = 1;

function setSelect() {

var doc ='';

function opt(start, end, name) {
  doc += '<option value="' + start + '"';
  doc += '>' + name;
}

function group(name) {
  doc += '<optgroup label="' + name + '">';
}

doc += '<select id="blockMenu" onchange="buildMap(this.options[this.selectedIndex].value)">';

// Data from: http://www.unicode.org/Public/UCD/latest/ucd/Blocks.txt 
// Use an editor to generate opt() calls and add group() calls manually (for each plane).

group('Basic Multilingual Plane');
opt('0000', '007F', 'Basic Latin');
opt('0080', '00FF', 'Latin-1 Supplement');
opt('0100', '017F', 'Latin Extended-A');
opt('0180', '024F', 'Latin Extended-B');
opt('0250', '02AF', 'IPA Extensions');
opt('02B0', '02FF', 'Spacing Modifier Letters');
opt('0300', '036F', 'Combining Diacritical Marks');
opt('0370', '03FF', 'Greek and Coptic');
opt('0400', '04FF', 'Cyrillic');
opt('0500', '052F', 'Cyrillic Supplement');
opt('0530', '058F', 'Armenian');
opt('0590', '05FF', 'Hebrew');
opt('0600', '06FF', 'Arabic');
opt('0700', '074F', 'Syriac');
opt('0750', '077F', 'Arabic Supplement');
opt('0780', '07BF', 'Thaana');
opt('07C0', '07FF', 'NKo');
opt('0800', '083F', 'Samaritan');
opt('0840', '085F', 'Mandaic');
opt('08A0', '08FF', 'Arabic Extended-A');
opt('0900', '097F', 'Devanagari');
opt('0980', '09FF', 'Bengali');
opt('0A00', '0A7F', 'Gurmukhi');
opt('0A80', '0AFF', 'Gujarati');
opt('0B00', '0B7F', 'Oriya');
opt('0B80', '0BFF', 'Tamil');
opt('0C00', '0C7F', 'Telugu');
opt('0C80', '0CFF', 'Kannada');
opt('0D00', '0D7F', 'Malayalam');
opt('0D80', '0DFF', 'Sinhala');
opt('0E00', '0E7F', 'Thai');
opt('0E80', '0EFF', 'Lao');
opt('0F00', '0FFF', 'Tibetan');
opt('1000', '109F', 'Myanmar');
opt('10A0', '10FF', 'Georgian');
opt('1100', '11FF', 'Hangul Jamo');
opt('1200', '137F', 'Ethiopic');
opt('1380', '139F', 'Ethiopic Supplement');
opt('13A0', '13FF', 'Cherokee');
opt('1400', '167F', 'Unified Canadian Aboriginal Syllabics');
opt('1680', '169F', 'Ogham');
opt('16A0', '16FF', 'Runic');
opt('1700', '171F', 'Tagalog');
opt('1720', '173F', 'Hanunoo');
opt('1740', '175F', 'Buhid');
opt('1760', '177F', 'Tagbanwa');
opt('1780', '17FF', 'Khmer');
opt('1800', '18AF', 'Mongolian');
opt('18B0', '18FF', 'Unified Canadian Aboriginal Syllabics Extended');
opt('1900', '194F', 'Limbu');
opt('1950', '197F', 'Tai Le');
opt('1980', '19DF', 'New Tai Lue');
opt('19E0', '19FF', 'Khmer Symbols');
opt('1A00', '1A1F', 'Buginese');
opt('1A20', '1AAF', 'Tai Tham');
opt('1AB0', '1AFF', 'Combining Diacritical Marks Extended');
opt('1B00', '1B7F', 'Balinese');
opt('1B80', '1BBF', 'Sundanese');
opt('1BC0', '1BFF', 'Batak');
opt('1C00', '1C4F', 'Lepcha');
opt('1C50', '1C7F', 'Ol Chiki');
opt('1CC0', '1CCF', 'Sundanese Supplement');
opt('1CD0', '1CFF', 'Vedic Extensions');
opt('1D00', '1D7F', 'Phonetic Extensions');
opt('1D80', '1DBF', 'Phonetic Extensions Supplement');
opt('1DC0', '1DFF', 'Combining Diacritical Marks Supplement');
opt('1E00', '1EFF', 'Latin Extended Additional');
opt('1F00', '1FFF', 'Greek Extended');
opt('2000', '206F', 'General Punctuation');
opt('2070', '209F', 'Superscripts and Subscripts');
opt('20A0', '20CF', 'Currency Symbols');
opt('20D0', '20FF', 'Combining Diacritical Marks for Symbols');
opt('2100', '214F', 'Letterlike Symbols');
opt('2150', '218F', 'Number Forms');
opt('2190', '21FF', 'Arrows');
opt('2200', '22FF', 'Mathematical Operators');
opt('2300', '23FF', 'Miscellaneous Technical');
opt('2400', '243F', 'Control Pictures');
opt('2440', '245F', 'Optical Character Recognition');
opt('2460', '24FF', 'Enclosed Alphanumerics');
opt('2500', '257F', 'Box Drawing');
opt('2580', '259F', 'Block Elements');
opt('25A0', '25FF', 'Geometric Shapes');
opt('2600', '26FF', 'Miscellaneous Symbols');
opt('2700', '27BF', 'Dingbats');
opt('27C0', '27EF', 'Miscellaneous Mathematical Symbols-A');
opt('27F0', '27FF', 'Supplemental Arrows-A');
opt('2800', '28FF', 'Braille Patterns');
opt('2900', '297F', 'Supplemental Arrows-B');
opt('2980', '29FF', 'Miscellaneous Mathematical Symbols-B');
opt('2A00', '2AFF', 'Supplemental Mathematical Operators');
opt('2B00', '2BFF', 'Miscellaneous Symbols and Arrows');
opt('2C00', '2C5F', 'Glagolitic');
opt('2C60', '2C7F', 'Latin Extended-C');
opt('2C80', '2CFF', 'Coptic');
opt('2D00', '2D2F', 'Georgian Supplement');
opt('2D30', '2D7F', 'Tifinagh');
opt('2D80', '2DDF', 'Ethiopic Extended');
opt('2DE0', '2DFF', 'Cyrillic Extended-A');
opt('2E00', '2E7F', 'Supplemental Punctuation');
opt('2E80', '2EFF', 'CJK Radicals Supplement');
opt('2F00', '2FDF', 'Kangxi Radicals');
opt('2FF0', '2FFF', 'Ideographic Description Characters');
opt('3000', '303F', 'CJK Symbols and Punctuation');
opt('3040', '309F', 'Hiragana');
opt('30A0', '30FF', 'Katakana');
opt('3100', '312F', 'Bopomofo');
opt('3130', '318F', 'Hangul Compatibility Jamo');
opt('3190', '319F', 'Kanbun');
opt('31A0', '31BF', 'Bopomofo Extended');
opt('31C0', '31EF', 'CJK Strokes');
opt('31F0', '31FF', 'Katakana Phonetic Extensions');
opt('3200', '32FF', 'Enclosed CJK Letters and Months');
opt('3300', '33FF', 'CJK Compatibility');
opt('3400', '4DBF', 'CJK Unified Ideographs Extension A');
opt('4DC0', '4DFF', 'Yijing Hexagram Symbols');
opt('4E00', '9FFF', 'CJK Unified Ideographs');
opt('A000', 'A48F', 'Yi Syllables');
opt('A490', 'A4CF', 'Yi Radicals');
opt('A4D0', 'A4FF', 'Lisu');
opt('A500', 'A63F', 'Vai');
opt('A640', 'A69F', 'Cyrillic Extended-B');
opt('A6A0', 'A6FF', 'Bamum');
opt('A700', 'A71F', 'Modifier Tone Letters');
opt('A720', 'A7FF', 'Latin Extended-D');
opt('A800', 'A82F', 'Syloti Nagri');
opt('A830', 'A83F', 'Common Indic Number Forms');
opt('A840', 'A87F', 'Phags-pa');
opt('A880', 'A8DF', 'Saurashtra');
opt('A8E0', 'A8FF', 'Devanagari Extended');
opt('A900', 'A92F', 'Kayah Li');
opt('A930', 'A95F', 'Rejang');
opt('A960', 'A97F', 'Hangul Jamo Extended-A');
opt('A980', 'A9DF', 'Javanese');
opt('A9E0', 'A9FF', 'Myanmar Extended-B');
opt('AA00', 'AA5F', 'Cham');
opt('AA60', 'AA7F', 'Myanmar Extended-A');
opt('AA80', 'AADF', 'Tai Viet');
opt('AAE0', 'AAFF', 'Meetei Mayek Extensions');
opt('AB00', 'AB2F', 'Ethiopic Extended-A');
opt('AB30', 'AB6F', 'Latin Extended-E');
opt('ABC0', 'ABFF', 'Meetei Mayek');
opt('AC00', 'D7AF', 'Hangul Syllables');
opt('D7B0', 'D7FF', 'Hangul Jamo Extended-B');
opt('D800', 'DB7F', 'High Surrogates');
opt('DB80', 'DBFF', 'High Private Use Surrogates');
opt('DC00', 'DFFF', 'Low Surrogates');
opt('E000', 'F8FF', 'Private Use Area');
opt('F900', 'FAFF', 'CJK Compatibility Ideographs');
opt('FB00', 'FB4F', 'Alphabetic Presentation Forms');
opt('FB50', 'FDFF', 'Arabic Presentation Forms-A');
opt('FE00', 'FE0F', 'Variation Selectors');
opt('FE10', 'FE1F', 'Vertical Forms');
opt('FE20', 'FE2F', 'Combining Half Marks');
opt('FE30', 'FE4F', 'CJK Compatibility Forms');
opt('FE50', 'FE6F', 'Small Form Variants');
opt('FE70', 'FEFF', 'Arabic Presentation Forms-B');
opt('FF00', 'FFEF', 'Halfwidth and Fullwidth Forms');
opt('FFF0', 'FFFF', 'Specials');
group('Supplementary Multilingual Plane');
opt('10000', '1007F', 'Linear B Syllabary');
opt('10080', '100FF', 'Linear B Ideograms');
opt('10100', '1013F', 'Aegean Numbers');
opt('10140', '1018F', 'Ancient Greek Numbers');
opt('10190', '101CF', 'Ancient Symbols');
opt('101D0', '101FF', 'Phaistos Disc');
opt('10280', '1029F', 'Lycian');
opt('102A0', '102DF', 'Carian');
opt('102E0', '102FF', 'Coptic Epact Numbers');
opt('10300', '1032F', 'Old Italic');
opt('10330', '1034F', 'Gothic');
opt('10350', '1037F', 'Old Permic');
opt('10380', '1039F', 'Ugaritic');
opt('103A0', '103DF', 'Old Persian');
opt('10400', '1044F', 'Deseret');
opt('10450', '1047F', 'Shavian');
opt('10480', '104AF', 'Osmanya');
opt('10500', '1052F', 'Elbasan');
opt('10530', '1056F', 'Caucasian Albanian');
opt('10600', '1077F', 'Linear A');
opt('10800', '1083F', 'Cypriot Syllabary');
opt('10840', '1085F', 'Imperial Aramaic');
opt('10860', '1087F', 'Palmyrene');
opt('10880', '108AF', 'Nabataean');
opt('10900', '1091F', 'Phoenician');
opt('10920', '1093F', 'Lydian');
opt('10980', '1099F', 'Meroitic Hieroglyphs');
opt('109A0', '109FF', 'Meroitic Cursive');
opt('10A00', '10A5F', 'Kharoshthi');
opt('10A60', '10A7F', 'Old South Arabian');
opt('10A80', '10A9F', 'Old North Arabian');
opt('10AC0', '10AFF', 'Manichaean');
opt('10B00', '10B3F', 'Avestan');
opt('10B40', '10B5F', 'Inscriptional Parthian');
opt('10B60', '10B7F', 'Inscriptional Pahlavi');
opt('10B80', '10BAF', 'Psalter Pahlavi');
opt('10C00', '10C4F', 'Old Turkic');
opt('10E60', '10E7F', 'Rumi Numeral Symbols');
opt('11000', '1107F', 'Brahmi');
opt('11080', '110CF', 'Kaithi');
opt('110D0', '110FF', 'Sora Sompeng');
opt('11100', '1114F', 'Chakma');
opt('11150', '1117F', 'Mahajani');
opt('11180', '111DF', 'Sharada');
opt('111E0', '111FF', 'Sinhala Archaic Numbers');
opt('11200', '1124F', 'Khojki');
opt('112B0', '112FF', 'Khudawadi');
opt('11300', '1137F', 'Grantha');
opt('11480', '114DF', 'Tirhuta');
opt('11580', '115FF', 'Siddham');
opt('11600', '1165F', 'Modi');
opt('11680', '116CF', 'Takri');
opt('118A0', '118FF', 'Warang Citi');
opt('11AC0', '11AFF', 'Pau Cin Hau');
opt('12000', '123FF', 'Cuneiform');
opt('12400', '1247F', 'Cuneiform Numbers and Punctuation');
opt('13000', '1342F', 'Egyptian Hieroglyphs');
opt('16800', '16A3F', 'Bamum Supplement');
opt('16A40', '16A6F', 'Mro');
opt('16AD0', '16AFF', 'Bassa Vah');
opt('16B00', '16B8F', 'Pahawh Hmong');
opt('16F00', '16F9F', 'Miao');
opt('1B000', '1B0FF', 'Kana Supplement');
opt('1BC00', '1BC9F', 'Duployan');
opt('1BCA0', '1BCAF', 'Shorthand Format Controls');
opt('1D000', '1D0FF', 'Byzantine Musical Symbols');
opt('1D100', '1D1FF', 'Musical Symbols');
opt('1D200', '1D24F', 'Ancient Greek Musical Notation');
opt('1D300', '1D35F', 'Tai Xuan Jing Symbols');
opt('1D360', '1D37F', 'Counting Rod Numerals');
opt('1D400', '1D7FF', 'Mathematical Alphanumeric Symbols');
opt('1E800', '1E8DF', 'Mende Kikakui');
opt('1EE00', '1EEFF', 'Arabic Mathematical Alphabetic Symbols');
opt('1F000', '1F02F', 'Mahjong Tiles');
opt('1F030', '1F09F', 'Domino Tiles');
opt('1F0A0', '1F0FF', 'Playing Cards');
opt('1F100', '1F1FF', 'Enclosed Alphanumeric Supplement');
opt('1F200', '1F2FF', 'Enclosed Ideographic Supplement');
opt('1F300', '1F5FF', 'Miscellaneous Symbols and Pictographs');
opt('1F600', '1F64F', 'Emoticons');
opt('1F650', '1F67F', 'Ornamental Dingbats');
opt('1F680', '1F6FF', 'Transport and Map Symbols');
opt('1F700', '1F77F', 'Alchemical Symbols');
opt('1F780', '1F7FF', 'Geometric Shapes Extended');
opt('1F800', '1F8FF', 'Supplemental Arrows-C');
group('Supplementary Ideographic Plane');
opt('20000', '2A6DF', 'CJK Unified Ideographs Extension B');
opt('2A700', '2B73F', 'CJK Unified Ideographs Extension C');
opt('2B740', '2B81F', 'CJK Unified Ideographs Extension D');
opt('2F800', '2FA1F', 'CJK Compatibility Ideographs Supplement');
group('Supplementary Special-Purpose Plane');
opt('E0000', 'E007F', 'Tags');
opt('E0100', 'E01EF', 'Variation Selectors Supplement');
group('Supplementary Private-Use Area');
opt('F0000', 'FFFFF', 'Supplementary Private Use Area-A');
opt('100000', '10FFFF', 'Supplementary Private Use Area-B');

doc += '<\/select>';
document.getElementById('blockSelect').innerHTML = doc;
}

function lowSurrogate(n) {
  return n >= 0xDC00 && n <= 0xDFFFF;
}

function highSurrogate(n) {
  return n >= 0xD800 && n <= 0xDB7F;
}

function fromSurrogates(high, low) {
  return (high - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;
}

function uName(pos) {
  if(uD[pos]) {
    return uD[pos].na; }
  else {
    return Uplus(pos);
  }
}

function uNum(char) {
  return char.charCodeAt(0).toString(16).toUpperCase();
}

function toHex4(n) {
  return pad(n.toString(16).toUpperCase(), 4);
}

function Uplus(n) {
  return 'U+' + toHex4(n);
}

function pad(s, digits) {
  while(s.length < digits) {
    s = '0' + s;
  }
  return s;
}

var theCode = document.getElementById('theCode');

function showU() {
  var i, c;
  theCode.value = '';
  for(i = 0; i < theData.value.length; i++) {
    c = theData.value.charCodeAt(i);
    if(highSurrogate(c)) {
      theCode.value += Uplus(fromSurrogates(c, theData.value.charCodeAt(++i))) + ' ';
    } else {
      theCode.value += Uplus(c) + ' ';
    }
  }
  codeArea.style.display = 'block';
}

function showJS() {
  theCode.value = 
    theData.value.replace(/./g,
      function(c) { return '\\u' + uNum(c); });
  codeArea.style.display = 'block';
}

function showHTML() {
  var i, c;
  theCode.value = '';
  for(i = 0; i < theData.value.length; i++) {
    c = theData.value.charCodeAt(i);
    if(highSurrogate(c)) {
      c = fromSurrogates(c, theData.value.charCodeAt(++i));
    }
    theCode.value += '&' + '#x' + c.toString(16).toUpperCase() + ';';
  }
  codeArea.style.display = 'block';
}

