# yolo-stack

สมุดสำหรับสอน AI ให้ทำงานประจำของคุณตามมาตรฐานของคุณ ใช้ได้กับทุกอาชีพ ไม่ต้องเป็นวิศวกรซอฟต์แวร์

yolo-stack ถอดกลไกมาจาก [pstack](https://github.com/cursor/plugins/tree/main/pstack) ของ Lauren Tan (poteto) แล้วตัดเนื้อหางานเขียนโค้ดออก มันมากับกลไกครบ และ principle เจ็ดข้อที่ใช้ได้กับงานเกือบทุกชนิด แต่ไม่มีความรู้ของอาชีพใดอยู่ข้างใน คุณเติมด้วยการตอบคำถาม การเล่างาน และการแก้งาน โดยไม่ต้องเขียนไฟล์เอง

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

ค่าเริ่มต้นใช้ได้เลยโดยไม่ต้องตั้งอะไร ถ้าอยากเปลี่ยนโมเดลที่แต่ละบทบาทใช้ หรือปิด hook ตอนเริ่ม session ให้สั่ง `setup-yolo-stack`

## เริ่มใช้

1. สั่ง `get-started` แล้วตอบคำถามสี่ข้อ AI จะจดว่าอะไรทำได้เลย อะไรต้องรอคุณ และงานของคุณตรวจกับอะไร
2. เลือกงานประจำหนึ่งอย่าง แล้วเปิดงานที่ทำเสร็จแล้วหนึ่งชิ้นไว้ตรงหน้า
3. สั่ง `capture-playbook` แล้วตอบคำถามของ AI ทีละข้อ มันจะเขียนขั้นตอนของงานนั้นเป็น playbook
4. สั่งงานนั้นกับ AI ตรวจผล และพิมพ์บอกเมื่อมีอะไรต้องแก้
5. สั่ง `reflect` เมื่อจบงาน มันเสนอว่าจะแก้คู่มือตรงไหน คุณอนุมัติหรือปัดตกทีละข้อ

หน้าที่ของคนมีสามอย่าง: เล่า แก้ และตัดสิน

อยากเห็นปลายทางก่อนเริ่ม ดู[ตัวอย่างฝ่ายบัญชีเจ้าหนี้](plugins/yolo-stack/examples/accounts-payable/README.md) ซึ่งเป็นเรื่องสมมติของคนหนึ่งคนหลังใช้ไปสองสัปดาห์

## ความรู้ของคุณอยู่ที่ไหน

ทุกอย่างที่คุณสอนอยู่ในโฟลเดอร์ `~/.yolo-stack/` บนเครื่องของคุณ ไม่ได้อยู่ในตัว plugin การอัปเดต plugin จึงไม่ลบมัน

```
~/.yolo-stack/
├── mode.md         # อะไรทำได้เลย อะไรต้องรอคุณ ตรวจกับอะไร และสารบัญของสองโฟลเดอร์ล่าง
├── playbooks/      # ขั้นตอนของงานแต่ละชนิด
└── principles/     # กฎที่เกิดจากคำแก้ของคุณ
```

สำรองโฟลเดอร์นี้ไว้เหมือนไฟล์งานอื่น ย้ายเครื่องก็คัดลอกไปทั้งโฟลเดอร์

## มีอะไรอยู่ข้างใน

```
plugins/yolo-stack/
├── hooks/                      # ฉีดข้อความตอนเริ่ม session ให้เข้า yolo-mode
├── models.json                 # ค่าเริ่มต้นของโมเดลต่อบทบาท
├── tools/                      # check-refs.mjs ตรวจการอ้างอิง, rename-stack.mjs เปลี่ยนชื่อ stack
├── examples/accounts-payable/  # ตัวอย่างสมมติของ stack ที่เติมแล้ว AI ไม่โหลดตอนทำงาน
└── skills/
    ├── yolo-mode/              # router: trigger, สารบัญ principle, autonomy, playbook
    │   ├── playbooks/          # authoring-a-skill, session-pickup, _template
    │   └── references/         # mode-template, principle-template, codex-tools
    ├── setup-yolo-stack/       # เลือกโมเดลต่อบทบาท และเปิดปิด hook ตอนเริ่ม session
    ├── get-started/            # สัมภาษณ์สี่ข้อ แล้วสร้าง ~/.yolo-stack/ ให้
    ├── capture-playbook/       # สัมภาษณ์คนจากงานจริง แล้วเขียนเป็น playbook
    ├── figure-it-out/          # ออกแบบขั้นตอนเองเมื่องานใหญ่และยังไม่มี playbook
    ├── principle-*/            # เจ็ดข้อ ดูหัวข้อ Principle เกิดอย่างไร
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
| ต่อสายแล้ว | principle ทั้งเจ็ดข้อ, `setup-yolo-stack`, `get-started`, `capture-playbook`, `figure-it-out`, `show-me-your-work`, `unslop`, `reflect` | `yolo-mode` เรียกเองเมื่อสถานการณ์ตรง |
| แปะไว้ | `recall`, `why`, `interrogate`, `swarm`, `arena`, `automate-me` | คุณพิมพ์ชื่อเรียก |

การเลื่อนชั้นคือการย้ายหนึ่งบรรทัดใน `skills/yolo-mode/SKILL.md` จากรายการ "Shipped, not wired" ขึ้นไปรายการ "Wired"

## Principle เกิดอย่างไร

Stack นี้มากับ principle เจ็ดข้อที่ไม่ผูกกับอาชีพใด

| Principle | ใช้เมื่อ |
|---|---|
| `principle-prove-it` | กำลังจะบอกว่างานเสร็จ หรือรายงานผล |
| `principle-encode-lessons-in-structure` | เขียนคำสั่งเดิมเป็นครั้งที่สอง |
| `principle-fix-root-causes` | มีอะไรออกมาผิด และกำลังจะแก้ |
| `principle-attack-the-premise` | ลองแก้สองครั้งแล้วไม่สำเร็จ โดยตั้งอยู่บนสมมติฐานเดียวกัน |
| `principle-sequence-verifiable-units` | งานมีหลายชิ้นที่คล้ายกัน |
| `principle-explain-the-number` | กำลังจะเชื่อหรือรายงานตัวเลข |
| `principle-never-block-on-the-human` | อยากถามว่าควรทำไหม ในงานที่ย้อนกลับได้ |

เจ็ดข้อนี้ยังไม่เคยยืนยันกับงานของคุณ ถ้าคำแก้ของคุณขัดกับข้อไหน `reflect` จะเสนอ principle ของคุณมาแทนข้อนั้น

Principle ของคุณเองเข้ามาทาง `reflect` และเก็บไว้ใน `~/.yolo-stack/principles/`

1. คุณแก้งานของ AI ในแชต หรือจดคำแก้ที่เกิดนอกแชตลง `corrections.md` ที่ root ของโปรเจกต์
2. สั่ง `reflect` มันอ่านบทสนทนากับ `corrections.md` แล้วเสนอรายการแก้
3. คำแก้ที่เจอสองครั้งขึ้นไปและทำเป็น script ไม่ได้ จะถูกเสนอเป็น principle ใหม่
4. คุณอนุมัติทีละข้อ

คำแก้ทุกข้อไปได้สามทาง ใช้กับงานเดียวไปแก้ playbook ใช้ข้ามงานและเจอสองครั้งเป็น principle ทำเป็น script ได้ก็เป็น script

## ทำเป็น stack ของตัวเอง

1. Fork repo นี้
2. รัน `node plugins/yolo-stack/tools/rename-stack.mjs yolo <ชื่อใหม่>` มันเปลี่ยน `yolo-mode` และ `yolo-stack` ทั้งชื่อโฟลเดอร์ เนื้อไฟล์ และรายการใน marketplace
3. ใส่ความรู้ของอาชีพที่อยากให้ทุกคนที่ติดตั้งได้ไปด้วย
   - รายการ "Just do it" และ "Always pause" ในหัวข้อ Autonomy ของ mode
   - playbook ของอาชีพ วางใน `skills/<ชื่อใหม่>-mode/playbooks/` และเพิ่มหนึ่งบรรทัดในหัวข้อ Playbooks ของ mode
   - principle ของอาชีพ วางเป็น `skills/principle-<ชื่อ>/` และเพิ่มหนึ่งบรรทัดในสารบัญ Principles ของ mode
4. รัน `node plugins/<ชื่อใหม่>-stack/tools/check-refs.mjs` ต้องได้ `ok`

## ข้อจำกัดที่รู้อยู่

- `reflect` ใช้ AI สี่ตัวต่อรอบ จึงใช้โทเคนมาก
- `why`, `interrogate` และ `recall` เขียนใหม่ให้ใช้กับงานเอกสารและข้อความแล้ว แต่ยังไม่เคยรันกับงานจริง
- `get-started` ทดสอบแค่ว่า AI เข้า skill และถามคำถามแรก ยังไม่มีคนจริงตอบจนครบสี่ข้อ
- Principle เจ็ดข้อที่ติดมายังไม่เคยยืนยันกับงานของอาชีพใด
- ตัวตรวจ `check-refs.mjs` ต้องมี Node บนเครื่อง
- `unslop` เขียนไว้สำหรับภาษาอังกฤษ กฎฝั่งภาษาไทยยังไม่มี
- ยังไม่มี skill สำหรับเก็บวิธีพิสูจน์ของแต่ละงาน

## ที่มาและสัญญาอนุญาต

MIT ดู [`LICENSE`](LICENSE) ไฟล์ที่ดัดแปลงจาก pstack และฉบับ port ของ Michael Denyer ระบุไว้ใน [`plugins/yolo-stack/NOTICE.md`](plugins/yolo-stack/NOTICE.md)
