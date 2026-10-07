/* ============================================================
   Day-03 精讲词数据（词表第 200–299 行 = AML/KYC 第 27–126 个概念）
   每个词： [英文, 音标, 释义, 英式例句, 例句译文, 读音/用法提示]
   —— 词面必须与 词表-Anki导入.csv 完全一致（由 _build_day03.js 校验）
   ============================================================ */

const FOCUS = {

3: [
/* ---------- 一、监测 → 分诊 → 判断 ---------- */
["transaction monitoring (TM)","/trænˈzækʃn ˈmɒnɪtərɪŋ/","交易监测","Transaction monitoring generates the alerts that the first line reviews each morning.","交易监测产生警报，由第一道防线每天早上复核。","transaction 重音在 -ZAK-；monitoring 重音在首音节 /ˈmɒn-/，英式 /ɒ/ 短而圆。口语一律说 TM /ˌtiː ˈem/"],
["alert / alert triage","/əˈlɜːt/ · /ˈtriːɑːʒ/","警报 / 警报分诊","Every alert must be triaged within five working days and the outcome recorded.","每一条警报都必须在五个工作日内完成分诊，并记录结论。","triage 是法语借词，读 /ˈtriːɑːʒ/（「特里-啊日」），g 读 /ʒ/ 不读 /dʒ/，重音在首音节——本批词里最容易读错的一个"],
["aged alerts","/ˌeɪdʒd əˈlɜːts/","超期未处理警报","Aged alerts are reported to the risk committee every month.","超期未处理的警报每月向风险委员会报告。","aged 读 /eɪdʒd/ 一个音节，不是 /ˈeɪdʒɪd/；alerts 词尾 /ts/ 要一口气收住，不要加 /ɪ/ 变成 /əˈlɜːtsɪ/"],
["red flag","/ˌred ˈflæɡ/","危险信号","A single large cash deposit from an otherwise quiet account is a red flag.","原本安静的账户突然出现一笔大额现金存入，就是一个危险信号。","作名词短语时两词都可重读；red 的 /e/ 短促，别拖成 /reɪd/。搭配 raise / spot / clear a red flag"],
["unusual activity","/ʌnˈjuːʒuəl ækˈtɪvəti/","异常活动","Unusual activity must be assessed against the customer's known profile.","异常活动必须结合客户已知的画像进行评估。","unusual 读 /ʌnˈjuːʒuəl/，中间是浊音 /ʒ/ 不是 /s/，且三个音节挤得很紧；activity 重音在 -TIV-"],
["threshold","/ˈθreʃhəʊld/","阈值","Any cash transaction above the reporting threshold must be escalated.","任何超过申报阈值的现金交易都必须上报。","/θ/ 舌尖必须伸出齿间；/ʃ/ 与 /h/ 直接相连，h 送气极短。这个词读错，整句都会听岔"],
["structuring / smurfing","/ˈstrʌktʃərɪŋ/ · /ˈsmɜːfɪŋ/","拆分交易","Deliberately keeping payments below the threshold is structuring, and it is a criminal offence.","刻意把付款压在阈值以下就是拆分交易，属于刑事犯罪。","structuring 的 /strʌk/ 后直接接 /tʃə/，中间不加元音；smurfing 的 /ɜː/ 是长音且不卷舌"],

/* ---------- 二、风险评级与评估 ---------- */
["risk-based approach (RBA)","/ˈrɪsk beɪst əˈprəʊtʃ/","风险为本方法","A risk-based approach means the intensity of controls follows the risk.","风险为本方法意味着控制强度与风险相匹配。","approach 重音在第二音节 /əˈprəʊtʃ/，读成 /ˈæprəʊtʃ/ 就错了。口语说 RBA /ˌɑː biː ˈeɪ/"],
["customer risk rating / risk scoring","/ˈkʌstəmə rɪsk ˈreɪtɪŋ/","客户风险评级 / 风险评分","The customer risk rating drives the frequency of periodic review.","客户风险评级决定定期复核的频率。","rating 的 t 在英式里保持清脆 /ˈreɪtɪŋ/，不要浊化成美式 /ˈreɪdɪŋ/；rating 与 scoring 常混用，但 rating 是结论、scoring 是过程"],
["risk appetite","/ˈrɪsk ˈæpɪtaɪt/","风险偏好","The Board sets the risk appetite for each customer segment.","董事会为每一类客户设定风险偏好。","appetite 重音在首音节 /ˈæp-/，词尾 -ite 读 /aɪt/，不是 /ɪt/；不要读成 /əˈpetɪt/"],
["customer risk assessment (CRA)","/ˈkʌstəmə rɪsk əˈsesmənt/","客户风险评估","The CRA is refreshed whenever a trigger event occurs.","一旦发生触发事件，客户风险评估就要重新做。","assessment 重音在 -SESS-，双写 s 仍是清音 /s/。口语说 CRA /ˌsiː ɑːr ˈeɪ/"],
["business-wide risk assessment (BWRA)","/ˈbɪznəs waɪd rɪsk əˈsesmənt/","全业务风险评估","The BWRA is a legal requirement under the Money Laundering Regulations.","全业务风险评估是反洗钱条例规定的法定义务。","business 英式读 /ˈbɪznəs/，只有两个音节，i 完全不发音——读成 /ˈbɪzɪnəs/ 是典型中国式错误"],
["trigger event","/ˈtrɪɡə ɪˈvent/","触发事件","A change of ownership is a trigger event for enhanced due diligence.","股权变更属于触发强化尽职调查的事件。","trigger 的 /ɡ/ 后直接接 /ə/，中间不加音；event 重音在第二音节 /ɪˈvent/"],

/* ---------- 三、类型学与手法 ---------- */
["periodic review","/ˌpɪəriˈɒdɪk rɪˈvjuː/","定期复核","High-risk customers are subject to periodic review at least annually.","高风险客户至少每年接受一次定期复核。","periodic 重音在 -OD-，英式读 /ˌpɪəriˈɒdɪk/（含 /ɒ/），美式才是 /ˌpɪriˈɑːdɪk/"],
["typology","/taɪˈpɒlədʒi/","（犯罪）类型学","The NCA's typologies report sets out the methods seen in the last year.","NCA 的类型报告列明了上一年度出现的作案手法。","首音节是 /taɪ/（「泰」）不是 /tɪ/，重音在 -Pɒ-；typology 与 type 同源，这是记读音的抓手"],
["trade-based money laundering (TBML)","/ˈtreɪd beɪst ˈmʌni ˈlɔːndərɪŋ/","贸易洗钱","TBML hides the movement of value inside apparently ordinary trade documents.","贸易洗钱把资金转移隐藏在看似普通的贸易单证里。","laundering 的 /lɔːn-/ 是长音，词尾 /dərɪŋ/ 很轻几乎滑过。口语说 TBML /ˌtiː biː em ˈel/"],
["money mule / mule account","/ˈmʌni mjuːl/","钱骡 / 钱骡账户","Students are often recruited as money mules through social media.","学生常通过社交媒体被招募成钱骡。","mule 读 /mjuːl/，英式保留 /j/ 滑音（和 music 起音相同），不是 /muːl/"],

/* ---------- 四、上报与同意制度 ---------- */
["escalate / escalation memo","/ˈeskəleɪt/ · /ˌeskəˈleɪʃn ˈmeməʊ/","上报 / 上报备忘","Please escalate this to the MLRO and draft an escalation memo.","请将此上报给反洗钱报告官，并起草一份上报备忘。","动词重音在首音节 /ˈeskəleɪt/，名词重音后移 /ˌeskəˈleɪʃn/——同一词根、重音位置相反，听力里必须都认得"],
["consent regime","/kənˈsent reɪˈʒiːm/","同意制度","Under the consent regime, the transaction must wait for the NCA's decision.","在同意制度下，该笔交易必须等待 NCA 的决定。","consent 名词动词同音，重音都在后 /kənˈsent/；regime 读 /reɪˈʒiːm/，g 读 /ʒ/，不是 /rɪˈdʒaɪm/"],
["DAML request","/ˈdæml rɪˈkwest/","洗钱抗辩许可申请","We submitted a DAML request and received consent on day six.","我们提交了洗钱抗辩许可申请，第六天收到了同意。","读作「dam-l」当成一个词，不要逐字母念；展开是 Defence Against Money Laundering"],
["moratorium period","/ˌmɒrəˈtɔːriəm ˈpɪəriəd/","冻结期","During the moratorium period the bank may not proceed with the transaction.","在冻结期内，银行不得推进该笔交易。","moratorium 重音在 -TO-，词尾是 /əm/ 不是 /ʌm/；英式首音节 /ˌmɒrə/ 短促"],

/* ---------- 五、法律依据 ---------- */
["Money Laundering Regulations 2017","/ˈmʌni ˈlɔːndərɪŋ ˌreɡjuˈleɪʃnz/","英国反洗钱条例 2017","The Money Laundering Regulations 2017 require a business-wide risk assessment.","2017 年反洗钱条例要求开展全业务风险评估。","Regulations 重音在 -LA-；英式读 /ˌreɡjuˈleɪʃnz/，不是美式 /ˌreɡjəˈleɪʃnz/。年份读 twenty seventeen，不读 two thousand and seventeen"],
["JMLSG Guidance","/ˌdʒeɪ em el es ˈdʒiː ˈɡaɪdns/","英国反洗钱行业指引","The JMLSG Guidance is not law, but supervisors expect firms to follow it.","JMLSG 指引不是法律，但监管机构期望机构遵循它。","五个字母逐个读 /dʒeɪ em el es dʒiː/；guidance 读 /ˈɡaɪdns/，只有两个音节，中间的元音几乎消失"],

/* ---------- 六、整改与治理 ---------- */
["remediation","/rɪˌmiːdiˈeɪʃn/","整改","The remediation programme covers 4,000 files identified in the lookback.","整改方案覆盖回溯审查中识别出的 4,000 份档案。","重音在 -Eɪ-，前面 rɪ-miː-di 三个音节全部快读；读成 /ˌremɪˈdeɪʃn/ 就错了"],
["lookback review","/ˈlʊkbæk rɪˈvjuː/","回溯审查","The lookback review went back six years and covered every high-risk file.","回溯审查追溯了六年，覆盖全部高风险档案。","lookback 是复合名词，重音落在第一个词 /ˈlʊkbæk/，不要读成两个等重的词；review 重音在后"],
["first / second / third line","/ˌfɜːst laɪn/","第一 / 第二 / 三道防线","Monitoring sits in the first line; compliance oversight is the second line.","监测属于第一道防线，合规监督属于第二道防线。","first 的 /ɜː/ 是长音且不卷舌（this 那条规则）；说三条线时用 first, second and third line，最后一项降调"],
["key risk indicator (KRI)","/kiː rɪsk ˈɪndɪkeɪtə/","关键风险指标","Aged alerts are the single most useful KRI for an AML function.","超期未处理警报是反洗钱职能最有用的一个关键风险指标。","indicator 重音在首音节 /ˈɪn-/；口语说 KRI /ˌkeɪ ɑːr ˈaɪ/。KRI 是先行指标，KPI 是结果指标，别混"],
["management information (MI)","/ˈmænɪdʒmənt ˌɪnfəˈmeɪʃn/","管理信息","The MI pack goes to the Board three weeks after quarter end.","管理信息包在季度结束后三周提交董事会。","management 英式三个音节 /ˈmænɪdʒmənt/，中间的 /ɪ/ 极轻；口语说 MI /ˌem ˈaɪ/"],
["tone from the top","/ˈtəʊn frəm ðə ˈtɒp/","高层基调","Supervisors look for evidence of tone from the top, not just policies.","监管机构要找的是高层基调的证据，而不只是制度文本。","from the 三词连读成 /frəmðə/，几乎听不出是两个词；tone 的 /əʊ/ 是双元音，要有滑动"],
["whistleblowing","/ˈwɪslbləʊɪŋ/","内部举报","Whistleblowing is protected under the Public Interest Disclosure Act 1998.","内部举报受 1998 年公共利益披露法保护。","whistle 的 /t/ 夹在 /s/ 和 /l/ 之间基本消失，读 /ˈwɪsl-/；结尾 /bləʊɪŋ/ 连成一串"]
]

};

if (typeof module !== "undefined") { module.exports = { FOCUS }; }
