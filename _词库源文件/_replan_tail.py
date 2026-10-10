# -*- coding: utf-8 -*-
"""把 Day-20 ~ Day-42 的 PLAN 条目改为「待补词表」。
用括号深度扫描定位条目，避开正则对嵌套方括号的脆弱性。
"""
import os

os.chdir(r"C:\Project\English Study\uk-compliance-english")
p = '00-作战中心.html'
s = open(p, encoding='utf-8').read()

THEMES = {
    20: '数据主体权利与 DPIA', 21: '周测评与复盘', 22: '英国监管架构与双头监管',
    23: 'FCA Handbook 与商业原则', 24: 'Consumer Duty 与客户保护', 25: 'MiFID 与 MAR 市场滥用',
    26: '美国监管 I：BSA / FinCEN', 27: '美国监管 II：FCPA / Volcker', 28: '周测评与复盘',
    29: '会议英语 I：主持与发言', 30: '会议英语 II：异议与推进', 31: '电话与远程会议',
    32: '培训与宣讲', 33: '谈判与影响他人', 34: '生活英语 I：吃、买、看病',
    35: '生活英语 II：伦敦与通勤', 36: '极限听力训练', 37: '全真模拟（一）监管检查开场',
    38: '全真模拟（二）客户投诉', 39: '全真模拟（三）内部举报', 40: '全真模拟（四）媒体与外部问询',
    41: '应急话术库定稿', 42: '终测与交付',
}

BLOCKS = ('["<b>词表已用尽（1932 条 ÷ 100 = 19.3 天）。</b>本日起的内容需先补词表再定稿",'
          '"补足词表后，此处按新词表区间重写训练块","—— 当前不可开课 ——","——"]')


def find_entry(text, day):
    """返回 {d:NN, ...} 这个 JS 对象的 [start, end) 区间。"""
    key = '{d:%d,' % day
    i = text.find(key)
    while i > -1:
        depth = 0
        j = i
        in_str = False
        while j < len(text):
            ch = text[j]
            if in_str:
                if ch == '\\':
                    j += 2
                    continue
                if ch == '"':
                    in_str = False
            else:
                if ch == '"':
                    in_str = True
                elif ch == '{':
                    depth += 1
                elif ch == '}':
                    depth -= 1
                    if depth == 0:
                        return i, j + 1
            j += 1
        i = text.find(key, i + 1)
    return None


cnt = 0
# 从大到小替换，避免前面的替换影响后面的偏移
for day in sorted(THEMES, reverse=True):
    rng = find_entry(s, day)
    if not rng:
        print('!! Day %02d 未找到条目' % day)
        continue
    a, b = rng
    new = '{d:%d,f:"%s（原计划，因词表用尽待重排）",b:%s}' % (day, THEMES[day], BLOCKS)
    s = s[:a] + new + s[b:]
    cnt += 1

print('已改为「待补词表」：%d 天（Day 20 – Day 42）' % cnt)
open(p, 'w', encoding='utf-8').write(s)
