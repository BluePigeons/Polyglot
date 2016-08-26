
////based on code from https://www.cs.tut.fi/~jkorpela/fui.html8

var atu_main_HTML = `

  <div id="fullunicodesupportkeyboard" class="row">
    <div class="col-md-12">

      <div class="row keyboardHandlebar ui-draggable-handle">
        <button class="btn col-md-1">
          <span class="closePopupBtn glyphicon glyphicon-remove"></span>
        </button>
        <button class="btn col-md-1 polyanno-colour-change polyanno-popup-min">
          <span> _ </span>
        </button>
        <button class="btn  atu-options-btn atu-search-dropdown-toggle col-md-2" type="button" >
            <span class="glyphicon glyphicon-search"></span>
            <span class="caret"></span>
        </button>
        <button class="btn  atu-options-btn atu-options-dropdown-toggle col-md-2" type="button" >
            <span class="glyphicon glyphicon glyphicon-list-alt"></span>
            <span class="caret"></span>
        </button>
        <button class="col-md-2 atu-options-btn atu-prev-btn" type="button" id="prev" title="Previous 256 characters" >
                <span class='glyphicon glyphicon-chevron-left'></span>
              </button>
        <button class="col-md-2 atu-options-btn atu-next-btn" type="button" id="next" title="Next 256 characters">
                <span class='glyphicon glyphicon-chevron-right'></span>
              </button>
      </div>

          <div class="row languageRow optionRows">
            <div class="atu-languageChoice">
                <select id="atu-blockMenuID" class="atu-blockMenu">
                <optgroup label="Basic Multilingual Plane">
                  <option value="0000">Basic Latin</option><option value="0080">Latin-1 Supplement</option><option value="0100">Latin Extended-A</option><option value="0180">Latin Extended-B</option><option value="0250">IPA Extensions</option><option value="02B0">Spacing Modifier Letters</option><option value="0300">Combining Diacritical Marks</option><option value="0370">Greek and Coptic</option><option value="0400">Cyrillic</option><option value="0500">Cyrillic Supplement</option><option value="0530">Armenian</option><option value="0590">Hebrew</option><option value="0600">Arabic</option><option value="0700">Syriac</option><option value="0750">Arabic Supplement</option><option value="0780">Thaana</option><option value="07C0">NKo</option><option value="0800">Samaritan</option><option value="0840">Mandaic</option><option value="08A0">Arabic Extended-A</option><option value="0900">Devanagari</option><option value="0980">Bengali</option><option value="0A00">Gurmukhi</option><option value="0A80">Gujarati</option><option value="0B00">Oriya</option><option value="0B80">Tamil</option><option value="0C00">Telugu</option><option value="0C80">Kannada</option><option value="0D00">Malayalam</option><option value="0D80">Sinhala</option><option value="0E00">Thai</option><option value="0E80">Lao</option><option value="0F00">Tibetan</option><option value="1000">Myanmar</option><option value="10A0">Georgian</option><option value="1100">Hangul Jamo</option><option value="1200">Ethiopic</option><option value="1380">Ethiopic Supplement</option><option value="13A0">Cherokee</option><option value="1400">Unified Canadian Aboriginal Syllabics</option><option value="1680">Ogham</option><option value="16A0">Runic</option><option value="1700">Tagalog</option><option value="1720">Hanunoo</option><option value="1740">Buhid</option><option value="1760">Tagbanwa</option><option value="1780">Khmer</option><option value="1800">Mongolian</option><option value="18B0">Unified Canadian Aboriginal Syllabics Extended</option><option value="1900">Limbu</option><option value="1950">Tai Le</option><option value="1980">New Tai Lue</option><option value="19E0">Khmer Symbols</option><option value="1A00">Buginese</option><option value="1A20">Tai Tham</option><option value="1AB0">Combining Diacritical Marks Extended</option><option value="1B00">Balinese</option><option value="1B80">Sundanese</option><option value="1BC0">Batak</option><option value="1C00">Lepcha</option><option value="1C50">Ol Chiki</option><option value="1CC0">Sundanese Supplement</option><option value="1CD0">Vedic Extensions</option><option value="1D00">Phonetic Extensions</option><option value="1D80">Phonetic Extensions Supplement</option><option value="1DC0">Combining Diacritical Marks Supplement</option><option value="1E00">Latin Extended Additional</option><option value="1F00">Greek Extended</option><option value="2000">General Punctuation</option><option value="2070">Superscripts and Subscripts</option><option value="20A0">Currency Symbols</option><option value="20D0">Combining Diacritical Marks for Symbols</option><option value="2100">Letterlike Symbols</option><option value="2150">Number Forms</option><option value="2190">Arrows</option><option value="2200">Mathematical Operators</option><option value="2300">Miscellaneous Technical</option><option value="2400">Control Pictures</option><option value="2440">Optical Character Recognition</option><option value="2460">Enclosed Alphanumerics</option><option value="2500">Box Drawing</option><option value="2580">Block Elements</option><option value="25A0">Geometric Shapes</option><option value="2600">Miscellaneous Symbols</option><option value="2700">Dingbats</option><option value="27C0">Miscellaneous Mathematical Symbols-A</option><option value="27F0">Supplemental Arrows-A</option><option value="2800">Braille Patterns</option><option value="2900">Supplemental Arrows-B</option><option value="2980">Miscellaneous Mathematical Symbols-B</option><option value="2A00">Supplemental Mathematical Operators</option><option value="2B00">Miscellaneous Symbols and Arrows</option><option value="2C00">Glagolitic</option><option value="2C60">Latin Extended-C</option><option value="2C80">Coptic</option><option value="2D00">Georgian Supplement</option><option value="2D30">Tifinagh</option><option value="2D80">Ethiopic Extended</option><option value="2DE0">Cyrillic Extended-A</option><option value="2E00">Supplemental Punctuation</option><option value="2E80">CJK Radicals Supplement</option><option value="2F00">Kangxi Radicals</option><option value="2FF0">Ideographic Description Characters</option><option value="3000">CJK Symbols and Punctuation</option><option value="3040">Hiragana</option><option value="30A0">Katakana</option><option value="3100">Bopomofo</option><option value="3130">Hangul Compatibility Jamo</option><option value="3190">Kanbun</option><option value="31A0">Bopomofo Extended</option><option value="31C0">CJK Strokes</option><option value="31F0">Katakana Phonetic Extensions</option><option value="3200">Enclosed CJK Letters and Months</option><option value="3300">CJK Compatibility</option><option value="3400">CJK Unified Ideographs Extension A</option><option value="4DC0">Yijing Hexagram Symbols</option><option value="4E00">CJK Unified Ideographs</option><option value="A000">Yi Syllables</option><option value="A490">Yi Radicals</option><option value="A4D0">Lisu</option><option value="A500">Vai</option><option value="A640">Cyrillic Extended-B</option><option value="A6A0">Bamum</option><option value="A700">Modifier Tone Letters</option><option value="A720">Latin Extended-D</option><option value="A800">Syloti Nagri</option><option value="A830">Common Indic Number Forms</option><option value="A840">Phags-pa</option><option value="A880">Saurashtra</option><option value="A8E0">Devanagari Extended</option><option value="A900">Kayah Li</option><option value="A930">Rejang</option><option value="A960">Hangul Jamo Extended-A</option><option value="A980">Javanese</option><option value="A9E0">Myanmar Extended-B</option><option value="AA00">Cham</option><option value="AA60">Myanmar Extended-A</option><option value="AA80">Tai Viet</option><option value="AAE0">Meetei Mayek Extensions</option><option value="AB00">Ethiopic Extended-A</option><option value="AB30">Latin Extended-E</option><option value="ABC0">Meetei Mayek</option><option value="AC00">Hangul Syllables</option><option value="D7B0">Hangul Jamo Extended-B</option><option value="D800">High Surrogates</option><option value="DB80">High Private Use Surrogates</option><option value="DC00">Low Surrogates</option><option value="E000">Private Use Area</option><option value="F900">CJK Compatibility Ideographs</option><option value="FB00">Alphabetic Presentation Forms</option><option value="FB50">Arabic Presentation Forms-A</option><option value="FE00">Variation Selectors</option><option value="FE10">Vertical Forms</option><option value="FE20">Combining Half Marks</option><option value="FE30">CJK Compatibility Forms</option><option value="FE50">Small Form Variants</option><option value="FE70">Arabic Presentation Forms-B</option><option value="FF00">Halfwidth and Fullwidth Forms</option><option value="FFF0">Specials</option></optgroup><optgroup label="Supplementary Multilingual Plane"><option value="10000">Linear B Syllabary</option><option value="10080">Linear B Ideograms</option><option value="10100">Aegean Numbers</option><option value="10140">Ancient Greek Numbers</option><option value="10190">Ancient Symbols</option><option value="101D0">Phaistos Disc</option><option value="10280">Lycian</option><option value="102A0">Carian</option><option value="102E0">Coptic Epact Numbers</option><option value="10300">Old Italic</option><option value="10330">Gothic</option><option value="10350">Old Permic</option><option value="10380">Ugaritic</option><option value="103A0">Old Persian</option><option value="10400">Deseret</option><option value="10450">Shavian</option><option value="10480">Osmanya</option><option value="10500">Elbasan</option><option value="10530">Caucasian Albanian</option><option value="10600">Linear A</option><option value="10800">Cypriot Syllabary</option><option value="10840">Imperial Aramaic</option><option value="10860">Palmyrene</option><option value="10880">Nabataean</option><option value="10900">Phoenician</option><option value="10920">Lydian</option><option value="10980">Meroitic Hieroglyphs</option><option value="109A0">Meroitic Cursive</option><option value="10A00">Kharoshthi</option><option value="10A60">Old South Arabian</option><option value="10A80">Old North Arabian</option><option value="10AC0">Manichaean</option><option value="10B00">Avestan</option><option value="10B40">Inscriptional Parthian</option><option value="10B60">Inscriptional Pahlavi</option><option value="10B80">Psalter Pahlavi</option><option value="10C00">Old Turkic</option><option value="10E60">Rumi Numeral Symbols</option><option value="11000">Brahmi</option><option value="11080">Kaithi</option><option value="110D0">Sora Sompeng</option><option value="11100">Chakma</option><option value="11150">Mahajani</option><option value="11180">Sharada</option><option value="111E0">Sinhala Archaic Numbers</option><option value="11200">Khojki</option><option value="112B0">Khudawadi</option><option value="11300">Grantha</option><option value="11480">Tirhuta</option><option value="11580">Siddham</option><option value="11600">Modi</option><option value="11680">Takri</option><option value="118A0">Warang Citi</option><option value="11AC0">Pau Cin Hau</option><option value="12000">Cuneiform</option><option value="12400">Cuneiform Numbers and Punctuation</option><option value="13000">Egyptian Hieroglyphs</option><option value="16800">Bamum Supplement</option><option value="16A40">Mro</option><option value="16AD0">Bassa Vah</option><option value="16B00">Pahawh Hmong</option><option value="16F00">Miao</option><option value="1B000">Kana Supplement</option><option value="1BC00">Duployan</option><option value="1BCA0">Shorthand Format Controls</option><option value="1D000">Byzantine Musical Symbols</option><option value="1D100">Musical Symbols</option><option value="1D200">Ancient Greek Musical Notation</option><option value="1D300">Tai Xuan Jing Symbols</option><option value="1D360">Counting Rod Numerals</option><option value="1D400">Mathematical Alphanumeric Symbols</option><option value="1E800">Mende Kikakui</option><option value="1EE00">Arabic Mathematical Alphabetic Symbols</option><option value="1F000">Mahjong Tiles</option><option value="1F030">Domino Tiles</option><option value="1F0A0">Playing Cards</option><option value="1F100">Enclosed Alphanumeric Supplement</option><option value="1F200">Enclosed Ideographic Supplement</option><option value="1F300">Miscellaneous Symbols and Pictographs</option><option value="1F600">Emoticons</option><option value="1F650">Ornamental Dingbats</option><option value="1F680">Transport and Map Symbols</option><option value="1F700">Alchemical Symbols</option><option value="1F780">Geometric Shapes Extended</option><option value="1F800">Supplemental Arrows-C</option></optgroup><optgroup label="Supplementary Ideographic Plane"><option value="20000">CJK Unified Ideographs Extension B</option><option value="2A700">CJK Unified Ideographs Extension C</option><option value="2B740">CJK Unified Ideographs Extension D</option><option value="2F800">CJK Compatibility Ideographs Supplement</option></optgroup><optgroup label="Supplementary Special-Purpose Plane"><option value="E0000">Tags</option><option value="E0100">Variation Selectors Supplement</option></optgroup><optgroup label="Supplementary Private-Use Area"><option value="F0000">Supplementary Private Use Area-A</option><option value="100000">Supplementary Private Use Area-B</option>
                </optgroup>
              </select>
            </div>
          </div>
      
          <div class="row searchUnicodeRow optionRows bottomOptionRow">
              <span class="searchUnicodeLabel col-md-3">Search U+</span>
              <input class="col-md-6 atu-ucode" placeholder="Unicode Number" size="6" maxlength="6" pattern="[0-9a-zA-Z]{1,6}" >
              <div class="col-md-3">
                <button type="button" class="atu-ucode-search-btn">
                  <span class='glyphicon glyphicon-search'></span>
                </button>
                <span class="glyphicon glyphicon-question-sign"></span>
              </div>
        </div>    

          <div id="mapPopup" class="row theKeys">
        <div class="col-md-12 chars">
                <div class="row">
              <div id="mapPopupBodyInitial" class="atu-mapPopupBody col-md-12">
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A014" onclick="clicked(this,77840)">𓀐</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A014A" onclick="clicked(this,77841)">𓀑</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A015" onclick="clicked(this,77842)">𓀒</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A016" onclick="clicked(this,77843)">𓀓</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A017" onclick="clicked(this,77844)">𓀔</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A017A" onclick="clicked(this,77845)">𓀕</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A018" onclick="clicked(this,77846)">𓀖</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A019" onclick="clicked(this,77847)">𓀗</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A020" onclick="clicked(this,77848)">𓀘</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A021" onclick="clicked(this,77849)">𓀙</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A022" onclick="clicked(this,77850)">𓀚</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A023" onclick="clicked(this,77851)">𓀛</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A024" onclick="clicked(this,77852)">𓀜</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A025" onclick="clicked(this,77853)">𓀝</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A026" onclick="clicked(this,77854)">𓀞</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A027" onclick="clicked(this,77855)">𓀟</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A014" onclick="clicked(this,77840)">𓀐</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A014A" onclick="clicked(this,77841)">𓀑</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A015" onclick="clicked(this,77842)">𓀒</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A016" onclick="clicked(this,77843)">𓀓</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A017" onclick="clicked(this,77844)">𓀔</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A017A" onclick="clicked(this,77845)">𓀕</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A018" onclick="clicked(this,77846)">𓀖</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A019" onclick="clicked(this,77847)">𓀗</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A020" onclick="clicked(this,77848)">𓀘</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A021" onclick="clicked(this,77849)">𓀙</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A022" onclick="clicked(this,77850)">𓀚</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A023" onclick="clicked(this,77851)">𓀛</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A024" onclick="clicked(this,77852)">𓀜</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A025" onclick="clicked(this,77853)">𓀝</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A026" onclick="clicked(this,77854)">𓀞</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A027" onclick="clicked(this,77855)">𓀟</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A028" onclick="clicked(this,77856)">𓀠</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A029" onclick="clicked(this,77857)">𓀡</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A030" onclick="clicked(this,77858)">𓀢</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A031" onclick="clicked(this,77859)">𓀣</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A032" onclick="clicked(this,77860)">𓀤</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A032A" onclick="clicked(this,77861)">𓀥</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A033" onclick="clicked(this,77862)">𓀦</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A034" onclick="clicked(this,77863)">𓀧</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A035" onclick="clicked(this,77864)">𓀨</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A036" onclick="clicked(this,77865)">𓀩</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A037" onclick="clicked(this,77866)">𓀪</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A038" onclick="clicked(this,77867)">𓀫</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A039" onclick="clicked(this,77868)">𓀬</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A040" onclick="clicked(this,77869)">𓀭</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A040A" onclick="clicked(this,77870)">𓀮</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A041" onclick="clicked(this,77871)">𓀯</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A042" onclick="clicked(this,77872)">𓀰</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A042A" onclick="clicked(this,77873)">𓀱</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A043" onclick="clicked(this,77874)">𓀲</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A043A" onclick="clicked(this,77875)">𓀳</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A044" onclick="clicked(this,77876)">𓀴</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A045" onclick="clicked(this,77877)">𓀵</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A045A" onclick="clicked(this,77878)">𓀶</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A046" onclick="clicked(this,77879)">𓀷</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A047" onclick="clicked(this,77880)">𓀸</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A048" onclick="clicked(this,77881)">𓀹</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A049" onclick="clicked(this,77882)">𓀺</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A050" onclick="clicked(this,77883)">𓀻</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A051" onclick="clicked(this,77884)">𓀼</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A052" onclick="clicked(this,77885)">𓀽</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A053" onclick="clicked(this,77886)">𓀾</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A054" onclick="clicked(this,77887)">𓀿</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A055" onclick="clicked(this,77888)">𓁀</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A056" onclick="clicked(this,77889)">𓁁</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A057" onclick="clicked(this,77890)">𓁂</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A058" onclick="clicked(this,77891)">𓁃</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A059" onclick="clicked(this,77892)">𓁄</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A060" onclick="clicked(this,77893)">𓁅</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A061" onclick="clicked(this,77894)">𓁆</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A062" onclick="clicked(this,77895)">𓁇</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A063" onclick="clicked(this,77896)">𓁈</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A064" onclick="clicked(this,77897)">𓁉</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A065" onclick="clicked(this,77898)">𓁊</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A066" onclick="clicked(this,77899)">𓁋</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A067" onclick="clicked(this,77900)">𓁌</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A068" onclick="clicked(this,77901)">𓁍</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A069" onclick="clicked(this,77902)">𓁎</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH A070" onclick="clicked(this,77903)">𓁏</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B001" onclick="clicked(this,77904)">𓁐</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B002" onclick="clicked(this,77905)">𓁑</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B003" onclick="clicked(this,77906)">𓁒</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B004" onclick="clicked(this,77907)">𓁓</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B005" onclick="clicked(this,77908)">𓁔</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B005A" onclick="clicked(this,77909)">𓁕</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B006" onclick="clicked(this,77910)">𓁖</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B007" onclick="clicked(this,77911)">𓁗</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B008" onclick="clicked(this,77912)">𓁘</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH B009" onclick="clicked(this,77913)">𓁙</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C001" onclick="clicked(this,77914)">𓁚</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C002" onclick="clicked(this,77915)">𓁛</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C002A" onclick="clicked(this,77916)">𓁜</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C002B" onclick="clicked(this,77917)">𓁝</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C002C" onclick="clicked(this,77918)">𓁞</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C003" onclick="clicked(this,77919)">𓁟</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C004" onclick="clicked(this,77920)">𓁠</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C005" onclick="clicked(this,77921)">𓁡</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C006" onclick="clicked(this,77922)">𓁢</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C007" onclick="clicked(this,77923)">𓁣</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C008" onclick="clicked(this,77924)">𓁤</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C009" onclick="clicked(this,77925)">𓁥</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C010" onclick="clicked(this,77926)">𓁦</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C010A" onclick="clicked(this,77927)">𓁧</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C011" onclick="clicked(this,77928)">𓁨</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C012" onclick="clicked(this,77929)">𓁩</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C013" onclick="clicked(this,77930)">𓁪</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C014" onclick="clicked(this,77931)">𓁫</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C015" onclick="clicked(this,77932)">𓁬</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C016" onclick="clicked(this,77933)">𓁭</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C017" onclick="clicked(this,77934)">𓁮</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C018" onclick="clicked(this,77935)">𓁯</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C019" onclick="clicked(this,77936)">𓁰</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C020" onclick="clicked(this,77937)">𓁱</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C021" onclick="clicked(this,77938)">𓁲</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C022" onclick="clicked(this,77939)">𓁳</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C023" onclick="clicked(this,77940)">𓁴</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH C024" onclick="clicked(this,77941)">𓁵</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D001" onclick="clicked(this,77942)">𓁶</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D002" onclick="clicked(this,77943)">𓁷</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D003" onclick="clicked(this,77944)">𓁸</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D004" onclick="clicked(this,77945)">𓁹</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D005" onclick="clicked(this,77946)">𓁺</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D006" onclick="clicked(this,77947)">𓁻</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D007" onclick="clicked(this,77948)">𓁼</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D008" onclick="clicked(this,77949)">𓁽</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D008A" onclick="clicked(this,77950)">𓁾</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D009" onclick="clicked(this,77951)">𓁿</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D010" onclick="clicked(this,77952)">𓂀</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D011" onclick="clicked(this,77953)">𓂁</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D012" onclick="clicked(this,77954)">𓂂</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D013" onclick="clicked(this,77955)">𓂃</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D014" onclick="clicked(this,77956)">𓂄</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D015" onclick="clicked(this,77957)">𓂅</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D016" onclick="clicked(this,77958)">𓂆</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D017" onclick="clicked(this,77959)">𓂇</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D018" onclick="clicked(this,77960)">𓂈</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D019" onclick="clicked(this,77961)">𓂉</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D020" onclick="clicked(this,77962)">𓂊</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D021" onclick="clicked(this,77963)">𓂋</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D022" onclick="clicked(this,77964)">𓂌</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D023" onclick="clicked(this,77965)">𓂍</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D024" onclick="clicked(this,77966)">𓂎</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D025" onclick="clicked(this,77967)">𓂏</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D026" onclick="clicked(this,77968)">𓂐</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D027" onclick="clicked(this,77969)">𓂑</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D027A" onclick="clicked(this,77970)">𓂒</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D028" onclick="clicked(this,77971)">𓂓</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D029" onclick="clicked(this,77972)">𓂔</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D030" onclick="clicked(this,77973)">𓂕</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D031" onclick="clicked(this,77974)">𓂖</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D031A" onclick="clicked(this,77975)">𓂗</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D032" onclick="clicked(this,77976)">𓂘</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D033" onclick="clicked(this,77977)">𓂙</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D034" onclick="clicked(this,77978)">𓂚</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D034A" onclick="clicked(this,77979)">𓂛</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D035" onclick="clicked(this,77980)">𓂜</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D036" onclick="clicked(this,77981)">𓂝</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D037" onclick="clicked(this,77982)">𓂞</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D038" onclick="clicked(this,77983)">𓂟</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D039" onclick="clicked(this,77984)">𓂠</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D040" onclick="clicked(this,77985)">𓂡</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D041" onclick="clicked(this,77986)">𓂢</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D042" onclick="clicked(this,77987)">𓂣</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D043" onclick="clicked(this,77988)">𓂤</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D044" onclick="clicked(this,77989)">𓂥</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D045" onclick="clicked(this,77990)">𓂦</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D046" onclick="clicked(this,77991)">𓂧</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D046A" onclick="clicked(this,77992)">𓂨</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D047" onclick="clicked(this,77993)">𓂩</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D048" onclick="clicked(this,77994)">𓂪</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D048A" onclick="clicked(this,77995)">𓂫</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D049" onclick="clicked(this,77996)">𓂬</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050" onclick="clicked(this,77997)">𓂭</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050A" onclick="clicked(this,77998)">𓂮</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050B" onclick="clicked(this,77999)">𓂯</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050C" onclick="clicked(this,78000)">𓂰</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050D" onclick="clicked(this,78001)">𓂱</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050E" onclick="clicked(this,78002)">𓂲</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050F" onclick="clicked(this,78003)">𓂳</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050G" onclick="clicked(this,78004)">𓂴</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050H" onclick="clicked(this,78005)">𓂵</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D050I" onclick="clicked(this,78006)">𓂶</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D051" onclick="clicked(this,78007)">𓂷</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D052" onclick="clicked(this,78008)">𓂸</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D052A" onclick="clicked(this,78009)">𓂹</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D053" onclick="clicked(this,78010)">𓂺</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D054" onclick="clicked(this,78011)">𓂻</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D054A" onclick="clicked(this,78012)">𓂼</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D055" onclick="clicked(this,78013)">𓂽</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D056" onclick="clicked(this,78014)">𓂾</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D057" onclick="clicked(this,78015)">𓂿</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D058" onclick="clicked(this,78016)">𓃀</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D059" onclick="clicked(this,78017)">𓃁</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D060" onclick="clicked(this,78018)">𓃂</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D061" onclick="clicked(this,78019)">𓃃</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D062" onclick="clicked(this,78020)">𓃄</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D063" onclick="clicked(this,78021)">𓃅</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D064" onclick="clicked(this,78022)">𓃆</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D065" onclick="clicked(this,78023)">𓃇</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D066" onclick="clicked(this,78024)">𓃈</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D067" onclick="clicked(this,78025)">𓃉</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D067A" onclick="clicked(this,78026)">𓃊</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D067B" onclick="clicked(this,78027)">𓃋</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D067C" onclick="clicked(this,78028)">𓃌</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D067D" onclick="clicked(this,78029)">𓃍</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D067E" onclick="clicked(this,78030)">𓃎</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D067F" onclick="clicked(this,78031)">𓃏</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D067G" onclick="clicked(this,78032)">𓃐</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH D067H" onclick="clicked(this,78033)">𓃑</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E001" onclick="clicked(this,78034)">𓃒</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E002" onclick="clicked(this,78035)">𓃓</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E003" onclick="clicked(this,78036)">𓃔</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E004" onclick="clicked(this,78037)">𓃕</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E005" onclick="clicked(this,78038)">𓃖</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E006" onclick="clicked(this,78039)">𓃗</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E007" onclick="clicked(this,78040)">𓃘</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E008" onclick="clicked(this,78041)">𓃙</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E008A" onclick="clicked(this,78042)">𓃚</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E009" onclick="clicked(this,78043)">𓃛</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E009A" onclick="clicked(this,78044)">𓃜</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E010" onclick="clicked(this,78045)">𓃝</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E011" onclick="clicked(this,78046)">𓃞</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E012" onclick="clicked(this,78047)">𓃟</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E013" onclick="clicked(this,78048)">𓃠</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E014" onclick="clicked(this,78049)">𓃡</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E015" onclick="clicked(this,78050)">𓃢</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E016" onclick="clicked(this,78051)">𓃣</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E016A" onclick="clicked(this,78052)">𓃤</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E017" onclick="clicked(this,78053)">𓃥</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E017A" onclick="clicked(this,78054)">𓃦</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E018" onclick="clicked(this,78055)">𓃧</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E019" onclick="clicked(this,78056)">𓃨</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E020" onclick="clicked(this,78057)">𓃩</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E020A" onclick="clicked(this,78058)">𓃪</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E021" onclick="clicked(this,78059)">𓃫</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E022" onclick="clicked(this,78060)">𓃬</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E023" onclick="clicked(this,78061)">𓃭</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E024" onclick="clicked(this,78062)">𓃮</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E025" onclick="clicked(this,78063)">𓃯</div></div class="sameWidth" >
                  </div>
                  <div class="row keyRow">
                    <div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E026" onclick="clicked(this,78064)">𓃰</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E027" onclick="clicked(this,78065)">𓃱</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E028" onclick="clicked(this,78066)">𓃲</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E028A" onclick="clicked(this,78067)">𓃳</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E029" onclick="clicked(this,78068)">𓃴</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E030" onclick="clicked(this,78069)">𓃵</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E031" onclick="clicked(this,78070)">𓃶</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E032" onclick="clicked(this,78071)">𓃷</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E033" onclick="clicked(this,78072)">𓃸</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E034" onclick="clicked(this,78073)">𓃹</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E034A" onclick="clicked(this,78074)">𓃺</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E036" onclick="clicked(this,78075)">𓃻</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E037" onclick="clicked(this,78076)">𓃼</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH E038" onclick="clicked(this,78077)">𓃽</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH F001" onclick="clicked(this,78078)">𓃾</div></div class="sameWidth" ><div class="sameWidth" ><div class="c normal" data-info="EGYPTIAN HIEROGLYPH F001A" onclick="clicked(this,78079)">𓃿</div></div class="sameWidth" >
                  </div>
                </div>
                </div>
            </div>
          </div>
    </div>
  </div>

`;

var rejectionOptions = new Set(["false",'""' , null , false , 'undefined']);

var isUseless = function(something) {
  if (rejectionOptions.has(something) || rejectionOptions.has(typeof something)) {  return true;  }
  else {  return false;  };
};

/////if below certain width then break up rows???

//////SETUP/////
var udata;
var startPosition;
var atu_the_code;

var atu_the_data;

var loadUnicodeData = function() {

  var udataArray;

  $.ajax({
  type: "GET",
  url: "http://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt",
  async: false,
  success: 
    function (data) {
      udataArray = [data];
    }
  });

  udata = String.raw({raw: udataArray});

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
    
};

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

var cgName = {
  Cc: 'Other, control',
  Cf: 'Other, format',
  Cs: 'Other, surrogate',
  Co: 'Other, private use',
  Cn: 'Other, not assigned'
};

var hexMax = 0x10FFFF;

//////TYPING///////

function addstr(addition) {
  if (!isUseless(atu_the_data)) {  atu_the_data.value += addition;  };
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

function clicked(elem, code) {
  //elem.style.borderStyle = 'inset';
  add(code);
  //setTimeout(function() { elem.style.borderStyle = 'outset';}, 300); ///set indeneted effect later??
}

//////// UNICODE SEARCHING ///////

////// nothing references this function??????
function addByCode(hexcodeValue) {
  var val = parseInt(hexcodeValue, 16);
  if(!isNaN(val) && val >= 0 && val <= 0x10FFFF) {
    add(val);
  } else {
    alert('Incorrect hexadecimal value');
  }    
}
/////

function handleKeyPress(e, func){
var key = e.keyCode || e.which;
if (key == 13){
  func();
  }
}

function addnewline() {
  addstr("\n");
}

function clearthem() {
  if(confirm("Really erase everything?")) {
    atu_the_data.value = '';
  }
}

function delchar() {
  var len = atu_the_data.value.length;
  if(lowSurrogate(atu_the_data.value.charCodeAt(len-1)) &&
     highSurrogate(atu_the_data.value.charCodeAt(len-2))) {
    atu_the_data.value = atu_the_data.value.substr(0, len - 2); }
  else {
    atu_the_data.value = atu_the_data.value.substr(0, len - 1); }
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

function buildTheMap(ucodeVal, blockDOM, mapPopupBodyID) {
  buildMap(mapPopupBodyID, ucodeVal); 
  blockDOM.selectedIndex = 0;
}

function buildMap(mapPopupBodyID, startPos, endPos) {

  var nRows = 16;
  if(endPos) {
    nRows = (endPos - startPos) / 16;
    }

  startPosition = parseInt(startPos, 16);

  document.getElementById('atu-next-btn').disabled = startPosition > 0x10FF00;
  document.getElementById('atu-prev-btn').disabled = startPosition <= 0x000F;

  var startRow = startPos.substr(0, startPos.length - 1);
  var basePos = parseInt(startRow, 16);
  if(isNaN(basePos) || basePos < 0 || basePos > 0x10FFF) {
    alert('Incorrect hexadecimal value');
    return;
  }

  var categ, categ1, annotation, chClass;

  ////
  var rows = document.getElementById(mapPopupBodyID).children;

  for(row=0; row < nRows; row++) {
    var rowno = row.toString(16);
    rowno = rowno.toUpperCase();
    var start = basePos + row;
    ///
    ///rows[row].children[0].innerHTML = pad(start.toString(16).toUpperCase(), 3) + '.'; ///
    ///
    for(col = 0; col < 0x10; col++) {

      thisPos = (basePos-0)*16 + (row*16-0) + (col-0);

      categ = uD[thisPos] ? uD[thisPos].gc : 'Cn';
      categ1 = categ.charAt(0);
      annotation = (categ1 !== 'C') ? '' : ' (' + cgName[categ] + ')';
      chClass =
        thisPos > 0x10FFFF ? 'outside' :
        categ === 'Cn' ? 'unassigned' : categ1 === 'C' ? 'control' : 'normal';

      rows[row].children[col].innerHTML = ///originally +1 for the th

        thisPos > 0x10FFFF ? 
          '<div class=outside> </div>'  :

          '<div class="c ' + chClass + '"' +
          'data-info="' + uName(thisPos) + annotation + '" ' +
          'onclick="clicked(this,' + thisPos + ')"' +
          '>' +
          htmlChar(thisPos) + '</div>';
      }
    }
};     

function setSelect(blockSelectDOM) {

  var doc ='';

  function opt(start, end, name) {
    doc += '<option value="' + start + '"';
    doc += '>' + name;
  };

  function group(name) {
    doc += '<optgroup label="' + name + '">';
  };

  var newBlockID = Math.random().toString().substring(2);
  doc += '<select id="'+newBlockID+'" class="atu-blockMenu">';

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
  blockSelectDOM.innerHTML = doc;

};

function lowSurrogate(n) {
  return n >= 0xDC00 && n <= 0xDFFFF;
};

function highSurrogate(n) {
  return n >= 0xD800 && n <= 0xDB7F;
};

function fromSurrogates(high, low) {
  return (high - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;
};

function uName(pos) {
  if(uD[pos]) {
    return uD[pos].na; }
  else {
    return Uplus(pos);
  }
};

function uNum(char) {
  return char.charCodeAt(0).toString(16).toUpperCase();
};

function toHex4(n) {
  return pad(n.toString(16).toUpperCase(), 4);
};

function Uplus(n) {
  return 'U+' + toHex4(n);
};

function pad(s, digits) {
  while(s.length < digits) {
    s = '0' + s;
  }
  return s;
};

function showU() {
  var i, c;
  atu_the_code.value = '';
  for(i = 0; i < atu_the_data.value.length; i++) {
    c = atu_the_data.value.charCodeAt(i);
    if(highSurrogate(c)) {
      atu_the_code.value += Uplus(fromSurrogates(c, atu_the_data.value.charCodeAt(++i))) + ' ';
    } else {
      atu_the_code.value += Uplus(c) + ' ';
    }
  }
  codeArea.style.display = 'block';
};

function showJS() {
  atu_the_code.value = 
    atu_the_data.value.replace(/./g,
      function(c) { return '\\u' + uNum(c); });
  codeArea.style.display = 'block';
}

function showHTML() {
  var i, c;
  atu_the_code.value = '';
  for(i = 0; i < atu_the_data.value.length; i++) {
    c = atu_the_data.value.charCodeAt(i);
    if(highSurrogate(c)) {
      c = fromSurrogates(c, atu_the_data.value.charCodeAt(++i));
    }
    atu_the_code.value += '&' + '#x' + c.toString(16).toUpperCase() + ';';
  }
  codeArea.style.display = 'block';
}

var findMapID = function(theThis) {
  return $(theThis).closest(".keyboardPopup").find(".atu-mapPopupBody").attr("id");
};


var addIMEoptions = function(thisArea) {

  thisArea.ime({
    showSelector: false
  });
  var theCurrentIME = thisArea.data( 'ime' );
  theCurrentIME.enable();
  theCurrentIME.getLanguageCodes().forEach( function ( lang ) {
    $langSelector.append(
      $( '<option/>' ).attr( 'value', lang ).text( theCurrentIME.getAutonym( lang ) )
    );
  } );
  $langSelector.on( 'change', function () {
    var lang = $langSelector.find( 'option:selected' ).val() || null;
    theCurrentIME.setLanguage( lang );
  } );
  thisArea.on( 'imeLanguageChange', function () {
    listInputMethods( theCurrentIME.getLanguage() );
  } );

  function listInputMethods( lang ) {
    $imeSelector.empty();
    theCurrentIME.getInputMethods( lang ).forEach( function ( inputMethod ) {
      $imeSelector.append(
        $( '<option/>' ).attr( 'value', inputMethod.id ).text( inputMethod.name )
      );
    } );
    $imeSelector.trigger( 'change' );
  }

  $imeSelector.on( 'change', function () {
    var inputMethodId = $imeSelector.find( 'option:selected' ).val();
    theCurrentIME.load( inputMethodId ).done( function () {
      theCurrentIME.setIM( inputMethodId );
    } );
  } );

};

////// INITIALISATION    

var atu_initialise_setup = function(atu_parent_id) {

  atu_the_code = document.getElementById('atu_the_code');
  loadUnicodeData();
  buildMap("mapPopupBodyInitial", '0000');
  var initialBlocks = document.getElementsByClassName('atu-languageChoice');
  setSelect(initialBlocks);
  document.getElementsByClassName('atu-blockMenu').selectedIndex = 1;

  $( "#"+atu_parent_id ).on( "resizestop", ".keyboardPopup", function( event, ui ) {
    var gridwidth = Math.round($("#ViewerBox1").width() / 12 );
    var newWidth = ui.size.width;
    var colwidth = Math.round(newWidth/gridwidth);
    var newName = "col-md-"+colwidth;
    var theClasses = $(".keyboardPopup").attr("class").toString();
    var theStartIndex = theClasses.indexOf("col-md-");
    var theEndIndex;
    var spaceIndex = theClasses.indexOf(" ", theStartIndex);
    var finishingIndex = theClasses.length;
    if (spaceIndex == -1) {  theEndIndex = finishingIndex;  }
    else {  theEndIndex = spaceIndex;  };
    var theClassName = theClasses.substring(theStartIndex, theEndIndex);
    if ((theStartIndex != -1) && (theClassName != newName)) {
      $(".keyboardPopup").removeClass(theClassName).addClass(newName+" ");
    };

  } );

  $("#"+atu_parent_id).on("click", ".atu-options-dropdown-toggle", function(event){
      var theOptionRows = $(this).closest(".keyboardPopup").find(".languageRow");
      var theHandlebar = $(this).closest(".keyboardPopup").find(".keyboardHandlebar");
      if (theOptionRows.css("display") == "none") {
        theOptionRows.css("display", "block");
        theHandlebar.css("border-radius", "5px 5px 0px 0px");
      }
      else {
        theOptionRows.css("display", "none");
        theHandlebar.css("border-radius", "5px");
      };
  });

  $("#"+atu_parent_id).on("click", ".atu-search-dropdown-toggle", function(event){
      var theOptionRows = $(this).closest(".keyboardPopup").find(".searchUnicodeRow");
      var theHandlebar = $(this).closest(".keyboardPopup").find(".keyboardHandlebar");
      if (theOptionRows.css("display") == "none") {
        theOptionRows.css("display", "block");
        theHandlebar.css("border-radius", "5px 5px 0px 0px");
      }
      else {
        theOptionRows.css("display", "none");
        theHandlebar.css("border-radius", "5px");
      };
  });

  $("#"+atu_parent_id).on("change", ".atu-blockMenu", function(event) {
    buildMap(findMapID(this), this.options[this.selectedIndex].value);
  });

  $("#"+atu_parent_id).on("keypress", ".atu-ucode", function(event) {
    handleKeyPress(event, buildTheMap);
  });

  $("#"+atu_parent_id).on("click", ".atu-ucode-search-btn", function(event){
    var ucodeVal = $(this).closest(".searchUnicodeRow").find(".atu-ucode").val();
    var theBlockID = $(this).closest(".keyboardPopup").find(".atu-blockMenu").attr("id");
    var blockDOM = document.getElementById(theBlockID);
    buildTheMap(ucodeVal, blockDOM, findMapID(this));
  });

  $("#"+atu_parent_id).on("click", ".atu-prev-btn", function(event){
    buildMap(findMapID(this), toHex4(startPosition - 256));
  });

  $("#"+atu_parent_id).on("click", ".atu-next-btn", function(event){
    buildMap(findMapID(this), toHex4(startPosition + 256));
  });

};


$(".polyanno-add-ime").on("click", function(event){
  if ($(this).hasClass("polyanno-IME-options-open")) {
    $(".polyanno-add-ime").addClass("polyanno-IME-options-closed").removeClass("polyanno-IME-options-open");
    $(".polyanno-enable-IME").css("display", "none");
  }
  else {
    $(".polyanno-add-ime").addClass("polyanno-IME-options-open").removeClass("polyanno-IME-options-closed");
    $(".polyanno-enable-IME").css("display", "inline-block");
    $langSelector = $( 'select#polyanno-lang-selector' );
    $imeSelector = $( 'select#polyanno-ime-selector' );
  };
});

var addKeyboard = function(atu_parent_id) {

//need to eventually save HTML as string in JS file but for now cloning
//  var popupTranscriptionTemplate = document.getElementById("fullunicodesupportkeyboard");
//  var newPopupClone = popupTranscriptionTemplate.cloneNode("true");

  var newKeyboardID = addPopup("keyboardPopup", atu_main_HTML, atu_parent_id);
  $(newKeyboardID).addClass("ui-draggable");

  atu_initialise_setup(atu_parent_id);

};

