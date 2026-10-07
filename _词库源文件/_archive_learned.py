# -*- coding: utf-8 -*-
"""
导出「已学词汇归档」：从 Anki 库读已学卡，按首次学习日期分组，落到学习记录目录。
用法：python _archive_learned.py <collection.anki2 路径>
"""
import sqlite3, csv, datetime, io, sys, os
from collections import defaultdict, Counter

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

P = sys.argv[1]
ROOT = "D:/英语培训教程"
OUT = os.path.join(ROOT, "学习记录")

con = sqlite3.connect(P)
con.create_collation("unicase", lambda a, b: (a.lower() > b.lower()) - (a.lower() < b.lower()))
c = con.cursor()
crt = c.execute("select crt from col").fetchone()[0]

# --- 词表（浏览版：英文,中文,领域,补充说明）---
vocab = {}
with open(os.path.join(ROOT, "词表-浏览版.csv"), encoding="utf-8-sig") as f:
    for i, row in enumerate(csv.reader(f)):
        if i == 0:
            continue
        if len(row) >= 4 and row[0].strip():
            vocab.setdefault(row[0].strip(), (i, row[1].strip(), row[2].strip(), row[3].strip()))

# --- Anki 卡与复习记录 ---
cards = c.execute("""select cd.id, cd.due, cd.type, cd.queue, cd.ivl, n.sfld
                     from cards cd join notes n on n.id = cd.nid""").fetchall()
sfld_of = {r[0]: r[5] for r in cards}   # card_id -> 单词
card_of = {r[5]: r for r in cards}      # 单词 -> (id, due, type, queue, ivl, sfld)
known = set(sfld_of)

rv = c.execute("select r.id, r.cid, r.ease from revlog r order by r.id").fetchall()
first, cnt, eases = {}, Counter(), defaultdict(list)
for r in rv:
    if r[1] not in known:
        continue
    first.setdefault(r[1], r[0])
    cnt[r[1]] += 1
    eases[r[1]].append(r[2])

# --- 按首次学习"日期"分组 ---
groups = defaultdict(list)
for cid, ts in first.items():
    d = datetime.datetime.fromtimestamp(ts / 1000.0)
    day = "10-02" if d.strftime("%m-%d") == "10-02" else "10-03"
    groups[day].append((ts, cid))

labels = {"10-02": "Day-01", "10-03": "Day-02"}

csv_path = os.path.join(OUT, "已学词汇归档-Day01-Day02.csv")
with open(csv_path, "w", encoding="utf-8-sig", newline="") as f:
    w = csv.writer(f)
    w.writerow(["学习日", "词表行号", "英文", "中文", "领域", "补充说明",
                "当日学习次序", "首次学习时间", "复习次数", "判过Easy次数", "卡片状态", "当前间隔(天)", "下次到期(天序号)"])
    for day in ("10-02", "10-03"):
        items = sorted(groups[day], key=lambda x: x[0])          # 按学习先后
        order = {cid: i for i, (_, cid) in enumerate(items, 1)}  # cid -> 学习次序
        items_by_row = sorted(items, key=lambda x: vocab.get(sfld_of.get(x[1], ""), (9999,))[0])
        for ts, cid in items_by_row:
            word = sfld_of.get(cid, "?")
            v = vocab.get(word)
            rowno, zh, dom, note = (v[0], v[1], v[2], v[3]) if v else ("", "", "", "")
            r = card_of.get(word) or (None,) * 6
            st = "复习中" if r[2] == 2 else "新卡"
            w.writerow([labels[day], rowno, word, zh, dom, note, order[cid],
                        datetime.datetime.fromtimestamp(ts / 1000.0).strftime("%Y-%m-%d %H:%M"),
                        cnt[cid], eases[cid].count(4), st, r[4], r[1]])
print("已写出:", csv_path)

# --- 归档 Markdown ---
md_path = os.path.join(OUT, "已学词汇归档-Day01-Day02.md")
with open(md_path, "w", encoding="utf-8") as f:
    f.write("# 已学词汇归档 · Day-01 / Day-02\n\n")
    f.write("> 来源：Anki 数据库 `collection.anki2`（`New Financial English` 牌组）复习记录，按词表行号升序排列。\n")
    f.write("> 导出时间：%s\n\n" % datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
    f.write("## 一、批次总览\n\n")
    f.write("| 批次 | 实际学习日 | 张数 | 词表行号 | 区间缺口 | 区间外越界 | 判过 Easy |\n")
    f.write("|---|---|---|---|---|---|---|\n")
    for day in ("10-02", "10-03"):
        items = groups[day]
        rn = sorted(vocab.get(sfld_of[cid], (0,))[0] for _, cid in items)
        span = set(range(rn[0], rn[0] + len(rn)))
        gap = sorted(span - set(rn))
        outl = sorted(set(rn) - span)
        ez = sum(eases[cid].count(4) for _, cid in items)
        f.write("| **%s** | %s | %d | %d–%d | %s | %s | %d 次 |\n" % (
            labels[day], day, len(items), rn[0], rn[-1],
            ("、".join(str(x) for x in gap) or "无"),
            ("、".join(str(x) for x in outl) or "无"), ez))
    f.write("\n**结论：**Day-01 是干净连续的 1–100；Day-02 是 **101–199 连续 99 张 + 越界的 1312**，"
            "缺第 200 行（Financial Intelligence Unit (FIU)）。第 200 行此后顺延为 Day-03 的第 1 张。\n\n")

    for day in ("10-02", "10-03"):
        items = sorted(groups[day], key=lambda x: x[0])
        order = {cid: i for i, (_, cid) in enumerate(items, 1)}
        rows_sorted = sorted(items, key=lambda x: vocab.get(sfld_of.get(x[1], ""), (9999,))[0])
        f.write("## %s（%s，%d 张）\n\n" % (labels[day], day, len(items)))
        f.write("| 行号 | 英文 | 中文 | 领域 | 学习次序 | 复习次数 | Easy | 下次到期 |\n")
        f.write("|---:|---|---|---|---:|---:|---:|---:|\n")
        for ts, cid in rows_sorted:
            word = sfld_of.get(cid, "?")
            v = vocab.get(word)
            rowno, zh, dom, note = (v[0], v[1], v[2], v[3]) if v else ("", "", "", "")
            r = card_of.get(word) or (None,) * 6
            f.write("| %s | %s | %s | %s | %d | %d | %d | day %s |\n" % (
                rowno, word, zh, dom, order[cid], cnt[cid], eases[cid].count(4), r[1]))
        f.write("\n")
print("已写出:", md_path)

print("\n=== 归档统计 ===")
for day in ("10-02", "10-03"):
    items = groups[day]
    rn = sorted(vocab.get(sfld_of[cid], (0,))[0] for _, cid in items)
    ez = sum(eases[cid].count(4) for _, cid in items)
    span = set(range(min(rn), min(rn) + len(items)))
    print("%s (%s): %d 张 | 词表行号 %d~%d | Easy 次数 %d" % (labels[day], day, len(items), rn[0], rn[-1], ez))
    print("    偏离连续区间的行号:", sorted(set(rn) - span), " 区间内缺口:", sorted(span - set(rn)))

due = Counter(r[1] for r in cards if r[2] == 2)
today = int((datetime.datetime.now().timestamp() - crt) / 86400)
print("\n200 张已学卡的到期分布（collection day，today=%d）:" % today)
for d in sorted(due):
    tag = "（今天到期）" if d == today else ("（已逾期 %d 天）" % (today - d) if d < today else "")
    print("   day%d: %d 张 %s" % (d, due[d], tag))
