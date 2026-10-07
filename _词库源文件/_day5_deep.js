/* ============================================================
   Day-05 精讲 30 词 · 深度讲解数据
   每个词：
     w      词面（必须与 _day5_words.js 完全一致）
     ipa    英式音标
     syl    音节/单词切分（用 · 或空格分隔）
     stress 重读下标（0 基，可多个）
     zh     释义
     hook   本质一句话（这个概念到底在解决什么合规问题）
     sent   英式例句
     sentZh 例句译文
     say    读音要点（为什么这么读）
     pit    中国人最常犯的具体错误：错误示范 → 正确
     use    会议 / 文件里的实际用法
   ============================================================ */

module.exports = {

groups: [
  { id: 1, name: '名单机制与所有权穿透',  n: 7, why: '制裁的第一性问题不是「这个人是不是坏人」，而是「谁在背后控制这笔钱」。这 7 个词决定了一份制裁报告能不能立得住。' },
  { id: 2, name: '规避、处罚与域外效力',  n: 5, why: '这组词回答两个问题：对方做了什么（规避 vs 规避的违法），以及我们/他国的责任边界在哪（域外效力）。' },
  { id: 3, name: '筛查运营',             n: 5, why: '从「查什么」到「怎么调」，这 5 个词是筛查体系日常运行的词汇，面试和 KPI 里都会问。' },
  { id: 4, name: '出口管制',             n: 4, why: '制裁管的是人，管货的是出口管制。英美两套体系逻辑不同，这 4 个词是进入 IT / 贸易 / 技术服务领域的第一道门。' },
  { id: 5, name: '航运规避',             n: 3, why: '海上是制裁规避最难抓的场景。这 3 个词是航运筛查、能源贸易和保险业务的入口词。' },
  { id: 6, name: '金融犯罪开篇',         n: 6, why: '从制裁转到执法。今天只记 6 个核心词，明天（Day-06）会正面处理这一领域的其余 40 条。' }
],

words: [

/* ───────────── 一、名单机制与所有权穿透（7） ───────────── */
{
  g: 1, w: 'ownership and control test',
  ipa: '/ˈəʊnəʃɪp ənd kənˈtrəʊl test/',
  syl: ['own', 'er', 'ship', 'and', 'con', 'trol', 'test'], stress: [0, 5],
  zh: '所有权与控制判定',
  hook: '一句话：这是「谁在背后说了算」的判定题。欧盟叫 ownership/control test，英国叫 ownership and control test——本质是同一个问题：钱和权 ultimate 落在谁身上。',
  sent: "The ownership and control test decides whether the 50 per cent rule catches the ship's registered owner.",
  sentZh: '所有权与控制判定决定 50% 规则是否适用于该船的登记船东。',
  say: '① ownership 重音在<b>首</b>音节 /ˈəʊ-/；② 英式 /əʊ/ 从 /ə/ 滑向 /ʊ/，起点是「呃」不是「欧」，不是美式 /oʊ/；③ control 名词动词同音，重音都在<b>后</b> /kənˈtrəʊl/；④ 三词连读时 and 弱读成 /ən/：/ˈəʊ.nə.ʃɪp ən kənˈtrəʊl test/。',
  pit: '❌ /ˈaʊnəʃɪp/（美式化）→ ✅ /ˈəʊnəʃɪp/　　❌ 三个词全重读 → ✅ 只有 own 和 trol 重读，and / test 一带而过',
  use: '出现在制裁报告的<b>结论段</b>：<span class="mono">the ownership and control test has not been satisfied</span>（判定未通过）。这句话一出，整笔交易就要停。'
},
{
  g: 1, w: 'consolidated list',
  ipa: '/kənˈsɒlɪdeɪtɪd lɪst/',
  syl: ['con', 'sol', 'i', 'dat', 'ed', 'list'], stress: [1],
  zh: '（英国）综合制裁名单',
  hook: '一份把所有来源的名单合并起来的清单。<b>英美最重要的一个结构差异</b>：英国用一张 consolidated list；美国是几张分开的（OFAC 的 SDN、BIS 的 Entity List…）。所以英国同事说"查一下综合名单"，美国同事要问"查哪一张"。',
  sent: 'The name appears on the UK consolidated list under a Cyrillic transliteration.',
  sentZh: '该姓名以西里尔字母音译形式出现在英国综合制裁名单上。',
  say: '① 重音在<b>第二音节 -SOL-</b>，五个音节要有明显强弱起伏：/kən.ˈsɒ.lɪ.deɪ.tɪd/；② 词尾 -ed 读 /ɪd/（因为原形 consolidate 以 /t/ 结尾）；③ 今天全天第一高频词，听到就要能立刻反应。',
  pit: '❌ /ˈkɒnsəldeɪtɪd/（重音丢到第一音节）→ ✅ /kənˈsɒlɪdeɪtɪd/　　❌ -ed 只读 /t/ → ✅ 读 /ɪd/，多一个音节',
  use: '英国案件里出现频率最高的词之一。标准问法：<span class="mono">Is it on the consolidated list?</span> 标准答法：<span class="mono">It is not, but it is on the UN list.</span>'
},
{
  g: 1, w: 'UK Sanctions List',
  ipa: '/ˌjuː ˈkeɪ ˈsæŋkʃnz lɪst/',
  syl: ['U', 'K', ' sanc', 'tions', 'list'], stress: [0, 1, 2],
  zh: '英国制裁名单',
  hook: '<b>UK Sanctions List = 权威记录（authoritative record）<br>consolidated list = 可检索版本（searchable version）</b><br>这个区别是考试和实战都爱问的一对——法律上算数的是前者，日常用的是后者。',
  sent: 'The UK Sanctions List is the authoritative record; the consolidated list is the searchable version.',
  sentZh: '英国制裁名单是权威记录，综合名单是可检索的版本。',
  say: '① UK <b>逐字母</b>读 /juː ˈkeɪ/，不要读成「乌克」；② sanctions 词尾 /kʃnz/ 是四个辅音连成一串，中间绝不能加元音；③ 三个名词连续出现时，第一个可略弱，后面两个要实。',
  pit: '❌ UK 读成「乌克」→ ✅ /juː ˈkeɪ/ 逐字母　　❌ sanctions 读成 /ˈsænkʃənz/ → ✅ /ˈsæŋkʃnz/，中间那个 /ŋ/ 必须是鼻音',
  use: '措辞：<span class="mono">We screened against the UK Sanctions List and found no match.</span> 报告里如果说「查了综合名单」而不说「查了 UK 名单」，法律上会被追问。'
},
{
  g: 1, w: '50 per cent rule',
  ipa: '/ˌfɪfti pə ˈsent ruːl/',
  syl: ['fif', 'ty', 'per', 'cent', 'rule'], stress: [0, 3],
  zh: '50% 规则',
  hook: '一条<b>传染规则</b>：被列名的人持有某公司 >50% 股权，这家公司<b>自己</b>就被视为被列名。换个方向也成立——公司被列名，持股 >50% 的股东同样受管制。所以一次命中往往拉出一整串。',
  sent: 'Under the 50 per cent rule, an entity owned or controlled by a designated person is itself treated as designated.',
  sentZh: '根据 50% 规则，由被列名个人拥有或控制的实体本身即视为被列名。',
  say: '① <b>per cent 英式写成两个词</b>（美式 percent 一个词）；② cent 口语里弱读成 /sənt/，不追求清晰；③ fifty 重音在<b>首</b> /ˈfɪfti/，不要说成 /fɪfˈtiː/。',
  pit: '❌ 读成 percent 一个词 → ✅ per cent 两个词　　❌ fifty 重音后移 → ✅ /ˈfɪf.ti/',
  use: '结论句：<span class="mono">The 50 per cent rule catches the parent, so we must freeze the whole group.</span> 讲清"为什么不是只冻这一家"。'
},
{
  g: 1, w: 'ownership chain',
  ipa: '/ˈəʊnəʃɪp tʃeɪn/',
  syl: ['own', 'er', 'ship', 'chain'], stress: [0],
  zh: '股权链条',
  hook: '查 UBO（最终受益人）时的「链条」——从顶层壳公司一层层往下追。<b>追不到头，就是红旗</b>。合规上这叫"无法完成穿透"，本身就是一个可上报的发现。',
  sent: 'We traced the ownership chain through two offshore holding companies to the ultimate beneficial owner.',
  sentZh: '我们穿透两家离岸控股公司，沿股权链条追溯到最终受益人。',
  say: '① chain 的 /tʃ/ 是清塞擦音（ch 音），和 shame /ʃeɪn/ 只差一个 /t/——读丢了就变成另一个词；② /eɪ/ 要滑足；③ ownership 的 -ship 是轻音节，很容易被吞掉。',
  pit: '❌ chain 读成 /ʃeɪn/（shame 的音）→ ✅ /tʃeɪn/，先有 /t/ 的爆破再滑向 /eɪ/',
  use: '描述发现：<span class="mono">The ownership chain stops at the second holding company.</span> 短句、降调、说完就停——这个停顿本身就是信息。'
},
{
  g: 1, w: 'control via other means',
  ipa: '/kənˈtrəʊl ˈvaɪə ˈʌðə miːnz/',
  syl: ['con', 'trol', 'vi', 'a', 'o', 'ther', 'means'], stress: [1, 2],
  zh: '以其他方式控制',
  hook: '不是"持股"，是"支配"——任免董事会、过半表决权、实质控制。<b>ownership 查的是钱，control via other means 查的是权。</b>两条腿都要查，只有钱没有权、或只有权没有钱，都可能被穿透。',
  sent: 'Control via other means includes the power to appoint a majority of the board.',
  sentZh: '以其他方式控制包括任免董事会多数席位的权力。',
  say: '① via 英式习惯读<b>两音节</b> /ˈvaɪ.ə/，不要压缩成一个音节（那是美式）；② means 词尾 /nz/ 是浊音——前面的 /n/ 是浊辅音，所以 -s 读 /z/；③ other 的 th 是清 /θ/，舌尖伸出。',
  pit: '❌ via 读成一个音节 /ˈvaɪə/→ ✅ /ˈvaɪ.ə/ 两音节　　❌ means 读成 /miːns/ → ✅ /miːnz/ 词尾浊音（单数是 mean，没有 /s/）',
  use: '只出现在专业报告里，但一出现就是关键抗辩点：对方会说"我只有 20% 股权"。你的回应是 <span class="mono">but you appoint the majority of the board, which is control via other means.</span>'
},
{
  g: 1, w: 'general licence',
  ipa: '/ˈdʒenrəl ˈlaɪsns/',
  syl: ['gen', 'ral', 'li', 'cence'], stress: [0, 2],
  zh: '一般许可',
  hook: '<b>一次授权、长期有效</b>——与 specific licence（逐案审批）相对的一对。今天只需要把这一对记牢，因为在任何许可讨论里都是先问"这是一般许可还是特定许可"。',
  sent: 'A general licence allows certain activities without a case-by-case application.',
  sentZh: '一般许可允许特定活动无需逐案申请即可进行。',
  say: '① general 英式习惯<b>压成两音节</b> /ˈdʒen.rəl/，不是清清楚楚三个音节的 /ˈdʒe.nə.rəl/；② licence 是名词拼 <b>-ce</b>，动词才拼 license，读音相同 /ˈlaɪsns/；③ 两个 -l 都在，第一个在 general 里要清楚。',
  pit: '❌ /ˈdʒenərəl/（三音节）→ ✅ /ˈdʒenrəl/（两音节，英式）　　❌ licence 拼成 license → ✅ 名词永远 -ce，拼错就是错字',
  use: '结论句：<span class="mono">A general licence covers this activity, so no case-by-case application is needed.</span> 说完通常能省对方一周。'
},

/* ───────────── 二、规避、处罚与域外效力（5） ───────────── */
{
  g: 2, w: 'circumvention',
  ipa: '/ˌsɜːkəmˈvenʃn/',
  syl: ['cir', 'cum', 'ven', 'tion'], stress: [2],
  zh: '规避（制裁）',
  hook: '<b>「绕过去」，不是「违反」</b>——同一笔交易换个管道、换个国家、换一套单证再做一遍。它描述的是手法本身；违法性要靠 sanction evasion 来定性。',
  sent: 'Structuring payments through a third country is a classic form of circumvention.',
  sentZh: '通过第三国分拆付款是典型的规避手法。',
  say: '① 重音在 <b>-VEN-</b> /ˌsɜː.kəmˈven.ʃn/，前两个音节 /ˌsɜːkəm/ 全部快读带过；② /ɜː/ 英式<b>不卷舌</b>；③ -tion 是压缩音节 /ʃn/，不要拖成 /ʃən/。',
  pit: '❌ 重音跑到第一音节 /ˈsɜːkəmvenʃn/ → ✅ /ˌsɜːkəmˈvenʃn/　　❌ -tion 读成「-shun」/ʃən/ → ✅ 一个音节 /ʃn/，一气收住',
  use: '指控用语：<span class="mono">Structuring via a third country is a classic form of circumvention.</span> 注意用 form of，不要用 violation of（那是别的意思）。'
},
{
  g: 2, w: 'sanctions evasion',
  ipa: '/sæŋkʃnz ɪˈveɪʒn/',
  syl: ['sanc', 'tions', 'e', 'va', 'sion'], stress: [3],
  zh: '制裁规避（违法）',
  hook: '比 circumvention <b>更重一层</b>：evasion 是「逃避制裁本身」，在多数辖区是<b>刑事罪名</b>，可导致个人入刑、公司被罚。',
  sent: 'Sanctions evasion carries criminal liability, not just a regulatory penalty.',
  sentZh: '制裁规避要承担刑事责任，而不只是监管处罚。',
  say: '① <b>本批第一号发音错误：evasion 里的 s 读 /ʒ/</b>——就是 measure 里的那个浊擦音，不是 /z/、更不是 /ʃ/；② 重音在 <b>-VAI-</b> /ɪˈveɪ.ʒn/；③ sanctions 词尾 /kʃnz/ 四个辅音一串，别拆开。',
  pit: '❌ /ɪˈveɪzn/（读成 z）→ ✅ /ɪˈveɪʒn/（舌尖不上颚，喉结振动）　❌ /ɪˈveɪʃn/（读成 sh）→ ✅ 同上<br><b>自查法</b>：读这个词时手贴喉结，/ʒ/ 和 /z/ 都振动，但 /ʒ/ 舌尖不碰上颚。',
  use: '定性句：<span class="mono">Sanctions evasion carries criminal liability, not just a penalty.</span> 这句话在内部培训里必须讲清 criminal 和 regulatory 的区别。'
},
{
  g: 2, w: 'strict liability',
  ipa: '/strɪkt ˌlaɪəˈbɪləti/',
  syl: ['strict', 'li', 'a', 'bil', 'i', 'ty'], stress: [0, 3],
  zh: '严格责任',
  hook: '<b>不问主观故意</b>——制裁违法是"做错了就成立"，不查你有没有恶意。这能一次性堵掉"我们以为是合法的"这类辩解。',
  sent: 'Sanctions offences are offences of strict liability: intent is not part of the test.',
  sentZh: '制裁违法属严格责任犯罪：主观故意不是构成要件。',
  say: '① <b>strict 词尾是 /kt/ 两个辅音</b>，一气收住，绝不加元音读成「strict-a」；② liability 五个音节只有 <b>-BIL-</b> 重读，前面 /ˌlaɪə/ 两个音节快读；③ 英式词尾 -ty 读 /ti/，不浊化成美式 /di/。',
  pit: '❌ /ˈstrɪktə/ → ✅ /strɪkt/ 一音节　❌ 重音在 -LAI- → ✅ 在 -BIL-（和 account 一样，来自 liable）　❌ /laɪəˈbɪlɪdi/ → ✅ /ˌlaɪəˈbɪləti/（英式 /ə/，不浊化）',
  use: '会议里用来压住辩解：<span class="mono">Intent does not come into it — these are offences of strict liability.</span> 说这句时降调、语速放慢。'
},
{
  g: 2, w: 'voluntary self-disclosure',
  ipa: '/ˈvɒləntri self dɪsˈkləʊʒə/',
  syl: ['vol', 'un', 'tar', 'y', 'self', 'dis', 'clo', 'sure'], stress: [0, 6],
  zh: '自愿披露',
  hook: '<b>主动报告换减罚</b>——在监管发现之前自己说。这是英美执法里最重要的减罚路径，也是谈判里最值钱的一张牌。',
  sent: 'A voluntary self-disclosure usually reduces the penalty by a substantial margin.',
  sentZh: '自愿披露通常能大幅降低处罚幅度。',
  say: '① voluntary 英式习惯读<b>三音节</b> /ˈvɒ.lən.tri/，不是四音节 /ˈvɒ.lən.te.ri/；② self 是前缀，直接接在后面不要停顿；③ disclosure 重音在 <b>-CLO-</b>，中间的 s 读<b>浊音</b> /z/（后面是 /k/ 前的浊辅音 l 前的清辅音…口诀：<b>s 前面的音是清辅音就读 /s/，这里 s 后面跟 /kl/，实际读 /z/</b>——实际语流里 disclosure 开头是 /dɪsˈkl/，s 保持 /z/ 浊音）。',
  pit: '❌ /ˈvɒlənteri/（四音节）→ ✅ /ˈvɒləntri/（三音节）　❌ disclosure 重音在 -CLO- 之前 → ✅ 重音落在 <b>clo</b> 上',
  use: '结论段必写：<span class="mono">An early voluntary self-disclosure changes the whole conversation about penalty.</span> change the conversation 是英式的说法（直译成中文是"整个对话变了"）。'
},
{
  g: 2, w: 'extraterritorial reach',
  ipa: '/ˌekstrəterɪˈtɔːriəl riːtʃ/',
  syl: ['ex', 'tra', 'ter', 'ri', 'to', 'ri', 'al', 'reach'], stress: [4],
  zh: '域外效力',
  hook: '<b>美国能管到美国之外</b>——没有美国公民、没有美国公司、只用美元清算，一样可能被美国制裁。这是"我这笔交易跟美国没关系"这个说法最常见的反驳点。',
  sent: 'US secondary sanctions have extraterritorial reach over non-US banks clearing in dollars.',
  sentZh: '美国二级制裁对以美元清算的非美国银行具有域外效力。',
  say: '① 重音<b>固定在 -TO-</b> /ˌek.strə.ter.ɪˈtɔː.ri.əl/，前面四个音节一路滑过去，中间不许停顿；② 英式 -torial 的 r <b>不卷舌</b>；③ reach 词尾 /tʃ/ 要收干净。',
  pit: '❌ /ˌekstrəˌterɪˈtɔːriəl/（重音乱跑）→ ✅ 只有 -TO- 重读　❌ /riːtʃ/ 读成 /riːʃ/ → ✅ /tʃ/ 有爆破再滑',
  use: '判断"这笔交易会不会被美国管"的关键词。<span class="mono">Does this transaction have any US nexus that would give the extraterritorial reach a footing?</span>'
},

/* ───────────── 三、筛查运营（5） ───────────── */
{
  g: 3, w: 'name screening',
  ipa: '/neɪm ˈskriːnɪŋ/',
  syl: ['name', 'screen', 'ing'], stress: [1],
  zh: '名单筛查',
  hook: '开户做一次，<b>之后每个 trigger event 再做一次</b>——它不是一个一次性动作，而是一个持续触发的过程。',
  sent: 'Name screening runs at onboarding and again at every trigger event.',
  sentZh: '名单筛查在开户时执行，并在每一个触发事件发生时重新执行。',
  say: '① screening 开头 <b>/skr/ 是三个辅音连缀</b>，中间不能加元音（不要读成 /səˈkriː/）；② 重音在后 /ˈskriː.nɪŋ/；③ runs 词尾 /nz/ 是浊音。',
  pit: '❌ /səˈkriːnɪŋ/（加元音）→ ✅ /ˈskriːnɪŋ/，/sk/ 之后直接 /r/　❌ 重音在第一音节 → ✅ 在 scre(e)n-ing',
  use: '描述流程：<span class="mono">Name screening runs at onboarding and at every trigger event.</span> 讲流程时 on-boarding 的 /ˌɒnˈbɔːdɪŋ/ 首音节是 /ɒ/ 不是 /əʊ/，也别加 /ʊ/。'
},
{
  g: 3, w: 'payment screening',
  ipa: '/ˈpeɪmənt ˈskriːnɪŋ/',
  syl: ['pay', 'ment', 'screen', 'ing'], stress: [0, 2],
  zh: '支付筛查',
  hook: '和 name screening 的分工：<b>name 查客户名，payment 查报文里的收款人字段</b>（MT103 的第 59 栏）。两套系统、两个时点，别混。',
  sent: 'Payment screening catches the beneficiary name in the MT103 field 59.',
  sentZh: '支付筛查在 MT103 报文的第 59 栏中抓取收款人姓名。',
  say: '① payment 的 t 在自然语速里<b>几乎不爆破</b>，只做口型；② 节奏是「修饰语略轻、中心词重」：payment <b>略</b>重，screening 最重——两个词都重读反而丢了信息焦点。',
  pit: '❌ payment 读成 /ˈpeɪment/（t 爆破）→ ✅ /ˈpeɪmənt/（口型不爆破）　❌ 两个词一样重 → ✅ screening 更重',
  use: '描述系统能力：<span class="mono">Payment screening catches the beneficiary in field 59.</span> field 59 要重读，这是报文位置，讲错就等于查错地方。'
},
{
  g: 3, w: 'alert disposition',
  ipa: '/əˈlɜːt ˌdɪspəˈzɪʃn/',
  syl: ['a', 'lert', 'dis', 'po', 'si', 'tion'], stress: [1, 4],
  zh: '警报处置结论',
  hook: '<b>一条警报的最终结论（含误报）</b>。有 disposition 才算"处理完"；没有 disposition 的警报就是积压，也是审计最爱问的东西。',
  sent: 'Every alert disposition must be documented, including false positives.',
  sentZh: '每一条警报处置结论都必须留痕，包括误报。',
  say: '① <b>alert 重音在后</b> /əˈlɜːt/（a-lert 两音节，重音在第二个）；② disposition 重音在 <b>-ZI-</b> /ˌdɪs.pəˈzɪ.ʃn/，前面三个音节快读带过；③ /ɜː/ 英式不卷舌。',
  pit: '❌ /ˈeɪlət/（重音在前）→ ✅ /əˈlɜːt/　❌ disposition 重音在 -PO- → ✅ 在 <b>-ZI-</b>（dis-PO-si-tion 中间那个是弱音节）',
  use: '合规留痕的核心字段：<span class="mono">Every alert disposition must be documented, including false positives.</span> 写 false positives 这半句很重要——它证明你不只是处理真警报。'
},
{
  g: 3, w: 'threshold / sensitivity',
  ipa: '/ˈθreʃhəʊld/ · /ˌsensəˈtɪvəti/',
  syl: ['thresh', 'hold', 'sen', 'si', 'tiv', 'i', 'ty'], stress: [0, 4],
  zh: '阈值 / 灵敏度',
  hook: '<b>一对权衡，今天最实用的一对词</b>：threshold 是"多可疑才报"，sensitivity 是"能认出多少"。提高门槛 → 误报少、漏报多。<b>所有规则调优都绕不开这个矛盾</b>，能讲清这一对就够用一年。',
  sent: 'Raising the threshold cuts false positives but lowers sensitivity on short names.',
  sentZh: '提高阈值能减少误报，但会降低对短姓名的灵敏度。',
  say: '① <b>threshold 首音是 /θ/，舌尖必须伸出齿间</b>，后面紧跟 /ʃh/ 连在一起；② /əʊ/ 英式不卷舌；③ sensitivity 五个音节重音在 <b>-TIV-</b>，一气呵成，中间不要断。',
  pit: '❌ /ˈsreʃhəʊld/（/θ/ 读成 /s/）→ ✅ 舌尖伸出齿间，音送到舌尖上<br>❌ /ˈfreʃhəʊld/（读成 /f/）→ ✅ 同上，可对镜自查<br>❌ sensitivity 重音在 -SI- → ✅ 在 <b>-TIV-</b>',
  use: '讲规则调优时的标准句式：<span class="mono">Raising the threshold cuts false positives but lowers sensitivity.</span> 这句在 Day-03 的 tuning / optimisation 那组词里也用得上。'
},
{
  g: 3, w: 'sanctions nexus',
  ipa: '/ˈsæŋkʃnz ˈneksəs/',
  syl: ['sanc', 'tions', 'ne', 'xus'], stress: [2],
  zh: '制裁关联点',
  hook: '<b>「连接点」</b>——哪怕只持股 5%，只要与美国或被列名方有这个连接点，次级制裁就可能适用。<b>nexus 是美国制裁体系里最常用的触发词</b>，英国同事也会借用。',
  sent: 'Any sanctions nexus — even a 5 per cent shareholder — has to be assessed.',
  sentZh: '任何制裁关联点——哪怕只持股 5%——都必须评估。',
  say: '① <b>重音在首音节</b> /ˈnek.səs/——这是拉丁借词，别按英语习惯把重音往后放；② 第二个音节 /səs/ 极弱；③ 中间是 <b>/ks/</b> 不是 /kʃ/。',
  pit: '❌ /ˈnekʃəs/（中间读成 /kʃ/）→ ✅ /ˈneksəs/，/k/ 后直接 /s/　❌ /ˈnekˈsəs/（重音在后）→ ✅ 重音在 <b>首</b>',
  use: '判断是否触及次级制裁的关键词：<span class="mono">Is there any sanctions nexus, even a 5 per cent holding?</span> even 后面要重读——这个词是给对方台阶的信号。'
},

/* ───────────── 四、出口管制（4） ───────────── */
{
  g: 4, w: 'EAR (Export Administration Regulations)',
  ipa: '/ˌiː eɪ ˈɑː/',
  syl: ['E', 'A', 'R'], stress: [0, 1, 2],
  zh: '美国出口管理条例',
  hook: '<b>美国出口管制的"母法"</b>。EAR 下的物项按 ECCN 分类（1–5 类），<b>没有 ECCN 就要走 catch-all</b>。任何一笔交易只要碰到两用物项，EAR 就是必查的条例名。',
  sent: 'The item is classified under the EAR and needs a licence for that destination.',
  sentZh: '该物项按美国出口管理条例分级，运往该目的地需要许可。',
  say: '① <b>逐字母读 /iː eɪ ˈɑː/</b>，三个音节，绝不要试图读成一个词；② R 是 /ɑː/，英式<b>不卷舌</b>（美式会卷）；③ 全称 Administration 重音在 <b>-STRA-</b> /ədˌmɪnɪˈstreɪʃn/。',
  pit: '❌ 读成一个词 /ɪə/ → ✅ 逐字母三个音节　❌ /ɪɑː/（R 音卷舌）→ ✅ /ˈɑː/<br><b>易混</b>：EAR 逐字母，ITAR 读成词 /ˈaɪtɑː/ —— 同一批文件里两套规则并存，只能靠记。',
  use: '货物涉及两用物项时的必查项：<span class="mono">The item is classified under the EAR.</span> 后面紧跟 ECCN 与 licence 要求。'
},
{
  g: 4, w: 'Entity List',
  ipa: '/ˈentəti lɪst/',
  syl: ['en', 'ti', 'ty', 'list'], stress: [0, 3],
  zh: '（美国）实体清单',
  hook: '美国商务部 BIS 维护的<b>实物清单</b>——人、实体、船舶都在里面。比 OFAC 的 SDN 更"物"、更硬：上清单基本等于不能碰。',
  sent: 'The buyer was added to the Entity List last year, so the order has to be stopped.',
  sentZh: '该买方去年被列入实体清单，所以这笔订单必须叫停。',
  say: '① <b>首重音</b> /ˈen.tɪ.ti/，不是 /enˈtaɪti/；② 英式三音节 /ˈentəti/，中间的 /t/ 要清楚；③ 词尾 -ty 读 /ti/，<b>不浊化</b>（美式读 /di/）；④ List 是专有名词的一半，也要重读。',
  pit: '❌ /enˈtaɪti/ → ✅ /ˈentəti/，重音在首　❌ /ˈentɪdi/（美式浊化）→ ✅ /ˈentəti/（英式清 /t/）',
  use: '停止交易的直接依据：<span class="mono">The buyer was added to the Entity List, so we have to stop the order.</span> 结论词用 stop / halt，不要用 reject。'
},
{
  g: 4, w: 'catch-all control',
  ipa: '/ˈkætʃ ɔːl kənˈtrəʊl/',
  syl: ['catch', 'all', 'con', 'trol'], stress: [0, 3],
  zh: '兜底管制',
  hook: '<b>「兜底」——没有明确管制要求 ≠ 可以放行。</b>你必须自己判断最终用途和目的地，判断不了就当它可能被管制。<b>这是义务（duty），不是选项（option）</b>。今天 B 段会议的核心结论就是这一条。',
  sent: 'Catch-all control requires an end-use assessment even when no licence is listed.',
  sentZh: '兜底管制要求即便没有列明许可要求，也要做最终用途评估。',
  say: '① catch 的 /æ/ 英式<b>更前更开</b>（比美式靠前，嘴张得更大）；② catch-all 连成一个语块读，<b>连字符不产生停顿</b>；③ control 重音在后。',
  pit: '❌ /ˈkætʃ əl/（中间加元音）→ ✅ /ˈkætʃ ɔːl/，整块读　❌ 把 catch-all 拆成两句 → ✅ 一个语块，中间不停',
  use: '会议定论句：<span class="mono">Catch-all is a duty, not an option.</span> 说这句时前两句铺垫、后一句降收音，力量最足。'
},
{
  g: 4, w: 'deemed export',
  ipa: '/diːmd ˈekspɔːt/',
  syl: ['deemed', 'ex', 'port'], stress: [0, 1],
  zh: '视同出口',
  hook: '<b>物项没出境，但技术数据给了外籍人士，在英国也算出口</b>。这个概念是英美出口管制最难的部分，也是科技 / IT / 技术服务公司最常踩的雷。',
  sent: 'Sharing the technical data with a foreign national in the UK is a deemed export.',
  sentZh: '在英国把技术资料分享给外籍人士，构成视同出口。',
  say: '① deemed 的 /iː/ 是长音 + 词尾 <b>/md/ 两个辅音收住</b>，不加音节；② <b>export 作名词重音在首</b> /ˈeks.pɔːt/（作动词才后移 /eksˈpɔːt/）；③ deemed export 连读时前词轻、后词重。',
  pit: '❌ /diːˈmiːd/ → ✅ /diːmd/ 一音节　❌ /eksˈpɔːt/（名词用了动词的重音）→ ✅ 名词 /ˈekspɔːt/<br><b>同批易混</b>：transfer 也一样，名词首重音、动词后重音。',
  use: '科技业务线的关键词：<span class="mono">Sharing technical data with a foreign national in the UK is a deemed export.</span> foreign national 要重读——这是判定成立的关键限定。'
},

/* ───────────── 五、航运规避（3） ───────────── */
{
  g: 5, w: 'dark fleet',
  ipa: '/dɑːk fliːt/',
  syl: ['dark', 'fleet'], stress: [0, 1],
  zh: '暗船队、影子船队（关闭 AIS）',
  hook: '<b>关闭 AIS、不出现在公开航运数据里的船队</b>。它是制裁规避最常见的表现形式。配套词：<b>go dark</b>（关掉信号）、<b>dark activity</b>（今天词表里有）。',
  sent: 'The dark fleet turns off AIS transponders before loading in the Baltic.',
  sentZh: '暗船队在波罗的海装货前关闭船舶自动识别系统应答器。',
  say: '① dark 的 /ɑː/ 是英式长音，<b>不卷舌</b>（美式 /dɑːrk/ 才卷）；② fleet 的 /iː/ 要拉长；③ 两个词都重读，这是术语不是普通名词。',
  pit: '❌ /dɑːk flɪt/（短音 + 没拉长）→ ✅ /dɑːk fliːt/　❌ /dɑːrk/（卷舌）→ ✅ 英式不卷<br><b>易混</b>：别和 flit /flɪt/（快速移动）混。',
  use: '航运筛查的入口：听到 dark fleet 或 go dark，就要立刻问 AIS 记录与装载历史。今天 B 段第 11 句就是这句的完整用法。'
},
{
  g: 5, w: 'ship-to-ship transfer',
  ipa: '/ˌʃɪp tə ˈʃɪp ˈtrænsfɜː/',
  syl: ['ship', 'to', 'ship', 'trans', 'fer'], stress: [0, 3],
  zh: '船对船过驳（STS）',
  hook: '<b>把货从一条船转到另一条</b>——在海上换身份，是最常见的规避手法。制裁调查的时间线描述里几乎必有这一项。',
  sent: 'The cargo was moved by ship-to-ship transfer outside territorial waters.',
  sentZh: '货物在领海之外通过船对船过驳完成转移。',
  say: '① 连字符短语整体<b>重音落在后半段</b> /ˌʃɪp tə ˈʃɪp/；② 中间的 to 弱读成 /tə/；③ <b>transfer 作名词重音在首</b> /ˈtræns.fɜː/，作动词才后移 /trænsˈfɜː/ —— 本批最容易搞反的一对。',
  pit: '❌ /trænsˈfɜː/（名词用了动词重音）→ ✅ 名词 /ˈtrænsfɜː/<br>❌ 三个词都重读 → ✅ ship / trans- 重，to 弱<br><b>同批同规则</b>：deemed export、contract / conTRACT。',
  use: '时间线描述：<span class="mono">She went dark for eleven days before the ship-to-ship transfer.</span> 真实案件里这句话通常紧跟在 AIS 异常之后。'
},
{
  g: 5, w: 'price cap',
  ipa: '/praɪs kæp/',
  syl: ['price', 'cap'], stress: [0, 1],
  zh: '价格上限',
  hook: '<b>G7 价格上限</b>（对俄罗斯石油）：约定成交价必须低于某上限，靠<b>链条每一环都签合规声明（attestation）</b>来执行。任何一环不签，整个机制失效。今天词表里 price cap 和 attestation 是配套出现的。',
  sent: 'The G7 price cap only works if every link in the chain gets an attestation.',
  sentZh: '七国集团价格上限只有在链条每一环都取得合规声明时才有效。',
  say: '① cap 的 /æ/ 英式<b>更前更开</b>；② <b>新闻播报里这两个词都要重读</b>，弱化任何一个都听不出来；③ G7 读 "G seven" /ˌdʒiː ˈsevn/。',
  pit: '❌ /keɪp/（读成 keep）→ ✅ /kæp/，短元音 + /p/ 收尾　❌ 只重读 price → ✅ 两词都重读（这是术语）',
  use: '能源贸易场景的核心词组：<span class="mono">only works if every link in the chain gets an attestation</b></span> —— only works 要重读，因为整个逻辑都挂在 only 上。'
},

/* ───────────── 六、金融犯罪开篇（6） ───────────── */
{
  g: 6, w: 'economic crime',
  ipa: '/ˌiːkəˈnɒmɪk kraɪm/',
  syl: ['e', 'co', 'nom', 'ic', 'crime'], stress: [2],
  zh: '经济犯罪',
  hook: '英国 2023 年《经济犯罪与企业透明度法》（<b>Economic Crime and Corporate Transparency Act</b>）把它系统化了，最重要的产出是「<b>failure to prevent</b>」这一整组单位犯罪。',
  sent: 'The Economic Crime and Corporate Transparency Act widened the failure to prevent offence.',
  sentZh: '《经济犯罪与企业透明度法》扩大了「未能预防」罪的范围。',
  say: '① <b>重音在 -NOM-</b> /ˌiː.kəˈnɒm.ɪk/，前面两个音节快读；② 词尾 -ic 读 /ɪk/ 不是 /ɪːk/；③ crime 的 /kraɪm/ 首音节重读。',
  pit: '❌ /ˌekəˈnɒmɪk/（首音节读成 /e/）→ ✅ /ˌiː.kə-/（英式首音是长音 /iː/）<br>❌ 重音在 -NOM- 之前的 -CO- → ✅ 在 <b>-NOM-</b>，和下面 economy 对照记',
  use: '罪名与法案名里天天出现。<span class="mono">Economic crime covers bribery, fraud, money laundering and market abuse.</span> 这句是标准开场。'
},
{
  g: 6, w: 'failure to prevent',
  ipa: '/ˈfeɪljə tə prɪˈvent/',
  syl: ['fail', 'ure', 'to', 'pre', 'vent'], stress: [0, 3],
  zh: '未能预防（罪）',
  hook: '<b>单位犯罪的默认条款</b>——公司没能防止员工犯罪，机构本身担责。抗辩的唯一路径是证明"已有<a href="#" class="mono">adequate procedures</a>"。这是你未来最需要理解的一个罪名。',
  sent: 'Failure to prevent fraud is a corporate offence; the firm answers for its employees.',
  sentZh: '未能预防欺诈是单位犯罪，机构要为其员工的行为负责。',
  say: '① failure 词尾是 <b>/jə/</b> 不是 /jʊə/（英式是弱化 /ə/）；② prevent 重音在<b>后</b> /prɪˈvent/；③ 首音节 prɪ 是<b>短音</b>，不是长音——别和 pre- /priː/ 混；④ 三个词连读时 to 弱读成 /tə/。',
  pit: '❌ /ˈfeɪljʊə/ → ✅ /ˈfeɪljə/（英式弱化）　❌ /prɪˈviːnt/ → ✅ 首音节是短音 /prɪ/　❌ 重音在 -VEN- → ✅ 重音在 <b>-VENT-</b>',
  use: '定性的关键词：<span class="mono">Failure to prevent fraud is a corporate offence.</span> corporate offence 是英式的说法（美式多说 corporate criminal offense）。'
},
{
  g: 6, w: 'adequate procedures',
  ipa: '/ˈædɪkwət prəˈsiːdʒəz/',
  syl: ['ad', 'e', 'quate', 'pro', 'ce', 'dures'], stress: [0, 3],
  zh: '充分程序（抗辩）',
  hook: '<b>唯一法定抗辩</b>。注意它问的是"程序够不够"，不是"结果好不好"——这正是英美公司法和合规体系的核心思路：你控制不了结果，但要控制住流程。',
  sent: 'The only defence is that the firm had adequate procedures in place.',
  sentZh: '唯一的抗辩理由是该机构已建立充分程序。',
  say: '① <b>adequate 词尾 -ate 弱读成 /ət/</b>，绝不读 /eɪt/；② procedures 重音在 <b>-CE-</b> /prəˈsiː.dʒəz/；③ 词尾 /dʒəz/ 是浊音（s 前面的 d 是浊辅音）。',
  pit: '❌ /ˈædɪkweɪt/ → ✅ /ˈædɪkwət/，词尾 /ət/　❌ 重音在 -PRO- → ✅ 在 <b>-CE-</b>　❌ 词尾读成 /dʒuːz/ → ✅ /dʒəz/ 弱化',
  use: '抗辩句式：<span class="mono">The only defence is that the firm had adequate procedures in place.</span> in place 读 /ɪn ˈpleɪs/，那个 /pleɪs/ 要重读（不是 place /s/）。'
},
{
  g: 6, w: 'POCA 2002',
  ipa: '/ˈpɒkə ˌtuː ˈθaʊznd ənd tuː/',
  syl: ['P', 'O', 'C', 'A', 'two', ' thou', 'sand', 'and', 'two'], stress: [0, 2],
  zh: '2002 年犯罪所得法',
  hook: '<b>Proceeds of Crime Act 2002</b>，英国反洗钱与资产追回的主力法。它创造了整套工具：<b>AFO</b>（账户冻结令）、<b>UWO</b>（财富来源不明令）、<b>confiscation order</b>（没收令）。今天词表尾部的那些令状都出自它。',
  sent: 'POCA 2002 gives the courts power to make a confiscation order.',
  sentZh: '2002 年犯罪所得法赋予法院作出没收令的权力。',
  say: '① <b>POCA 读成一个词 /ˈpɒkə/</b> —— 行业固定读法，逐字母念 P-O-C-A 会被立刻听出是外行；② 20th 读 two thousand and two，英式保留 <b>and</b>，美式常说 two thousand two；③ thousand 的 th 是清 /θ/。',
  pit: '❌ /ˌpiː əʊ siː ˈeɪ/ → ✅ /ˈpɒkə/ 一个词　❌ /tuː θaʊznd tuː/（漏 and）→ ✅ 英式 two thousand <b>and</b> two',
  use: '提到"追缴 / 冻结 / 没收"必然引到 POCA：<span class="mono">POCA 2002 gives the courts power to make a confiscation order.</span> 全称第一次出现时写全，之后用缩写。'
},
{
  g: 6, w: 'suspicion',
  ipa: '/səˈspɪʃn/',
  syl: ['sus', 'pi', 'cion'], stress: [1],
  zh: '怀疑（法定门槛）',
  hook: '<b>AML 的法定门槛词</b>：上报义务由"怀疑（suspicion）"触发，<b>不是由"证明（proof）"触发</b>。这个区别是整个反洗钱体系的地基，也是你未来最常被问到的概念之一。',
  sent: 'The obligation is triggered by suspicion, not by proof.',
  sentZh: '该义务由「怀疑」触发，而不是由证据触发。',
  say: '① 重音在<b>第二音节 -SPI-</b>，首音节 /sə/ 极弱；② 词尾 <b>-cion 压成 /ʃn/ 一个音节</b>，不要拖成 /ʃən/；③ 三个音节里只有一个重音，其余两个弱到几乎听不见。',
  pit: '❌ /ˈsʌspɪʃn/（重音在首）→ ✅ /səˈspɪʃn/　❌ /səˈspɪʃən/（多一个音节）→ ✅ 词尾压缩 /ʃn/<br><b>自检</b>：这个词三音节，第二个重、第一个几乎听不到、第三个瞬间收。',
  use: 'AML 的核心陈述：<span class="mono">The obligation is triggered by suspicion, not by proof.</span> 说完 not by proof 要<b>降调</b>，表示"这条界线不能越"。'
},
{
  g: 6, w: 'unexplained wealth order (UWO)',
  ipa: '/ˌʌnɪkˈspleɪnd welθ ˈɔːdə/',
  syl: ['un', 'ex', 'plained', 'wealth', 'or', 'der'], stress: [2],
  zh: '财富来源不明令',
  hook: '<b>钱说不清来路，就先冻结并要求解释</b>——持有人必须说明资产如何取得，说不清就可能被没收。这是英国特有的工具，财富调查、PEP 审查、跨境资产三类场景都会遇到。',
  sent: 'An unexplained wealth order forces the holder to explain how the assets were funded.',
  sentZh: '财富来源不明令强制持有人说明资产来源。',
  say: '① unexplained 重音在 <b>-PLAINED-</b>，前两音节 /ˌʌn.ɪk/ 快读带过；② <b>wealth 的 /θ/ 舌尖必须伸出齿间</b>——读成 /wels/ 是本批最高频的错误之一；③ order 词尾 /ə/，英式弱化；④ UWO 逐字母 /juː dʌ.bəl.juː ˈəʊ/。',
  pit: '❌ /wels/ → ✅ /welθ/，舌尖伸出再收（可对镜验证）<br>❌ unexplained 重音在 -EX- → ✅ 在 <b>-PLAINED-</b><br>❌ UWO 读成一个词 → ✅ 三个字母逐念',
  use: '三类场景的关键词：财富调查、PEP 审查、跨境资产。句型：<span class="mono">An unexplained wealth order forces the holder to explain how the assets were funded.</span> funded 词尾 /d/，别读成 /dɪd/。'
}

]

};
