/**
 * 黄昏学院 · 全站文字
 * 改给读者看的句子时，改这个文件，不必改页面结构。
 * 文字使用简体中文。
 * 图片只放在 images/，不要和 css、js、页面混在一起。
 *
 * 整页背景是 css/base.css 里的点阵，手机会和电脑铺同一张图案。
 * 首页主标题用 images/background/name_ICON.png，不要再用文字排「黄昏学院」。
 * 全站页签图标用 images/background/SCHOOL_ICON.png。
 * 横幅：images/banner/文件名.jpg，再把 home.banner 写成 "images/banner/文件名.jpg"。
 * 简介若有多段，段落之间空一行。
 *
 * 首页次级层面：
 *   pages/worldview/  世界观介绍    图片放 images/worldview/
 *   pages/factions/   势力介绍      图片放 images/factions/
 *   pages/story/      剧情介绍      图片放 images/story/
 * 首页「企划内容」与「如何加入企划」在简介下方左右并排。
 * 再往下用 images/background/split_line.png，然后是三栏入口。
 * 点开一栏后，右下角「详情」才进入对应页面。
 * 三栏展开后，左上角是标题，靠左居中的短文改 worldview.card、factions.card、story.card。
 * 势力介绍页有三张链接卡，分别进入 pages/factions/黄昏学院/、2/、3/。
 * 卡上的标题、短文和角标改 factions.items。还没写的句子保持「待填入」。
 * 黄昏学院页的四节标题和正文改 factions.items[0].sections。
 * 资料夹：势力介绍 > 黄昏学院 > 部门名称 > 成员名称。
 * 每个部门、每个成员各占一个资料夹，slug 必须和资料夹名相同。
 * 部门入口卡改 factions.items[0].departments。photo 是卡片上方底色。
 * 医疗部门页的三节标题和正文改 departments[0].sections。
 * 成员票卡改 departments[0].members。portrait 放角色照片路径，没有就显示「待填入」。
 */
window.SITE_CONTENT = {
  name: "黄昏学院",
  ui: {
    backHome: "返回首页",
    detail: "详情",
    members: "成员介绍",
    profile: "角色简介",
    place: "所属",
    studentId: "学生证",
    traits: "性格描述"
  },
  home: {
    intro: "待填入",
    banner: "images/banner/banner.png",
    bannerLabel: "横幅待补"
  },
  project: {
    title: "企划内容",
    body: "待填入"
  },
  join: {
    title: "如何加入企划",
    body: "待填入"
  },
  worldview: {
    title: "世界观介绍",
    card: "待填入",
    body: "待填入"
  },
  factions: {
    title: "势力介绍",
    card: "待填入",
    body: "在当前企划中，共有三大类型的势力可以参与。",
    back: "返回势力介绍",
    items: [
      {
        title: "黄昏学院",
        slug: "黄昏学院",
        summary: "位于背阳面的永夜大学城，有着全星球最顶尖的科技与人才",
        mark: "01",
        sections: [
          { title: "学院简介", body: "待填入" },
          { title: "环境/设施介绍", body: "待填入" },
          { title: "学习内容介绍", body: "待填入" },
          { title: "各部门介绍", body: "待填入" }
        ],
        departments: [
          {
            slug: "医疗部门",
            title: "医疗部",
            handle: "黄昏学院",
            bio: "各项医疗协助",
            photo: "#1c1c1c",
            logo: "pages/factions/黄昏学院/医疗部门/LOGO.png",
            stats: [
              { value: "6", label: "人数" },
              { value: "薇斓黛尔", label: "负责人" },
              { value: "部门", label: "类型" }
            ],
            sections: [
              { title: "部门简介", body: "待填入" },
              { title: "部门职责", body: "待填入" },
              { title: "平时会做些什么？", body: "待填入" }
            ],
            members: [
              {
                slug: "艾莱亚",
                title: "艾莱亚",
                org: "医疗部",
                type: "成员",
                role: "护理师",
                accent: "#57e4d0",
                portrait: "pages/factions/黄昏学院/医疗部门/艾莱亚/Alaya_Head_.webp",
                head: "pages/factions/黄昏学院/医疗部门/艾莱亚/Alaya_Head_.webp",
                full: "pages/factions/黄昏学院/医疗部门/艾莱亚/Alaya_FullSize_.webp",
                studentId: "pages/factions/黄昏学院/医疗部门/艾莱亚/艾莱亚AU_学生证_03.png",
                code: "待填入",
                seat: "01",
                details: [
                  { label: "隶属", value: "医疗部" },
                  { label: "职务", value: "护理师" },
                  { label: "待填入", value: "待填入" },
                  { label: "待填入", value: "待填入" }
                ],
                intro: "自向阳面而来的怯生女孩。总是想尽己所能的想融入大家。\n\n除了医疗部的工作外，也会主动协助班级内部的事务。\n\n交办的工作会一语不发的完成，也不曾求过回报。\n\n现于医疗部担当护理士，专职于各项医护辅助。",
                facts: [
                  { label: "姓名", value: "艾莱亚" },
                  { label: "别名", value: "村里唯一的读书人 (?" },
                  { label: "年龄", value: "16" },
                  { label: "身高", value: "157" },
                  { label: "外观特征", value: "有着水亮黑眸的棕发女孩，豆眉与短短的高马尾是她的特征。" },
                  { label: "血型", value: "A" },
                  { label: "星座", value: "天秤座" }
                ],
                traits: [
                  "她从和乐融融的气氛之中获得活力，并乐意为此付出自己的时间。",
                  "如果相处的群体发生冲突，内在会非常焦虑，却又无所适从。",
                  "面对没经验的事情会非常紧张。",
                  "对于自己认定的事情会有一份执着，却也常常因此陷在内耗里面。",
                  "善良、胆小、懦弱、但必要时却异常大胆。",
                  "刻苦耐劳的她总是会把一些内心事自己吞进肚子里。"
                ]
              }
            ]
          }
        ]
      },
      { title: "待填入", summary: "待填入", body: "待填入", mark: "02" },
      { title: "待填入", summary: "待填入", body: "待填入", mark: "03" }
    ]
  },
  story: {
    title: "剧情介绍",
    card: "待填入",
    body: "待填入"
  }
};
