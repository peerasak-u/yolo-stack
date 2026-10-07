# yolo-stack

สมุดเปล่าสำหรับสอน AI ให้ทำงานประจำของคุณตามมาตรฐานของคุณ ใช้ได้กับทุกอาชีพ ไม่ต้องเป็นวิศวกรซอฟต์แวร์

yolo-stack ถอดกลไกมาจาก [pstack](https://github.com/cursor/plugins/tree/main/pstack) ของ Lauren Tan (poteto) แล้วตัดเนื้อหางานเขียนโค้ดออก มันมากับกลไกครบ แต่ยังไม่มีความรู้ของอาชีพใดอยู่ข้างใน คุณเติมด้วยการเล่างานและการแก้งาน โดยไม่ต้องเขียนไฟล์เอง

สถานะ: รุ่น 0.1.0 โหลดเข้า Claude Code ได้และ hook ทำงาน แต่ยังไม่มีใครใช้มันทำงานจริงจนครบรอบ และยังไม่ได้ทดสอบบน Codex ในงานจริง

## ติดตั้ง

### Claude Code

พิมพ์ใน Claude Code

```text
/plugin marketplace add peerasak-u/yolo-stack
/plugin install yolo-stack@yolo-stack
```

### Codex

พิมพ์ใน terminal

```shell
codex plugin marketplace add peerasak-u/yolo-stack
codex plugin add yolo-stack@yolo-stack
```

Codex จะขอให้กดไว้ใจ hook ผ่าน `/hooks` ก่อนที่ hook จะทำงาน

## เริ่มใช้

1. เลือกงานประจำหนึ่งอย่าง แล้วเปิดงานที่ทำเสร็จแล้วหนึ่งชิ้นไว้ตรงหน้า
2. สั่ง `capture-playbook` แล้วตอบคำถามของ AI ทีละข้อ มันจะเขียนขั้นตอนของงานนั้นเป็น playbook
3. สั่งงานนั้นกับ AI ตรวจผล และพิมพ์บอกเมื่อมีอะไรต้องแก้
4. สั่ง `reflect` เมื่อจบงาน มันเสนอว่าจะแก้คู่มือตรงไหน คุณอนุมัติหรือปัดตกทีละข้อ

หน้าที่ของคนมีสามอย่าง: เล่า แก้ และตัดสิน

## มีอะไรอยู่ข้างใน

```
plugins/yolo-stack/
├── hooks/                      # ฉีดข้อความตอนเริ่ม session ให้เข้า yolo-mode
├── models.json                 # ค่าเริ่มต้นของโมเดลต่อบทบาท
├── tools/                      # check-refs.mjs ตรวจการอ้างอิง, rename-stack.mjs เปลี่ยนชื่อ stack
└── skills/
    ├── yolo-mode/              # router: trigger, สารบัญ principle, autonomy, playbook
    │   ├── playbooks/          # authoring-a-skill, session-pickup, _template
    │   └── references/         # principle-template, codex-tools
    ├── capture-playbook/       # สัมภาษณ์คนจากงานจริง แล้วเขียนเป็น playbook
    ├── principle-prove-it/
    ├── principle-encode-lessons-in-structure/
    ├── show-me-your-work/
    ├── reflect/
    ├── unslop/
    ├── why/
    └── recall/  automate-me/  interrogate/  swarm/  arena/
```

สามคำที่ต้องรู้

| คำ | คืออะไร | ตัวอย่าง |
|---|---|---|
| mode | โต๊ะประชาสัมพันธ์ บอกว่าเจอสถานการณ์ไหนให้เปิดไฟล์ไหน | `yolo-mode` |
| playbook | ขั้นตอนของงานหนึ่งชนิด | ตรวจใบแจ้งหนี้ก่อนจ่ายเงิน |
| principle | กฎหนึ่งข้อที่ใช้ได้ข้ามงาน | ทุกข้อสรุปต้องชี้ไปที่เอกสารจริง |

Skill แบ่งเป็นสองชั้นตามตาราง trigger ใน `yolo-mode`

| ชั้น | Skill | ถูกเรียกอย่างไร |
|---|---|---|
| ต่อสายแล้ว | `principle-prove-it`, `principle-encode-lessons-in-structure`, `show-me-your-work`, `unslop`, `reflect`, `capture-playbook` | `yolo-mode` เรียกเองเมื่อสถานการณ์ตรง |
| แปะไว้ | `recall`, `why`, `interrogate`, `swarm`, `arena`, `automate-me` | คุณพิมพ์ชื่อเรียก |

การเลื่อนชั้นคือการย้ายหนึ่งบรรทัดใน `skills/yolo-mode/SKILL.md` จากรายการ "Shipped, not wired" ขึ้นไปรายการ "Wired"

## Principle เกิดอย่างไร

Stack นี้เริ่มด้วย principle สองตัว ตัวที่เหลือเข้ามาทาง `reflect`

1. คุณแก้งานของ AI ในแชต หรือจดคำแก้ที่เกิดนอกแชตลง `corrections.md` ที่ root ของโปรเจกต์
2. สั่ง `reflect` มันอ่านบทสนทนากับ `corrections.md` แล้วเสนอรายการแก้
3. คำแก้ที่เจอสองครั้งขึ้นไปและทำเป็น script ไม่ได้ จะถูกเสนอเป็น principle ใหม่
4. คุณอนุมัติทีละข้อ

คำแก้ทุกข้อไปได้สามทาง ใช้กับงานเดียวไปแก้ playbook ใช้ข้ามงานและเจอสองครั้งเป็น principle ทำเป็น script ได้ก็เป็น script

## ทำเป็น stack ของตัวเอง

1. Fork repo นี้
2. รัน `node plugins/yolo-stack/tools/rename-stack.mjs yolo <ชื่อใหม่>` มันเปลี่ยน `yolo-mode` และ `yolo-stack` ทั้งชื่อโฟลเดอร์ เนื้อไฟล์ และรายการใน marketplace
3. เติมสามจุดที่เป็นของอาชีพคุณ
   - รายการ "Just do it" และ "Always pause" ในหัวข้อ Autonomy ของ mode
   - ข้อ 1 ของ Pattern ใน `principle-prove-it` ว่า "ของจริง" ในงานของคุณคืออะไร
   - playbook ของงานแรก ได้จากการสั่ง `capture-playbook`
4. รัน `node plugins/<ชื่อใหม่>-stack/tools/check-refs.mjs` ต้องได้ `ok`

## ข้อจำกัดที่รู้อยู่

- `reflect` ใช้ AI สี่ตัวต่อรอบ จึงใช้โทเคนมาก
- `why` และบางขั้นของ `recall` ยังเขียนไว้สำหรับงานเขียนโค้ด
- `unslop` เขียนไว้สำหรับภาษาอังกฤษ กฎฝั่งภาษาไทยยังไม่มี
- ยังไม่มี skill สำหรับเก็บวิธีพิสูจน์ของแต่ละงาน

## ที่มาและสัญญาอนุญาต

MIT ดู [`LICENSE`](LICENSE) ไฟล์ที่ดัดแปลงจาก pstack และฉบับ port ของ Michael Denyer ระบุไว้ใน [`plugins/yolo-stack/NOTICE.md`](plugins/yolo-stack/NOTICE.md)
