# -*- coding: utf-8 -*-
"""按词表实际内容重排作战中心的 42 天 PLAN（Day-09 ~ Day-19）。
原则：唯一真相源 = 词表顺序。Day-N 的主题必须与词表第 100(N-1)+1 ~ 100N 行一致。
Day-20 之后词表已用尽（1932 条 ÷ 100 = 19.3 天），置为待补词表。
"""
import os, re

os.chdir(r"C:\Project\English Study\uk-compliance-english")
p = '00-作战中心.html'
s = open(p, encoding='utf-8').read()

# ---- Day-09 ~ Day-19：按词表实际领域重写 ----
NEW = {
 9:  ("合同与法律英语 I：合同语言与文件结构",
      ["朗读并精读一段英文收购协议节选（definitions / warranties / termination 三段）",
       "合同与法律词 100 张（行 801–900）：data governance / consideration / entire agreement / estoppel / indemnity …",
       "用 3 分钟英文讲清「一条合同里最容易读漏的三个词」",
       "写出「合同关键条款速查表」英文要点"]),
 10: ("监管检查、审计与调查 I： piercing the veil 与 operating deficiency",
      ["精听一场监管检查「发现缺陷后的分级会」场景",
       "检查与审计词 100 张（行 901–1000）：piercing the corporate veil / operating deficiency / audit evidence / sampling …",
       "用 2 分钟英文讲清「operating deficiency 与 misconduct 的区别」",
       "写出「检查发现分级标准」英文要点"]),
 11: ("风险管理与内部控制 + ESG 开篇：三道防线与可持续发展",
      ["精听一场「三道防线职责边界」的内部会议",
       "风险与 ESG 词 100 张（行 1001–1100）：key control / three lines of defence / social engineering / climate risk …",
       "用 2 分钟英文讲清「social engineering 为什么不算技术风险」",
       "写出「三道防线职责表」英文要点"]),
 12: ("税务合规与信息交换 + 网络安全：钓鱼与社工",
      ["精听一场钓鱼事件的内部通报会",
       "税务与网络安全词 100 张（行 1101–1200）：phishing / spear phishing / front office / tax evasion / exchange of information …",
       "用 2 分钟英文讲清「钓鱼通报的前 30 分钟该做什么」",
       "写出「钓鱼事件处置清单」英文要点"]),
 13: ("银行组织、职位与部门 + 财务会计：middle office 到 adverse opinion",
      ["精听一场「财报季的合规与审计分工会」",
       "组织与会计词 100 张（行 1201–1300）：middle office / front office / reconciliation / adverse opinion / provision …",
       "用 3 分钟英文讲清「adverse opinion 意味着什么」",
       "写出「财报合规自查三问」英文要点"]),
 14: ("贸易融资与贸易洗钱：documentary credit 与 TBML",
      ["精听一场「信用证不符点处理」的贸易融资会议",
       "贸易融资词 100 张（行 1301–1400）：documentary credit / discrepancy / bill of lading / trade-based money laundering …",
       "用 3 分钟英文讲清「不符点(discrepancy) 为什么会导致拒付」",
       "写出「贸易洗钱红旗清单」英文要点"]),
 15: ("数字资产与金融科技合规 + 会议口语开篇",
      ["精听一场「数字资产客户尽职调查」的会议",
       "数字资产词 100 张（行 1401–1500）：distributed ledger / smart contract / wallet / custody / Move the needle …",
       "用 2 分钟英文讲清「custody 与 ownership 在数字资产上的区别」",
       "写出「数字资产合规三问」英文要点"]),
 16: ("合规职场与会议口语专项（整日 100 词全是职场表达）",
      ["精听一场纯职场口语会议（发言、圆场、纠偏、收尾）",
       "职场口语词 100 张（行 1501–1600）：Circle back / park it / push back / escalation / touch base …",
       "用 5 分钟英文做一次完整的会议开场 + 收尾",
       "写出「会议常用句式 20 句」英文要点"]),
 17: ("英国日常生活 I：食品、日用品与决策记录",
      ["精听一段英式生活场景对话（超市、砍价、点单）",
       "生活词 100 张（行 1601–1700）：decision log / standing charge / supermarket / receipt / VAT …",
       "用 3 分钟英文讲清「英国超市的单据上每一行都是什么」",
       "写出「英国生活高频句 20 句」英文要点"]),
 18: ("英国生活事务 II：租房、医疗与通勤",
      ["精听一段英式租房看房对话",
       "生活事务词 100 张（行 1701–1800）：meter reading / council tax / GP / coach station / deposit …",
       "用 3 分钟英文讲清「在英国看房要问房东的六个问题」",
       "写出「租房与看病实用句 15 句」英文要点"]),
 19: ("伦敦地标与交通 + 英国文化收官（第 2 周测评与复盘）",
      ["无字幕听 BBC 15 分钟（伦敦交通 / 城市生活主题）",
       "地标与文化词 100 张（行 1801–1900）：Moorgate / Liverpool Street / Bank / water cooler moment …",
       "<b>第 2 周术语测 100 题</b>（从 Day-09 ~ Day-18 的 1000 词等距抽取，目标 ≥ 85%）",
       "定稿 1 页「第 2 周复盘：我能听懂的会议英语 vs 还听不懂的」"]),
}

n = 0
for d, (theme, blocks) in NEW.items():
    pat = re.compile(r'\{d:%d,f:"(?:[^"\\]|\\.)*",b:\[(?:[^\[\]]|\[[^\]]*\])*\]\}' % d)
    m = pat.search(s)
    if not m:
        print('!! Day %02d 未匹配到 PLAN 条目' % d)
        continue
    bl = '[' + ','.join('"%s"' % b.replace('"', '\\"') for b in blocks) + ']'
    new = '{d:%d,f:"%s",b:%s}' % (d, theme, bl)
    s = s[:m.start()] + new + s[m.end():]
    n += 1
    print('Day %02d → %s' % (d, theme))

print('\n已重写 %d 天' % n)
open(p, 'w', encoding='utf-8').write(s)
