/* ============================================================
   Day-01 / Day-02 精讲词数据（对齐词表后重写）
   每个词： [英文, 音标, 释义, 英式例句, 例句译文, 读音/用法提示]
   ============================================================ */

const FOCUS = {

/* ---------- Day-01：词表第 1-100 行（银行业与国际金融市场）---------- */
1: [
["nostro account","/ˈnɒstrəʊ əˈkaʊnt/","往账账户","Our nostro account with the correspondent showed a credit balance at close of business.","我行的往账账户在代理行处，日终显示贷方余额。","nostro 借自意大利语「我们的」，重音在首音节 /ˈnɒstrəʊ/，别读成 /nəʊˈstrəʊ/"],
["vostro account","/ˈvɒstrəʊ əˈkaʊnt/","来账账户","The correspondent holds a vostro account with us in sterling.","该代理行在我行开立了一个英镑来账账户。","与 nostro 互为镜像：钱在别人家叫 nostro，钱在我家叫 vostro。首音 /v/ 要咬唇，别读成 /w/"],
["correspondent banking","/ˌkɒrəˈspɒndənt ˈbæŋkɪŋ/","代理行业务","Correspondent banking relationships are subject to enhanced due diligence.","代理行关系须接受强化尽职调查。","重音在 -SPON-；这是 AML 高风险领域，英美监管都会重点查"],
["remittance","/rɪˈmɪtns/","汇款","The remittance was returned because the beneficiary's IBAN was incorrect.","该笔汇款因收款人 IBAN 有误被退回。","重音在 -MIT-，词尾 -ance 弱化成 /ns/，几乎听不到元音——精听时最容易漏掉的就是这种尾音"],
["letter of credit (L/C)","/ˈletər əv ˈkredɪt/","信用证","The letter of credit is confirmed by a UK bank, so the exporter bears no issuing-bank risk.","该信用证由英国银行保兑，出口商不承担开证行风险。","口语里常直接说 L/C，读作 /el siː/；of 弱读成 /əv/"],
["syndicated loan","/ˈsɪndɪkeɪtɪd ləʊn/","银团贷款","The syndicated loan was oversubscribed, so the arranger scaled back allocations.","该银团贷款超额认购，牵头行相应缩减了额度分配。","syndicated 重音在首音节 /ˈsɪn-/，不是 /sɪnˈdɪkətɪd/"],
["underwriting","/ˈʌndəraɪtɪŋ/","承销 / 包销","The bank's underwriting commitment was reduced after the book-building closed.","簿记建档结束后，该行的承销承诺相应减少。","/ʌ/ 是短促的「啊」，别读成 /ʊ/；重音在首音节"],
["custody","/ˈkʌstədi/","资产托管","The securities are held in custody with a local sub-custodian.","该证券由当地次托管机构托管。","重音首音节 /ˈkʌs-/，中间 /tə/ 弱读成几乎听不见"],
["custodian","/kʌˈstəʊdiən/","托管人","The custodian provides safekeeping, settlement and corporate-action processing.","托管人提供保管、结算与公司行为处理服务。","重音在 -STO-，与 custody 的重音位置正好相反——这对词常被读错"],
["derivative","/dɪˈrɪvətɪv/","衍生品","All derivative positions must be marked to market daily.","所有衍生品头寸必须每日按市值计价。","重音在第二音节；词尾 -ative 弱读成 /ətɪv/"],
["collateral","/kəˈlætərəl/","担保物、抵押品","The counterparty posted additional collateral following the margin call.","收到追加保证金通知后，交易对手补交了担保物。","重音在 -LAT-；末尾 /əl/ 轻带，不要读成 /kəˈlætəræl/"],
["haircut","/ˈheəkʌt/","折扣率、估值减值","A 5% haircut is applied to the market value of the collateral.","对担保物的市值适用 5% 的折扣率。","英式 /heə/ 带 /ə/ 滑音，不是 /hɑː/；这个词在金融语境里很少指「理发」"],
["capital adequacy","/ˈkæpɪtl ˈædɪkwəsi/","资本充足","The firm's capital adequacy position is reported to the Board monthly.","该机构的资本充足状况每月向董事会报告。","adequacy 重音在首音节 /ˈædɪkwəsi/，别按 adequate 的节奏读成 /əˈdek wəsi/"],
["Basel III","/ˈbɑːzl θriː/","巴塞尔协议 III","Basel III introduced the leverage ratio and the liquidity coverage ratio.","巴塞尔 III 引入了杠杆率与流动性覆盖率。","Basel 读 /ˈbɑːzl/（巴-泽尔），不是 /ˈbeɪsl/"],
["CET1 (Common Equity Tier 1)","/ˌsiː iː ˈtiː wʌn/","核心一级资本","The bank's CET1 ratio stood at 14.2% at the year-end.","该行年末核心一级资本充足率为 14.2%。","字母逐个读 /siː iː tiː/ 再加 one，不要试图读成一个单词"],
["risk-weighted assets (RWA)","/rɪsk ˈweɪtɪd ˈæsets/","风险加权资产","Risk-weighted assets increased after the model update.","模型更新后风险加权资产上升。","assets 英式读 /ˈæsets/，两个音节都短；口语常说 RWA /ˌɑː dʌbljuː ˈeɪ/"],
["liquidity coverage ratio (LCR)","/lɪˈkwɪdəti ˈkʌvərɪdʒ ˈreɪʃiəʊ/","流动性覆盖率","The LCR must stay above 100% on every business day.","流动性覆盖率在每个营业日都必须保持在 100% 以上。","liquidity 重音在 -QUID-；ratio 英式读 /ˈreɪʃiəʊ/，不是美式 /ˈreɪʃoʊ/"],
["stress testing","/ˈstres ˌtestɪŋ/","压力测试","The stress test modelled a 200 basis point rise in interest rates.","该压力测试模拟了利率上升 200 个基点的情形。","两个词都重读；stress 的 /e/ 短促，别拖长"],
["provisioning","/prəˈvɪʒənɪŋ/","计提拨备","Provisioning levels were increased in response to the deteriorating portfolio.","因资产质量恶化，拨备计提水平提高。","重音在 -VI-；-sion- 读 /ʒən/，是浊音"],
["impairment","/ɪmˈpeəmənt/","减值","An impairment charge of £40m was recognised in the third quarter.","第三季度确认了 4,000 万英镑的减值损失。","英式 /peə/ 是双元音带滑音；重音在第二音节"],
["non-performing loan (NPL)","/ˌnɒn pəˈfɔːmɪŋ ləʊn/","不良贷款","The NPL ratio remained below the regulatory threshold.","不良贷款率保持在监管阈值以下。","performing 重音在 -FORM-；口语常说 NPL /ˌen piː ˈel/"],
["exposure","/ɪkˈspəʊʒə/","风险敞口","Aggregate exposure to the sector is capped at 15% of capital.","对该行业的合计敞口上限为资本的 15%。","重音在 -SPO-；-sure 读浊音 /ʒə/，不是 /ʃə/"],
["fiduciary duty","/fɪˈdjuːʃəri ˈdjuːti/","受托责任","The bank owes a fiduciary duty to the underlying investors.","银行对底层投资者负有受托责任。","fiduciary 英式保留 /djuː/ 不读 /duː/；重音在第二音节"],
["prospectus","/prəˈspektəs/","招股说明书","The prospectus was approved by the FCA on 12 March.","招股说明书于 3 月 12 日获 FCA 批准。","重音在 -SPEC-；复数是 prospectuses，不是 prospecti"],
["securitisation","/sɪˌkjʊərətaɪˈzeɪʃn/","证券化","The securitisation transferred the loans to a bankruptcy-remote SPV.","该证券化将贷款转让给一个破产隔离的特殊目的实体。","两个重音；英式拼 -isation，美式 -ization，拼写差异在文书里很显眼"],
["covenant","/ˈkʌvənənt/","契约条款","A breach of any financial covenant triggers an event of default.","违反任何财务承诺条款都会触发违约事件。","重音首音节 /ˈkʌv-/，不是 /kəˈvɛnənt/"],
["forbearance","/fɔːˈbeərəns/","宽容处理、暂缓执行","Forbearance measures must be documented and reported to the regulator.","宽容处理措施必须留档并向监管机构报告。","重音在 -BEAR-；/beə/ 是双元音，别读成单元音 /ɔː/"],
["onboarding / offboarding","/ˈɒnbɔːdɪŋ/ · /ˌɒfˈbɔːdɪŋ/","客户准入 / 客户退出","The onboarding file must evidence source of funds before activation.","准入档案必须在账户激活前证明资金来源。","onboard 重音在首音节，offboard 重音在第二音节——同一词根，重音位置不同"],
["de-risking","/ˌdiː ˈrɪskɪŋ/","去风险化（退出高风险客户）","De-risking at industry level can push customers into unregulated channels.","行业层面的去风险化可能把客户推向不受监管的渠道。","前缀 de- 读长音 /diː/，不能弱读成 /dɪ/ 或 /də/"],
["ring-fencing","/ˈrɪŋ fensɪŋ/","业务隔离","Ring-fencing separates retail banking from investment banking activities.","业务隔离把零售银行与投行业务分开。","ring 的 /ŋ/ 与 fence 的 /f/ 直接相接，中间不要加 /g/ 也不要停顿"],
],

/* ---------- Day-02：词表第 101-200 行（银行尾部 + AML 核心）---------- */
2: [
["reconciliation","/ˌrekənsɪliˈeɪʃn/","对账","The daily reconciliation between the ledger and the correspondent statement is signed off by two people.","总账与代理行对账单的每日对账由两人签核。","重音在 -Eɪ-，前面 3 个音节全部快读；合规场景里这是「双人复核」的关键控制点"],
["nostro break","/ˈnɒstrəʊ breɪk/","往账差异","An unresolved nostro break of £2m was escalated to the treasury control team.","一笔 200 万英镑的未决往账差异已上报资金控制团队。","break 在这里是名词「差异」，不是动词「打破」；搭配 unresolved / ageing break"],
["suspense account","/səˈspens əˈkaʊnt/","暂记账户","Funds of unknown origin are parked in a suspense account pending investigation.","来源不明的资金暂存于暂记账户等待调查。","suspense 重音在第二音节 /səˈspens/，与 suspension 不同；这是 AML 重点监控对象"],
["dormant account","/ˈdɔːmənt əˈkaʊnt/","休眠账户","The dormant account was reactivated by a single large inbound payment.","该休眠账户因一笔大额入账被重新激活。","dormant 首音节 /ˈdɔː-/；「休眠账户突然激活」是典型可疑情形，务必记住这个搭配"],
["legal entity identifier (LEI)","/ˈliːɡl ˈentəti ˈaɪdentɪfaɪə/","法人机构识别编码","Every counterparty must be identified by a valid LEI before the trade is booked.","交易入账前必须用有效的 LEI 识别每一个交易对手。","LEI 读字母 /ˌel iː ˈaɪ/；entity 的 t 在英式里常读成闪音，接近 /d/"],
["corporate actions","/ˈkɔːpərət ˈækʃnz/","公司行为","Dividends and rights issues are corporate actions processed by the custodian.","股息与配股属于由托管人处理的公司行为。","corporate 英式有两种读法 /ˈkɔːpərət/ 与 /ˈkɔːprət/，重音都在首音节"],
["payment system","/ˈpeɪmənt ˈsɪstəm/","支付系统","Each payment system has its own settlement finality rules and cut-off times.","每个支付系统都有自己的结算终局性规则与截止时间。","payment 的 /t/ 在英式里保持清脆，不要浊化成 /d/"],
["RTGS","/ˌɑː tiː dʒiː ˈes/","实时全额结算系统","CHAPS is the UK's RTGS system for high-value sterling payments.","CHAPS 是英国用于大额英镑支付的实时全额结算系统。","缩写读字母；展开读作 /ˌriːəl taɪm ɡrəʊs ˈsetlmənt/"],
["pacs.008","/pæks ˈəʊ ˈeɪt/","客户贷记转账报文","The pacs.008 carries the debtor and creditor details for the transfer.","pacs.008 报文承载该笔转账的付款人与收款人信息。","读作「packs oh eight」；这是 ISO 20022 里最常用的支付报文"],
["camt.053","/kæmt ˈəʊ ˈfɪfti θriː/","账户对账单报文","The camt.053 replaced the old MT940 for end-of-day statements.","日终对账单已由 camt.053 取代旧的 MT940 报文。","读作「cam oh fifty-three」；camt 系列都是对账与现金管理类报文"],
["UETR","/ˌjuː iː tiː ˈɑː/","唯一端到端交易参考号","Quote the UETR when you raise the payment investigation.","发起支付查询时请提供该 UETR。","读字母；它是 SWIFT gpi 追踪一笔跨境汇款全程的唯一钥匙"],
["straight-through processing (STP)","/ˌstreɪt θruː ˈprəʊsesɪŋ/","直通式处理","Straight-through processing means the payment needs no manual repair.","直通式处理意味着该笔支付无需人工修复。","straight 的 /t/ 与 through 的 /θ/ 相邻，中间不要拖音；口语常说 STP"],
["sort code","/ˈsɔːt kəʊd/","英国银行分行代码","The sort code identifies the branch; the account number identifies the customer.","sort code 标识分行，账号标识客户。","英式 /ɔː/ 长音；这是英国独有的六位分行代码，IBAN 里也包含它"],
["payer / payee","/ˈpeɪə/ · /ˌpeɪˈiː/","付款人 / 收款人","The payer's name must match the account holder on the beneficiary bank's records.","付款人姓名必须与收款行记录中的账户持有人一致。","两个词重音位置相反：payer 重音在前，payee 重音在后——靠重音区分谁付谁收"],
["SONIA","/ˈsəʊniə/","英镑隔夜指数平均利率","SONIA replaced LIBOR as the sterling risk-free reference rate.","SONIA 取代 LIBOR 成为英镑无风险参考利率。","读作「SO-nee-ah」；同类还有 SOFR /ˈsəʊfə/ 与 €STR"],
["basis point (bp)","/ˈbeɪsɪs pɔɪnt/","基点","The spread tightened by 25 basis points after the announcement.","公告发布后利差收窄了 25 个基点。","读作「bay-sis point」，不是 /ˈbæsɪs/；口语常说 bp /ˌbiː ˈpiː/，1 bp = 0.01%"],
["yield curve","/jiːld kɜːv/","收益率曲线","An inverted yield curve is often read as a recession signal.","收益率曲线倒挂常被解读为衰退信号。","yield 的 /jiː/ 与 year 同音；不要读成 /jɪəld/"],
["HQLA","/ˌeɪtʃ kjuː el ˈeɪ/","优质流动性资产","HQLA is divided into Level 1 and Level 2 assets under the LCR framework.","在 LCR 框架下，优质流动性资产分为一级与二级资产。","读字母；Level 2 还要再打折（haircut），这两个词常一起出现"],
["MREL","/ˈemrel/","最低自有资金与合格负债要求","MREL is set by the resolution authority, not the prudential regulator.","MREL 由处置主管机关设定，而非审慎监管机构。","可拼读成「em-rel」；与 TLAC 是一对：MREL 管欧洲，TLAC 管全球系统重要性银行"],
["ICAAP","/ˈaɪkæp/","内部资本充足评估程序","The ICAAP is submitted to the PRA annually and challenged by supervisors.","ICAAP 每年提交 PRA，并由监管人员进行质询。","读作「eye-cap」，整体拼读而非读字母；对应的流动性版本是 ILAAP"],
["recovery plan","/rɪˈkʌvəri plæn/","恢复计划","The recovery plan sets out the actions the firm would take before resolution.","恢复计划列明了机构在进入处置程序前将采取的行动。","recovery 重音在 -CU-；与 resolution plan 是「事前 / 事后」的对应关系"],
["treasury","/ˈtreʒəri/","资金部 / 司库","Treasury manages the bank's liquidity, funding and market risk.","资金部负责管理银行的流动性、融资与市场风险。","读 /ˈtreʒəri/（tre-zhə-ri），不是 /ˈtruːʒəri/；这个词读错很显眼"],
["anti-money laundering (AML)","/ˌænti ˈmʌni ˈlɔːndərɪŋ/","反洗钱","The AML programme covers customer due diligence, monitoring and reporting.","反洗钱体系涵盖客户尽职调查、监测与上报。","laundering 的 /ɔː/ 是长音；口语一律说 AML /ˌeɪ em ˈel/"],
["counter-terrorist financing (CTF)","/ˌkaʊntə ˈterərɪst ˈfaɪnænsɪŋ/","反恐融资","CTF obligations extend beyond transaction monitoring to sanctions screening.","反恐融资义务超出交易监测，延伸到制裁筛查。","terrorist 英式读三音节 /ˈterərɪst/，重音在首音节"],
["predicate offence","/ˈpredɪkət əˈfens/","上游犯罪","Money laundering requires a predicate offence, such as fraud or tax evasion.","洗钱须以某一上游犯罪为前提，例如欺诈或逃税。","predicate 此处是形容词，尾音弱读成 /ət/，不是 /eɪt/；offence 英式拼 -ce"],
["Customer Due Diligence (CDD)","/ˌsiː diː ˈdiː/","客户尽职调查","CDD must be completed before the relationship is established.","客户尽职调查必须在建立业务关系之前完成。","读字母；三档递进：SDD 简化 → CDD 标准 → EDD 强化，面试常被问到区别"],
["Enhanced Due Diligence (EDD)","/ˌiː diː ˈdiː/","强化尽职调查","EDD applies to PEPs, high-risk jurisdictions and complex ownership structures.","强化尽职调查适用于政治公众人物、高风险司法辖区与复杂股权结构。","读字母；EDD 不是「更多表格」，而是要求资金来源与财富来源双线证明"],
["Ultimate Beneficial Owner (UBO)","/ˌjuː biː ˈəʊ/","最终受益人","The UBO holds 25% or more of the shares or exercises control by other means.","最终受益人指持股 25% 及以上或以其他方式实施控制的人。","读字母；英国标准是 25% 门槛，识别不到就要按高风险处理"],
["Politically Exposed Person (PEP)","/ˌpiː iː ˈpiː/","政治公众人物","A PEP is automatically high risk and requires senior management sign-off.","政治公众人物自动归为高风险，须经高级管理层批准。","读字母；注意 PEP 有「时滞」——离任后通常还要继续监控 12 个月以上"],
["tipping off","/ˈtɪpɪŋ ɒf/","泄密（向当事人透露已被上报）","Telling the customer that a SAR has been filed is a criminal offence — that is tipping off.","告知客户已提交可疑活动报告即构成犯罪，这就是泄密。","这是英国法下的刑事罪名，不是内部纪律问题；连「暗示」都可能构成"],
]
};

module.exports = { FOCUS };
