/* ============================================================
   Day-06 精讲词数据（词表第 500–599 行）
   =  金融犯罪、欺诈与执法 40 条（行 500–539）
      + 金融产品与市场工具 60 条（行 540–599）
   每个词： [英文, 音标, 释义, 英式例句, 例句译文, 读音/用法提示]
   —— 词面必须与 词表-Anki导入.csv 完全一致（由 _build_day06.js 校验）
   ============================================================ */

const FOCUS = {

6: [
/* ---------- 一、执法与调查程序（7） ---------- */
["deferred prosecution agreement (DPA)","/dɪˈfɜːd ˌprɒsɪˈkjuːʃn əˈɡriːmənt/","暂缓起诉协议","The firm agreed a deferred prosecution agreement with the SFO, and the penalty was reduced.","该公司与严重欺诈办公室达成暂缓起诉协议，处罚被减轻。","<b>de·FER·red</b> 重音在第二音节，/ɜː/ 英式不卷舌；<b>prose·CU·tion</b> 重音在 -CU-，词尾 /ʃn/ 压缩；<b>a·GREE·ment</b> 重音在 -GREE-，中间的 /ɡr/ 不要读成 /ɡər/。DPA 本身逐字母读 /ˌdiː piː ˈeɪ/"],
["corporate criminal offence","/ˌkɔːpərət krɪˈmɪnəl əˈfens/","企业犯罪","An economic crime committed by an employee is still a corporate criminal offence for the firm.","员工实施的经济犯罪，对公司而言仍构成企业犯罪。","corporate 词尾 <b>-ate 弱读 /ət/</b>（不是 /eɪt/）；criminal 重音在<b>首</b>音节，词尾 -al 读 /əl/；offence <b>英式拼 -ce</b>，重音在 -FENCE-，结尾 /s/ 是清音"],
["identification principle","/aɪˌdentɪfɪˈkeɪʃn ˈprɪnsəpl/","同一性原则","The identification principle asks whether the person charged is the person who did the act.","同一性原则追问的是被指控的人是否就是实施该行为的人。","identification 四个音节里只有 <b>-CA-</b> 重读，前面 aɪ-den-ti-fi- 全快读，词尾 /ʃn/ 不加 /ən/；principle 重音在<b>首</b>音节，-ple 弱读 /əl/，英式 /ˈprɪnsəpl/ 不读成 /ˈprɪnsɪpl/"],
["senior management liability","/ˌsenjər ˈmænɪdʒmənt ˌlaɪəˈbɪləti/","高级管理层责任","Under the failure to prevent offence, senior management liability attaches if the controls were inadequate.","在「未能预防」罪下，若控制措施不足，高级管理层即承担责任。","senior 英式<b>两音节</b> /ˈsenjər/，不是三音节 /ˈsiːniə/；management 重音在<b>首</b>音节 /ˈmænɪdʒmənt/，中间是短音 /ɪ/；liability 重音在 <b>-BIL-</b>"],
["consent order","/kənˈsent ˈɔːdə/","同意令","The regulator issued a consent order imposing a record penalty without a full investigation.","监管机构发出同意令，在未进行完整调查的情况下施加创纪录的处罚。","consent 重音在<b>后</b> /kənˈsent/，中间的 /s/ 是清辅音（前后都是 /n/ 与 /t/）；order 的 /ɔː/ 长音<b>不卷舌</b>，词尾 /ə/ 弱读"],
["compelled interview","/kəmˈpeld ˈɪntəvjuː/","强制询问","Under the DPA, senior staff agreed to a compelled interview with the SFO.","依据暂缓起诉协议，高级员工同意接受严重欺诈办公室的强制询问。","compelled 重音在<b>后</b>，-ed 只读 /d/（原形 compel 结尾是 /l/，不加音节）；<b>interview 英式词尾没有 /r/</b>，读 /ˈɪntəvjuː/ —— 这是最容易被美国同事带跑的地方"],
["interview under caution","/ˌɪntəvjuː ˈʌndə ˈkɔːʃn/","具警示讯问","An interview under caution must be conducted on a legal basis with a caution at the outset.","具警示讯问必须在有法律依据、且开场即给予警示的情况下进行。","caution 词尾 <b>/ʃn/ 压成一个音节</b>，不读成 /ˈkɔːʃən/；重音在<b>首</b>音节；under 词尾 /ə/ 弱读。<b>这里的 caution 是「警告」，不是「小心」</b>"],

/* ---------- 二、搜查与证据（5） ---------- */
["dawn raid","/dɔːn reɪd/","突击搜查","A dawn raid means officers arrive before the office opens and take devices before anyone can delete anything.","突击搜查意味着人员在办公室开门前到达，并在任何人能删除证据之前收走设备。","<b>dawn 的 /ɔː/ 是英式标志：不卷舌</b>，读成 /dɔːrn/ 就露馅了；raid 的 /eɪ/ 要滑足，-d 收住不加元音；两个词都重读（这是术语）"],
["search warrant","/ˈsɜːtʃ ˈwɒrənt/","搜查令","The regulator cannot enter the premises without a search warrant; it must go to court first.","监管机构没有搜查令不得进入场所，必须先向法院申请。","search 的 <b>/ɜː/ 不卷舌</b>、词尾 /tʃ/ 要干脆，不要糊成 /tʃə/；warrant 三音节里首音节重读，后两个弱读，英式 /ˈwɒrənt/ 不读成 /ˈwɔːrənt/"],
["preservation notice","/ˌprezəˈveɪʃn ˈnəʊtɪs/","证据保全通知","Once a preservation notice is issued, every in-house system must be frozen from deletion.","一旦发出证据保全通知，所有内部系统的删除功能必须被冻结。","preservation 重音在 <b>-VA-</b>（不是 -PRE- 或 -SER-），第二音节弱读 /ə/，词尾 /ʃn/ 压缩；notice 英式首音是 <b>/nəʊ/</b>，不是美式 /noʊ/"],
["legal hold","/ˈliːɡl həʊld/","法律留置","Put a legal hold on the mailbox and the shared drive before anyone touches anything.","在任何��动任何东西之前，对邮箱和共享盘下法律留置。","legal 只有<b>两音节</b> /ˈliːɡl/，词尾 /ɡl/ = /ɡ/ + /l/ 紧连，<b>不要读成三音节 /ˈleɡəl/</b>；hold 的 /əʊ/ 不卷舌，-ld 收住不加元音。两词都重读"],
["e-discovery","/ˌiː dɪˈskʌvəri/","电子取证","E-discovery means the emails live on the server, so we need a preservation notice and a vendor to collect them.","电子取证意味着邮件在服务器上，所以需要证据保全通知并请供应商提取。","e- 前缀英式读<b>长音 /ˌiː/</b>；discovery 重音在<b>首音节</b> /dɪˈskʌ-/（不是 -COV-），中间是 /sk/，词尾 /əri/ 弱读"],

/* ---------- 三、特权与内部调查（5） ---------- */
["legal professional privilege (LPP)","/ˈliːɡl prəˈfeʃənl ˈprɪvəlɪdʒ/","法律职业特权","An internal investigation report does not automatically carry LPP; that is exactly what the Upjohn warning is for.","内部调查报告并不自动享有法律职业特权；这正是厄普约翰警示存在的意义。","professional 重音在 <b>-FES-</b>，词尾 /ənl/ 弱读；privilege 重音在<b>首</b>音节，词尾 /ɪdʒ/ 是<b>两个音</b>（/d/ + /ʒ/）不要糊成一个"],
["litigation privilege","/ˌlɪtɪˈɡeɪʃn ˈprɪvəlɪdʒ/","诉讼特权","Litigation privilege protects documents created once proceedings are reasonably in contemplation.","诉讼特权保护的是在诉讼已可合理预见之后才制作的文书。","litigation 四个音节<b>只有 -GA- 重读</b>，词尾 /ʃn/ 压缩；连读时后面的 privilege 首音节要重起来，否则整块会糊"],
["advice privilege","/ədˈvaɪs ˈprɪvəlɪdʒ/","法律意见特权","Advice privilege covers legal advice given to a client; litigation privilege covers the litigation itself.","法律意见特权保护给予客户的法律意见；诉讼特权保护诉讼本身。","advice 是名词，重音在<b>后</b> /ədˈvaɪs/，结尾<b>清音 /s/</b>；动词 advise 读 /ədˈvaɪz/ 结尾浊音——<b>名词与动词读音不同</b>，这是今天最实用的一条"],
["Upjohn warning","/ˈʌpdʒɔːn ˈwɔːnɪŋ/","厄普约翰警示","Without an Upjohn warning, the internal investigation may not be privileged.","没有厄普约翰警示，内部调查可能不享有特权。","Upjohn 首音 /ʌ/ 是短音，第二个音是<b>塞擦音 /dʒ/</b>；<b>-ohn 里的 /ɔː/ 英式不卷舌</b>（美式 /ˈʌpdʒɔːrn/ 会卷）——这个词就是靠不卷舌认出来的"],
["internal investigation","/ɪnˈtɜːnl ɪnˌvestɪˈɡeɪʃn/","内部调查","An internal investigation run without legal input is the single most common cause of a failed privilege claim.","没有法律介入的内部调查，是特权主张失败最常见的单一原因。","internal 重音在<b>后</b> /ɪnˈtɜːnl/（不是 IN-ter-nal），/ɜː/ 不卷舌，词尾 /ənl/；investigation 四个音节只有 <b>-GA-</b> 重读"],

/* ---------- 四、举报与纪律（5） ---------- */
["insider threat","/ˈɪnsaɪdə θret/","内部威胁","The fraud was enabled by an insider threat, not by an external attack.","这起欺诈是内部威胁造成的，不是外部攻击。","threat 首音 <b>/θ/ 舌尖必须伸出齿间</b>，第二个音是<b>短音 /e/</b>——读成 /θreɪt/ 就变成了 throat（喉咙）；insider 词尾 /ə/ 不卷舌"],
["protected disclosure","/prəˈtektɪd dɪsˈkləʊʒə/","受保护的披露","Making a protected disclosure in good faith protects you from being dismissed.","善意作出受保护的披露，可使你免于被解雇。","protected 重音在<b>第二音节</b> /prəˈtektɪd/，-ed 读 /ɪd/（原形 protect 结尾 /t/）；disclosure 重音在 <b>-CLO-</b>，中间的 s 读浊音 /z/"],
["detriment","/ˈdetrɪmənt/","不利对待","Detriment is the legal test: it is a detriment whether or not you actually suffered loss.","「不利对待」是法律检验：不管你是否真的遭受损失，只要被这样对待就构成不利对待。","重音在<b>首音节</b> /ˈdetrɪmənt/，中间 /trɪ/ 是短音，词尾 /mənt/ 弱读。读成 de-TRIM-ent 就错了——<b>「被穿小鞋」本身就是 detriment</b>"],
["speak-up channel","/ˈspiːk ʌp ˈtʃænl/","举报渠道","The speak-up channel must be independent of management and allow anonymous reports.","举报渠道必须独立于管理层，并允许匿名举报。","speak 的 /iː/ 长音，up 弱读 /ʌp/；channel 三音节里首音节重读，词尾 <b>/ənl/</b> 不读成 /əl/；两个词都重读（这是术语）"],
["summary dismissal","/ˈsʌməri dɪˈzɪml/","即时解雇","Summary dismissal without notice is only lawful in a small number of cases.","不预先通知的即时解雇只在极少数情形下才合法。","summary 重音在<b>首</b> /ˈsʌməri/（不是 su-MMA-ry），/ʌ/ 是短音；dismissal 重音在<b>第二音节 -MIS-</b>，词尾 /əl/ 弱读，不加 /ə/"],

/* ---------- 五、处罚与复盘（3） ---------- */
["regulatory referral","/ˈreɡjələtri rɪˈfɜːəl/","监管移送","A regulatory referral is a referral to a regulator — a different thing from a report to the police.","regulatory referral 是「向监管机构移送」——与「向警方报案」是两件事。","regulatory 重音在<b>首</b> /ˈreɡjələtri/，词尾 -ory 弱读 /ətri/；referral 重音在<b>后</b> /rɪˈfɜːəl/，/fɜː/ 不卷舌。<b>英式「refer」是向上级/监管层报告，不是「转介」</b>"],
["disgorgement","/dɪsˈɡɔːdʒmənt/","吐出违法所得","Disgorgement means giving up the profit you made from the breach.","disgorgement 指交出因违法行为所得的利润。","dis- 前缀是 /dɪs/（带 s 音）；中间的 <b>/dʒ/ 是塞擦音</b>不是 /ɡ/；重音在<b>第二音节 -GORGE-</b>；词尾 /mənt/ 弱读"],
["lessons learned review","/ˈlesnz lɜːnd rɪˈvjuː/","教训总结复盘","A lessons learned review is not about blame; it is about fixing the control that failed.","教训复盘不是为了追责，是为了修补失效的那道控制。","lessons 只有两个音节，词尾 <b>/nz/ 浊音</b>；learned 这里读<b>一个音节 /lɜːnd/</b>（不读 /ˈlɜːnɪd/），/ɜː/ 不卷舌；review 重音在<b>后</b> /rɪˈvjuː/"],

/* ---------- 六、金融产品开篇（5） ---------- */
["equity","/ˈekwɪti/","股票 / 权益","Equity is the cheapest form of capital, but it dilutes existing shareholders.","股权是最便宜的资金形式，但它会稀释现有股东。","重音在<b>首</b>音节；首元音是 <b>/e/ 不是 /ɪ/</b>，英式<b>不卷舌</b>；中间 /kwɪ/ 是短音，词尾 /ti/ 英式不浊化（美式 /di/）"],
["preference share","/ˈprefrəns ʃeə/","优先股","Preference shares rank ahead of ordinary shares for dividends, but not for voting.","优先股在分红上优先于普通股，但在投票权上不优先。","preference 重音在<b>首</b>，中间直接是 /frə/（不读 /fərə/），词尾 /ns/ 浊音；<b>share 英式读 /ʃeə/ 两音节，不是美式 /ʃer/</b>"],
["government bond / gilt","/ˈɡʌvənmənt bɒnd ɡɪlt/","政府债券 / 英国金边债券","A gilt is a UK government bond issued by the Debt Management Office.","gilt 是由债务管理办公室发行的英国政府债券。","government 的 <b>/ʌ/ 是标志</b>（短音，不卷舌，不是 /ɒ/ 也不是 /əʊ/）；bond 的 <b>/ɒ/ 是英式专属短圆唇音</b>（美式读 /bɑnd/）；gilt 是短音 /ɡɪlt/ 不是 /ɡiːlt/"],
["high-yield bond","/ˌhaɪ ˈjiːld bɒnd/","高收益债","High-yield bonds carry a higher coupon because the issuer is rated below investment grade.","高收益债票息更高，因为发行人的评级低于投资级。","yield 的 <b>/iː/ 是长音</b>，词尾 /ld/ 收住不加元音；high 弱读 /ˌhaɪ/，重音落在 <b>yield</b> 上；整块读成一个语块"],
["investment grade","/ɪnˈvestmənt ɡreɪd/","投资级","Anything rated below investment grade is treated as subordinated debt for regulatory purposes.","评级低于投资级的一切，在监管上都被视为次级债。","investment 重音在<b>第二音节 -VES-</b>（不是 IN-vest-ment），词尾 /mənt/ 弱读；grade 单独重读，/eɪ/ 滑足、-d 收住"]
]

};

if (typeof module !== "undefined") { module.exports = { FOCUS }; }
