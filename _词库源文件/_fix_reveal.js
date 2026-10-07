/* 重写 Day-01/02 的 reveal 区块 + 同步文案 */
const fs = require('fs');
const path = require('path');
const DIR = 'D:/英语培训教程';

/* ---------- 定位并替换 revbd 区块 ---------- */
function replaceReveal(html, newInner) {
  const key = '<div class="revbd">';
  const s = html.indexOf(key);
  if (s < 0) throw new Error('未找到 revbd');
  let i = s + key.length, depth = 1;
  while (i < html.length && depth > 0) {
    const nxt = html.indexOf('<div', i);
    const close = html.indexOf('</div>', i);
    if (close < 0) break;
    if (nxt >= 0 && nxt < close) { depth++; i = nxt + 4; }
    else { depth--; i = close + 6; if (depth === 0) { return html.slice(0, s + key.length) + '\n' + newInner + '\n    ' + html.slice(close); } }
  }
  throw new Error('revbd 未闭合');
}

/* ---------- Day-01：合规场景进阶搭配 ---------- */
const D1 = [
  ['nostro account', 'real-time nostro；nostro position；fund the nostro account'],
  ['vostro account', 'vostro balance；maintain a vostro account for a correspondent'],
  ['correspondent banking', 'correspondent banking due diligence（CBDD）；nested correspondent banking'],
  ['remittance', 'cross-border remittance；remittance information；remittance advice'],
  ['letter of credit (L/C)', 'confirmed / unconfirmed L/C；irrevocable L/C；L/C at sight'],
  ['syndicated loan', 'arranger；bookrunner；tranche；subscription'],
  ['underwriting', 'firm-commitment underwriting；best-efforts underwriting；underwriting syndicate'],
  ['custody', 'safekeeping；sub-custody；custody account'],
  ['custodian', 'global custodian；custody agreement；custodian network'],
  ['derivative', 'OTC derivative；derivative transaction reporting；EMIR'],
  ['collateral', 'collateral management；post / release collateral；eligible collateral'],
  ['haircut', 'apply a haircut；valuation haircut；haircut schedule'],
  ['capital adequacy', 'capital adequacy ratio；assess capital adequacy'],
  ['Basel III', 'Basel III reforms；Basel Committee（BCBS）；fully-loaded Basel III'],
  ['CET1 (Common Equity Tier 1)', 'CET1 capital；CET1 ratio；transitional vs fully-loaded CET1'],
  ['risk-weighted assets (RWA)', 'credit risk RWA；RWA density；model-based RWA'],
  ['liquidity coverage ratio (LCR)', 'LCR ratio；30-day stress；HQLA buffer'],
  ['stress testing', 'stress scenario；reverse stress testing；PRA stress test'],
  ['provisioning', 'collective / specific provisioning；IFRS 9 staging'],
  ['impairment', 'impairment charge；impairment test；impairment reversal'],
  ['non-performing loan (NPL)', 'NPL ratio；NPL workout；forbearance on NPLs'],
  ['exposure', 'gross / net exposure；country exposure；large exposure'],
  ['fiduciary duty', 'owe a fiduciary duty；conflicts of interest；best execution'],
  ['prospectus', 'approved prospectus；supplementary prospectus；prospectus regulation'],
  ['securitisation', 'true sale securitisation；STS securitisation；retained securitisation'],
  ['covenant', 'financial covenant；covenant breach；covenant waiver / holiday'],
  ['forbearance', 'grant forbearance；forborne exposure；forbearance measures'],
  ['onboarding / offboarding', 'onboarding file；onboarding checklist；offboarding review'],
  ['de-risking', 'de-risking pressure；avoid wholesale de-risking；FATF guidance on de-risking'],
  ['ring-fencing', 'ring-fenced body；ring-fencing rules；independence requirements']
];

/* ---------- Day-02：英式读音速记法 ---------- */
const D2 = [
  ['reconciliation', '/ˌrekənsɪliˈeɪʃn/', '前面 re-con-ci-li 四个音节快读，重音落在 <b>-Eɪ-</b>；来自 reconcile /ˈrekənsaɪl/'],
  ['nostro break', '/ˈnɒstrəʊ breɪk/', 'nostro 重音在首音节 <b>/ˈnɒs-/</b>；break 在这里是名词「差异」，别按动词理解'],
  ['suspense account', '/səˈspens/', '重音在 <b>第二音节</b>，不是首音节；与 suspension /səˈspenʃn/ 同源但尾音不同'],
  ['dormant account', '/ˈdɔːmənt/', '首音节 <b>/dɔː/</b> 是长音「多」，不是 /dəʊ/'],
  ['legal entity identifier (LEI)', '/ˈliːɡl ˈentəti/', 'entity 英式常把 t 读成接近 /d/ 的闪音；LEI 直接读字母'],
  ['corporate actions', '/ˈkɔːpərət/', '英式有两种读法：/ˈkɔːpərət/ 与压缩版 <b>/ˈkɔːprət/</b>，重音都在首音节'],
  ['payment system', '/ˈpeɪmənt/', '英式的 /t/ 保持清脆，不要浊化成美式的 /d/'],
  ['RTGS', '/ˌɑː tiː dʒiː ˈes/', '四个字母逐个读；展开就是 real-time gross settlement'],
  ['pacs.008', '/pæks ˈəʊ ˈeɪt/', '读作 <b>「packs oh eight」</b>；ISO 20022 里最常用的支付报文'],
  ['camt.053', '/kæmt ˈəʊ ˈfɪfti θriː/', '读作 <b>「cam oh fifty-three」</b>，o 读字母音 /əʊ/'],
  ['UETR', '/ˌjuː iː tiː ˈɑː/', '读字母；注意首字母 U 读 /juː/ 而非 /uː/'],
  ['straight-through processing (STP)', '/ˌstreɪt θruː/', 'straight 的 /t/ 与 through 的 /θ/ 相邻，<b>中间不要拖音或加 /ə/</b>'],
  ['sort code', '/ˈsɔːt kəʊd/', '英式 /ɔː/ 长音，与 short 同韵；不是 /sɒt/'],
  ['payer / payee', '/ˈpeɪə/ · /ˌpeɪˈiː/', '两个词重音位置相反：payer 重音在前，payee 重音在 <b>末尾</b>——靠重音区分谁付谁收'],
  ['SONIA', '/ˈsəʊniə/', '读作 <b>「SO-nee-ah」</b>；同类还有 SOFR /ˈsəʊfə/、€STR'],
  ['basis point (bp)', '/ˈbeɪsɪs pɔɪnt/', 'basis 读 <b>/ˈbeɪsɪs/</b>，不是 /ˈbæsɪs/；口语常说 bp /ˌbiː ˈpiː/'],
  ['yield curve', '/jiːld kɜːv/', 'yield 的 /jiː/ 与 year 同音，不是 /jɪəld/'],
  ['HQLA', '/ˌeɪtʃ kjuː el ˈeɪ/', '读字母；与 Level 2 haircut 常成对出现'],
  ['MREL', '/ˈemrel/', '可以 <b>整体拼读</b>成「em-rel」，不必读字母；与 TLAC 是一对'],
  ['ICAAP', '/ˈaɪkæp/', '读作 <b>「eye-cap」</b>；对应的流动性版本是 ILAAP'],
  ['recovery plan', '/rɪˈkʌvəri/', '重音在 <b>-CU-</b>；与 resolution plan 是「事前 / 事后」对应'],
  ['treasury', '/ˈtreʒəri/', '读作 <b>「tre-zhə-ri」</b>，中间的 s 浊化成 /ʒ/；不是 /ˈtruːʒəri/'],
  ['anti-money laundering (AML)', '/ˌænti ˈmʌni ˈlɔːndərɪŋ/', 'launder 的 /ɔː/ 是长音；口语一律说 AML /ˌeɪ em ˈel/'],
  ['counter-terrorist financing (CTF)', '/ˌkaʊntə ˈterərɪst/', 'terrorist 英式读三音节 <b>/ˈterərɪst/</b>，重音在首音节'],
  ['predicate offence', '/ˈpredɪkət əˈfens/', 'predicate 此处是形容词，尾音弱读成 <b>/ət/</b>，绝不读 /eɪt/'],
  ['Customer Due Diligence (CDD)', '/ˌsiː diː ˈdiː/', '读字母；三档递进：SDD 简化 → CDD 标准 → EDD 强化'],
  ['Enhanced Due Diligence (EDD)', '/ˌiː diː ˈdiː/', '读字母；EDD 要求资金来源与财富来源 <b>双线证明</b>'],
  ['Ultimate Beneficial Owner (UBO)', '/ˌjuː biː ˈəʊ/', '读字母；英国门槛是持股 <b>25%</b>，识别不到按高风险处理'],
  ['Politically Exposed Person (PEP)', '/ˌpiː iː ˈpiː/', '读字母；注意离任后通常仍须继续监控'],
  ['tipping off', '/ˈtɪpɪŋ ɒf/', '这是<b>刑事罪名</b>，读的时候别把它当普通动词短语；搭配 avoid tipping off']
];

function build(list, fn) {
  return '<div class="script" style="font-size:13px;">\n' +
    list.map((x, i) => '        ' + fn(x, i + 1)).join('<br>\n') +
    '\n      </div>';
}

/* ---------- 执行 ---------- */
const f1 = path.join(DIR, 'Day-01.html');
let h1 = fs.readFileSync(f1, 'utf8');
h1 = replaceReveal(h1, build(D1, (x, i) => '<b>' + i + '. ' + x[0] + '</b> — ' + x[1]));
fs.writeFileSync(f1, h1, 'utf8');
console.log('Day-01 reveal 已重写，条目:', D1.length);

const f2 = path.join(DIR, 'Day-02.html');
let h2 = fs.readFileSync(f2, 'utf8');
h2 = replaceReveal(h2, build(D2, (x, i) => '<b>' + i + '. ' + x[0] + '</b> <span class="mono">' + x[1] + '</span> — ' + x[2]));
fs.writeFileSync(f2, h2, 'utf8');
console.log('Day-02 reveal 已重写，条目:', D2.length);
